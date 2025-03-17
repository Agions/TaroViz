const path = require('path');

module.exports = {
  mini: {
    webpackChain(chain, webpack) {
      // 支付宝小程序特定优化
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              echarts: {
                name: 'vendors-echarts',
                test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
                priority: 20
              }
            }
          }
        }
      });
      
      // 处理支付宝小程序环境
      chain.plugin('define').tap(args => {
        args[0]['process.env'].TARO_ENV = JSON.stringify('alipay');
        return args;
      });
      
      // 支付宝特有能力处理
      chain.resolve.alias
        .set('@/adapters/current', path.resolve(__dirname, '../src/components/ECharts/adapters/alipay.tsx'));
    },
    commonChunks: ['vendors', 'vendors-echarts', 'common', 'taro'],
    postcss: {
      // 支付宝小程序像素单位转换配置
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/^body$/, /^html$/, /\.echarts-/]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 10kb
        }
      }
    }
  },
  // 支付宝小程序专属项目配置
  alipay: {
    compile: {
      exclude: [
        path.resolve(__dirname, '../src/components/ECharts/adapters/h5.tsx'),
        path.resolve(__dirname, '../src/components/ECharts/adapters/weapp.tsx'),
        path.resolve(__dirname, '../src/components/ECharts/adapters/rn.tsx'),
        path.resolve(__dirname, '../src/components/ECharts/adapters/harmony.tsx')
      ]
    },
    // 支付宝小程序组件库适配
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
      375: 2 / 1
    }
  }
}; 