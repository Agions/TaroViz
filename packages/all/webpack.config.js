const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const rootDir = path.resolve(__dirname, '../..');

module.exports = [
  // CommonJS
  {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        type: 'commonjs2'
      }
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
                  ['@babel/preset-env', {
                    targets: {
                      browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
                    },
                    useBuiltIns: 'usage',
                    corejs: 3
                  }],
                  '@babel/preset-react',
                  '@babel/preset-typescript'
                ],
                plugins: [
                  ['@babel/plugin-proposal-decorators', { legacy: true }]
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(rootDir, './tsconfig.json'),
                compilerOptions: {
                  declaration: true,
                  declarationDir: './dist'
                },
                transpileOnly: true,
                ignoreDiagnostics: [6133, 2769, 2540, 2683]
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          type: 'asset'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@taroviz/core': path.resolve(rootDir, 'packages/core/src'),
        '@taroviz/adapters': path.resolve(rootDir, 'packages/adapters/src'),
        '@taroviz/charts': path.resolve(rootDir, 'packages/charts/src'),
        '@taroviz/themes': path.resolve(rootDir, 'packages/themes/src'),
        '@taroviz/data': path.resolve(rootDir, 'packages/data/src'),
        '@taroviz/hooks': path.resolve(rootDir, 'packages/hooks/src')
      }
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
              drop_debugger: isProduction
            },
            format: {
              comments: false
            },
            mangle: {
              properties: {
                regex: /^_/
              }
            }
          }
        })
      ]
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
            global: false
          }
        }
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ]
  },
  // ESM
  {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.esm.js',
      library: {
        type: 'module'
      }
    },
    experiments: {
      outputModule: true
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
                  ['@babel/preset-env', {
                    targets: {
                      browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
                    },
                    useBuiltIns: 'usage',
                    corejs: 3
                  }],
                  '@babel/preset-react',
                  '@babel/preset-typescript'
                ],
                plugins: [
                  ['@babel/plugin-proposal-decorators', { legacy: true }]
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(rootDir, './tsconfig.json'),
                compilerOptions: {
                  declaration: false
                },
                transpileOnly: true,
                ignoreDiagnostics: [6133, 2769, 2540, 2683]
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          type: 'asset'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@taroviz/core': path.resolve(rootDir, 'packages/core/src'),
        '@taroviz/adapters': path.resolve(rootDir, 'packages/adapters/src'),
        '@taroviz/charts': path.resolve(rootDir, 'packages/charts/src'),
        '@taroviz/themes': path.resolve(rootDir, 'packages/themes/src'),
        '@taroviz/data': path.resolve(rootDir, 'packages/data/src'),
        '@taroviz/hooks': path.resolve(rootDir, 'packages/hooks/src')
      }
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
              drop_debugger: isProduction
            },
            format: {
              comments: false
            },
            mangle: {
              properties: {
                regex: /^_/
              }
            }
          }
        })
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(rootDir, './tsconfig.json'),
          diagnosticOptions: {
            semantic: true,
            syntactic: false,
            declaration: false,
            global: false
          }
        }
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ]
  }
]; 