/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';
const rootDir = path.resolve(__dirname, '../..');

// 图表组件列表
const chartComponents = [
  'LineChart',
  'BarChart',
  'PieChart',
  'ScatterChart',
  'RadarChart',
  'FunnelChart',
  'GaugeChart',
  'TreeChart',
  'TreemapChart',
  'SunburstChart',
  'HeatmapChart',
  'GraphChart',
  'ComboChart',
  'DashboardChart',
  'LiquidFillChart',
  'WordCloudChart',
];

// 生成每个图表组件的入口
const generateChartEntries = () => {
  const entries = {};

  // 主入口
  entries.index = './src/index.ts';

  // 每个图表组件单独入口
  chartComponents.forEach(chart => {
    entries[chart] = `./src/${chart}/index.tsx`;
  });

  return entries;
};

module.exports = [
  // CommonJS
  {
    mode: isProduction ? 'production' : 'development',
    entry: generateChartEntries(),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: pathData => {
        return pathData.chunk.name === 'index'
          ? 'index.js'
          : `components/${pathData.chunk.name}.js`;
      },
      library: {
        type: 'commonjs2',
      },
    },
    devtool: isProduction ? false : 'source-map',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        browsers: ['> 1%', 'last 2 versions', 'not ie <= 11'],
                      },
                      useBuiltIns: 'usage',
                      corejs: 3,
                    },
                  ],
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(rootDir, './tsconfig.json'),
                compilerOptions: {
                  declaration: true,
                  declarationDir: './dist',
                },
                transpileOnly: true,
                ignoreDiagnostics: [6133, 2769, 2540, 2683],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(css|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          type: 'asset',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@agions/taroviz-core': path.resolve(rootDir, 'packages/core/src'),
        '@agions/taroviz-adapters': path.resolve(rootDir, 'packages/adapters/src'),
        '@agions/taroviz-charts': path.resolve(rootDir, 'packages/charts/src'),
        '@agions/taroviz-themes': path.resolve(rootDir, 'packages/themes/src'),
        '@agions/taroviz-data': path.resolve(rootDir, 'packages/data/src'),
        '@agions/taroviz-hooks': path.resolve(rootDir, 'packages/hooks/src'),
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              drop_console: isProduction,
              drop_debugger: isProduction,
            },
            format: {
              comments: false,
            },
            mangle: {
              properties: {
                regex: /^_/,
              },
            },
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(rootDir, './tsconfig.json'),
          diagnosticOptions: {
            semantic: true,
            syntactic: false,
            declaration: false,
            global: false,
          },
        },
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
  },
  // ESM
  {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.esm.js',
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
    devtool: isProduction ? false : 'source-map',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        browsers: ['> 1%', 'last 2 versions', 'not ie <= 11'],
                      },
                      useBuiltIns: 'usage',
                      corejs: 3,
                    },
                  ],
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(rootDir, './tsconfig.json'),
                compilerOptions: {
                  declaration: false,
                },
                transpileOnly: true,
                ignoreDiagnostics: [6133, 2769, 2540, 2683],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(css|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          type: 'asset',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@agions/core': path.resolve(rootDir, 'packages/core/src'),
        '@agions/adapters': path.resolve(rootDir, 'packages/adapters/src'),
        '@agions/charts': path.resolve(rootDir, 'packages/charts/src'),
        '@agions/themes': path.resolve(rootDir, 'packages/themes/src'),
        '@agions/data': path.resolve(rootDir, 'packages/data/src'),
        '@agions/hooks': path.resolve(rootDir, 'packages/hooks/src'),
        '@agions/taroviz-core': path.resolve(rootDir, 'packages/core/src'),
        '@agions/taroviz-adapters': path.resolve(rootDir, 'packages/adapters/src'),
        '@agions/taroviz-charts': path.resolve(rootDir, 'packages/charts/src'),
        '@agions/taroviz-themes': path.resolve(rootDir, 'packages/themes/src'),
        '@agions/taroviz-data': path.resolve(rootDir, 'packages/data/src'),
        '@agions/taroviz-hooks': path.resolve(rootDir, 'packages/hooks/src'),
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              drop_console: isProduction,
              drop_debugger: isProduction,
            },
            format: {
              comments: false,
            },
            mangle: {
              properties: {
                regex: /^_/,
              },
            },
          },
        }),
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(rootDir, './tsconfig.json'),
          diagnosticOptions: {
            semantic: true,
            syntactic: false,
            declaration: false,
            global: false,
          },
        },
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
  },
];
