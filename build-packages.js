/**
 * TaroViz 子包构建脚本
 * 按依赖顺序构建所有子包，确保构建产物正确
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rimraf = require('rimraf');

// 构建顺序（按依赖关系）
const buildOrder = [
  'core',
  'adapters',
  'themes',
  'data',
  'hooks',
  'charts',
  'all', // 包名为all，但发布名为@agions/taroviz
];

// 日志输出
const logger = {
  info: msg => console.log(`\x1b[36mINFO:\x1b[0m ${msg}`),
  success: msg => console.log(`\x1b[32mSUCCESS:\x1b[0m ${msg}`),
  warning: msg => console.log(`\x1b[33mWARNING:\x1b[0m ${msg}`),
  error: msg => console.error(`\x1b[31mERROR:\x1b[0m ${msg}`),
};

// 工作区根目录
const rootDir = path.resolve(__dirname);

/**
 * 准备构建环境
 */
function prepareEnvironment() {
  logger.info('正在准备构建环境...');

  // 检查每个包的webpack.config.js是否存在
  buildOrder.forEach(pkg => {
    const webpackConfigPath = path.join(rootDir, 'packages', pkg, 'webpack.config.js');
    if (!fs.existsSync(webpackConfigPath)) {
      logger.error(`${pkg} 包的webpack配置文件不存在: ${webpackConfigPath}`);
      process.exit(1);
    }
  });

  // 检查并修复每个包的package.json和tsconfig.json
  buildOrder.forEach(pkg => {
    const packagePath = path.resolve(rootDir, 'packages', pkg);
    const packageJsonPath = path.join(packagePath, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      let packageJson;
      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        // 确保每个包都有webpack-cli依赖
        if (!packageJson.devDependencies) {
          packageJson.devDependencies = {};
        }

        // 确保webpack-cli存在
        if (!packageJson.devDependencies['webpack-cli']) {
          packageJson.devDependencies['webpack-cli'] = '^5.1.4';
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
          logger.info(`已为 ${pkg} 添加 webpack-cli 依赖`);
        }

        // 确保build脚本正确设置
        if (
          !packageJson.scripts ||
          !packageJson.scripts.build ||
          !packageJson.scripts.build.includes('webpack')
        ) {
          if (!packageJson.scripts) {
            packageJson.scripts = {};
          }
          packageJson.scripts.build = 'webpack --mode=production';
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
          logger.info(`已为 ${pkg} 更新构建脚本`);
        }

        // 确保type:module被移除，以避免与CommonJS冲突
        if (packageJson.type === 'module') {
          delete packageJson.type;
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
          logger.info(`已为 ${pkg} 移除 type:module 配置`);
        }

        // 确保版本号统一
        if (packageJson.version !== '1.1.1') {
          packageJson.version = '1.1.1';
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
          logger.info(`已更新 ${pkg} 版本为 1.1.1`);
        }

        // 处理tsconfig
        const tsconfigPath = path.join(packagePath, 'tsconfig.json');
        if (fs.existsSync(tsconfigPath)) {
          try {
            const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
            if (!tsconfig.compilerOptions) {
              tsconfig.compilerOptions = {};
            }

            // 添加declarationDir配置
            tsconfig.compilerOptions.declarationDir = './dist';

            // 添加paths配置解决相对路径问题
            if (!tsconfig.compilerOptions.paths) {
              tsconfig.compilerOptions.paths = {};
              buildOrder.forEach(p => {
                if (p !== pkg) {
                  tsconfig.compilerOptions.paths[`@agions/taroviz-${p}/*`] = [
                    `../../../${p}/src/*`,
                  ];
                }
              });
              // 特殊处理all包
              if (pkg === 'all') {
                tsconfig.compilerOptions.paths['@agions/*'] = [`../*`];
              }
            }

            fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf8');
            logger.info(`已为 ${pkg} 更新 tsconfig.json 配置`);
          } catch (error) {
            logger.error(`无法解析或修改 ${pkg} 的 tsconfig.json: ${error.message}`);
          }
        }
      } catch (error) {
        logger.error(`无法解析或修改 ${pkg} 的 package.json: ${error.message}`);
      }
    }
  });

  logger.success('构建环境准备完成');
}

/**
 * 清理之前的构建产物
 */
function cleanDist() {
  logger.info('正在清理旧的构建产物...');

  // 清理主包的dist目录
  const mainDistPath = path.join(rootDir, 'dist');
  if (fs.existsSync(mainDistPath)) {
    rimraf.sync(mainDistPath);
    logger.info('已清理主包dist目录');
  }

  // 清理每个子包的dist目录
  buildOrder.forEach(pkg => {
    const pkgDistPath = path.join(rootDir, 'packages', pkg, 'dist');
    if (fs.existsSync(pkgDistPath)) {
      rimraf.sync(pkgDistPath);
      logger.info(`已清理 ${pkg} 的dist目录`);
    }
  });

  // 创建新的目录结构
  fs.mkdirSync(path.join(rootDir, 'dist'), { recursive: true });
  logger.success('清理完成并创建了新的dist目录');
}

/**
 * 构建所有子包
 */
function buildPackages() {
  logger.info('开始按顺序构建所有子包...');

  let buildFailed = false;

  // 按顺序构建每个包
  for (const pkg of buildOrder) {
    logger.info(`正在构建 ${pkg === 'all' ? '@agions/taroviz' : '@agions/taroviz-' + pkg}...`);

    try {
      execSync(`cd packages/${pkg} && npx webpack --mode=production`, {
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' },
      });
      logger.success(`${pkg === 'all' ? '@agions/taroviz' : '@agions/taroviz-' + pkg} 构建成功`);
    } catch (error) {
      logger.error(
        `${pkg === 'all' ? '@agions/taroviz' : '@agions/taroviz-' + pkg} 构建失败: ${error.message}`
      );
      buildFailed = true;
      break;
    }
  }

  if (buildFailed) {
    logger.error('构建过程中存在错误，请检查输出日志');
    process.exit(1);
  }

  logger.success('所有子包构建完成');
  return !buildFailed;
}

