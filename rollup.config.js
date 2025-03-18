// rollup.config.js
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');
const { babel } = require('@rollup/plugin-babel');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

// 区分环境处理
const plugins = [
  nodeResolve({
    preferBuiltins: false,
    browser: true
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    outputToFilesystem: true,
    sourceMap: true
  }),
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    presets: [
      ['@babel/preset-env', {
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'not dead']
        }
      }],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        regenerator: true
      }]
    ]
  })
];

// 生产环境添加压缩
if (isProduction) {
  plugins.push(terser());
}

module.exports = {
  input: 'src/components/ECharts/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  external: [
    'react',
    'react-dom',
    '@tarojs/components',
    '@tarojs/taro',
    'echarts',
    'echarts/core',
    'echarts/charts',
    'echarts/components',
    'echarts/renderers',
    'echarts-for-react',
    'echarts-for-react/lib/core',
    /@babel\/runtime/
  ],
  plugins
};
