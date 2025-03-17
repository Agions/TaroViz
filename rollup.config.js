// rollup.config.js
const path = require('path');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs').default;
const typescript = require('rollup-plugin-typescript2');
const babel = require('@rollup/plugin-babel').default;
const json = require('@rollup/plugin-json').default;
const terser = require('@rollup/plugin-terser');
const scss = require('rollup-plugin-scss');
const pkg = require('./package.json');

const TARO_ENV = process.env.TARO_ENV || 'all';
const isProduction = process.env.NODE_ENV === 'production';

const getOutput = () => {
  if (TARO_ENV === 'all') {
    return [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ];
  }
  return [
    { file: `dist/index.${TARO_ENV}.js`, format: 'cjs', sourcemap: true },
    { file: `dist/index.${TARO_ENV}.esm.js`, format: 'es', sourcemap: true },
  ];
};

const getInput = () => {
  if (TARO_ENV === 'all') {
    return 'src/index.ts';
  }
  return `src/${TARO_ENV}.ts`;
};

// 根据环境排除不需要的文件
const getExclude = () => {
  if (TARO_ENV === 'h5') {
    return [
      'src/components/ECharts/harmony.tsx',
      'src/components/ECharts/alipay.tsx',
      'src/components/ECharts/weapp.tsx',
      'src/components/ECharts/adapters/harmony.tsx',
      'src/components/ECharts/adapters/alipay.tsx',
      'src/components/ECharts/adapters/weapp.tsx'
    ];
  }
  return [];
};

const plugins = [
  typescript({
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: true,
        declaration: true,
        declarationDir: 'dist/types',
      },
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: getExclude()
    },
  }),
  resolve(),
  commonjs(),
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
  json(),
  isProduction && terser(),
  scss({
    output: 'dist/styles.css',
    outputStyle: 'compressed',
    failOnError: true,
    watch: 'src/components/ECharts/styles',
  }),
];

module.exports = {
  input: getInput(),
  output: getOutput(),
  external: ['react', 'react-dom', '@tarojs/taro', '@tarojs/components'],
  plugins: plugins.filter(Boolean),
};