/**
 * 整合所有子包构建产物到主包中
 */
function assembleMainPackage() {
  logger.info('正在整合所有子包产物到主包...');

  // 复制README.md到dist目录
  if (fs.existsSync(path.join(rootDir, 'README.md'))) {
    fs.copyFileSync(path.join(rootDir, 'README.md'), path.join(rootDir, 'dist', 'README.md'));
    logger.info('已复制README.md到dist目录');
  }

  // 复制logo.png到dist目录
  if (fs.existsSync(path.join(rootDir, 'logo.png'))) {
    fs.copyFileSync(path.join(rootDir, 'logo.png'), path.join(rootDir, 'dist', 'logo.png'));
    logger.info('已复制logo.png到dist目录');
  }

  // 复制主包(all)的构建产物到根dist目录
  const allPkgDistDir = path.join(rootDir, 'packages', 'all', 'dist');
  if (fs.existsSync(allPkgDistDir)) {
    const files = fs.readdirSync(allPkgDistDir);
    files.forEach(file => {
      fs.copyFileSync(path.join(allPkgDistDir, file), path.join(rootDir, 'dist', file));
    });
    logger.info('已复制主包构建产物到dist目录');

    // 确保index.d.ts文件存在
    if (!fs.existsSync(path.join(rootDir, 'dist', 'index.d.ts'))) {
      logger.warning('未找到类型定义文件，正在创建...');

      // 从index.ts生成基本的类型定义
      const indexTsContent = `/**
 * TaroViz - 基于 Taro 和 ECharts 的多端图表组件库
 * @version 1.1.1
 */
import { ReactNode } from 'react';

// 基础图表Props接口
export interface ChartProps {
  data?: any[];
  options?: Record<string, any>;
  style?: React.CSSProperties;
  className?: string;
  width?: number | string;
  height?: number | string;
  onClick?: (params: any) => void;
  onEvents?: Record<string, (params: any) => void>;
  theme?: string | Record<string, any>;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  showLoading?: boolean;
  loadingOption?: Record<string, any>;
  autoResize?: boolean;
  renderer?: 'canvas' | 'svg';
}

// 图表组件
export function LineChart(props: ChartProps): ReactNode;
export function BarChart(props: ChartProps): ReactNode;
export function PieChart(props: ChartProps): ReactNode;
export function RadarChart(props: ChartProps): ReactNode;
export function ScatterChart(props: ChartProps): ReactNode;
export function HeatmapChart(props: ChartProps): ReactNode;
export function ComboChart(props: ChartProps): ReactNode;
export function FunnelChart(props: ChartProps): ReactNode;
export function GaugeChart(props: ChartProps): ReactNode;
export function TreeChart(props: ChartProps): ReactNode;
export function TreemapChart(props: ChartProps): ReactNode;
export function SunburstChart(props: ChartProps): ReactNode;
export function GraphChart(props: ChartProps): ReactNode;
export function DashboardChart(props: ChartProps): ReactNode;
export function LiquidFillChart(props: ChartProps): ReactNode;
export function WordCloudChart(props: ChartProps): ReactNode;

// 核心API
export function createChart(options: any): any;

// 钩子
export function useChart(options: any): any;
export function useOption(options: any): any;
export function useResize(options: any): any;
export function useEvents(options: any): any;
export function useLoading(options: any): any;
export function useChartTheme(options: any): any;
export function useChartData(options: any): any;

// 适配器
export const getAdapter: (platform?: string) => any;
export const detectPlatform: () => string;
export const H5Adapter: any;
export const WeappAdapter: any;
export const AlipayAdapter: any;
export const SwanAdapter: any;
export const HarmonyAdapter: any;

// 版本信息
export const name: string;
export const version: string;
export const adaptersVersion: string;
export const coreVersion: string;`;

      fs.writeFileSync(path.join(rootDir, 'dist', 'index.d.ts'), indexTsContent, 'utf8');
      logger.success('已创建类型定义文件');
    }

    // 确保index.esm.js文件存在
    if (!fs.existsSync(path.join(rootDir, 'dist', 'index.esm.js'))) {
      logger.warning('未找到ESM模块文件，将CJS文件复制为ESM文件');
      fs.copyFileSync(
        path.join(rootDir, 'dist', 'index.js'),
        path.join(rootDir, 'dist', 'index.esm.js')
      );
      logger.success('已创建ESM模块文件');
    }
  } else {
    logger.error('主包构建产物目录不存在，无法完成整合');
    return false;
  }

  logger.success('主包整合完成');
  return true;
}

/**
 * 主构建流程
 */
function build() {
  try {
    logger.info('开始TaroViz v1.1.1构建流程');

    // 第1步：准备环境
    prepareEnvironment();

    // 第2步：清理旧的构建产物
    cleanDist();

    // 第3步：构建所有子包
    const buildSuccess = buildPackages();
    if (!buildSuccess) {
      return;
    }

    // 第4步：整合到主包
    const assembleSuccess = assembleMainPackage();
    if (!assembleSuccess) {
      return;
    }

    logger.success('TaroViz v1.1.1构建全部完成！');
  } catch (error) {
    logger.error(`构建过程中发生错误: ${error.message}`);
    process.exit(1);
  }
}

// 执行构建流程
build();
