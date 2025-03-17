// config/mini.weapp.js
const path = require('path');

module.exports = {
  mini: {
    webpackChain(chain, webpack) {
      // 微信小程序特定优化
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
      
      // 处理Canvas上下文兼容性
      chain.plugin('define').tap(args => {
        args[0]['process.env'].TARO_ENV = JSON.stringify('weapp');
        return args;
      });
      
      // 微信特有能力处理
      chain.resolve.alias
        .set('@/adapters/current', path.resolve(__dirname, '../src/components/ECharts/adapters/weapp.tsx'));
    },
    commonChunks: ['vendors', 'vendors-echarts', 'common', 'taro'],
    postcss: {
      // 微信小程序像素单位转换配置
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/^body$/, /^html$/, /\.echarts-/]
        }
      },
      // URL处理配置
      url: {
        enable: true,
        config: {
          limit: 10240 // 10kb
        }
      }
    },
    // 启用优化功能
    optimizeMainPackage: {
      enable: true
    }
  },
  // 微信小程序专属项目配置
  weapp: {
    compile: {
      exclude: [
        path.resolve(__dirname, '../src/components/ECharts/adapters/h5.tsx'),
        path.resolve(__dirname, '../src/components/ECharts/adapters/alipay.tsx'),
        path.resolve(__dirname, '../src/components/ECharts/adapters/rn.tsx'),
        path.resolve(__dirname, '../src/components/ECharts/adapters/harmony.tsx')
      ]
    }
  }
}; 