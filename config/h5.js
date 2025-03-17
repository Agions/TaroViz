// config/h5.js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  h5: {
    webpackChain(chain, webpack) {
      // H5特定优化
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              echarts: {
                name: 'echarts',
                test: /[\\/]node_modules[\\/](echarts|echarts-for-react|zrender)[\\/]/,
                priority: 20,
                chunks: 'all'
              },
              vendors: {
                name: 'vendors',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'all'
              }
            }
          },
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                // 特别针对ECharts优化
                compress: {
                  drop_console: process.env.NODE_ENV === 'production',
                  keep_infinity: true,
                  passes: 2
                },
                mangle: {
                  safari10: true
                },
                output: {
                  comments: false,
                  ascii_only: true
                }
              },
              parallel: true
            })
          ]
        }
      });
      
      // 处理H5环境
      chain.plugin('define').tap(args => {
        args[0]['process.env'].TARO_ENV = JSON.stringify('h5');
        return args;
      });
      
      // H5特有能力处理
      chain.resolve.alias
        .set('@/adapters/current', path.resolve(__dirname, '../src/components/ECharts/adapters/h5.tsx'));
      
      // 针对ECharts的特殊处理
      chain.module
        .rule('echarts-snap')
        .test(/echarts-for-react/)
        .use('babel-loader')
        .loader('babel-loader')
        .options({
          presets: [
            ['@babel/preset-env', {
              modules: false,
              targets: {
                browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
              }
            }]
          ]
        });
    },
    // H5输出配置
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    // HTML模板配置
    htmlPluginOption: {
      meta: {
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
      }
    },
    // 开启资源内联
    miniCssExtractPluginOption: {
      ignoreOrder: true,
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[chunkhash].css'
    },
    // H5特有的样式处理
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
        }
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    // 静态资源路径
    devServer: {
      port: 10086,
      hot: true
    }
  }
}; 