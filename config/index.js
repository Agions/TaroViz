const path = require('path');
const merge = require('webpack-merge');
const weappConfig = require('./mini.weapp');
const alipayConfig = require('./mini.alipay');
const h5Config = require('./h5');
const rnConfig = require('./rn');
const harmonyConfig = require('./harmony');

const config = {
  projectName: 'taro-echarts',
  date: '2023-3-13',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    // 通用插件配置
    '@tarojs/plugin-framework-react',
    // TreeShaking插件
    ['@tarojs/plugin-mini-ci', {
      // CI插件配置
      weapp: {
        appid: process.env.WEAPP_APPID || 'your_weapp_appid',
        privateKeyPath: process.env.WEAPP_PRIVATE_KEY_PATH || './keys/private.wx.key'
      },
      alipay: {
        appid: process.env.ALIPAY_APPID || 'your_alipay_appid',
        privateKeyPath: process.env.ALIPAY_PRIVATE_KEY_PATH || './keys/private.alipay.key'
      }
    }]
  ],
  defineConstants: {
    // 全局常量定义
    'process.env.TARO_ECHARTS_VERSION': JSON.stringify(require('../package.json').version)
  },
  copy: {
    patterns: [
      // 复制静态资源
      { from: 'src/assets', to: 'dist/assets' }
    ],
    options: {
      ignore: ['*.d.ts', '*.md', '*.test.{js,ts,jsx,tsx}']
    }
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      // 预编译配置
      enable: false
    }
  },
  cache: {
    enable: false
  },
  // 小程序通用配置
  mini: {
    optimizeMainPackage: {
      enable: true
    },
    imageUrlLoaderOption: {
      limit: 8192
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
      filename: '[name].wxss'
    },
    webpackChain(chain) {
      // 通用优化
      chain.optimization.sideEffects(true);
      
      // 共享模块
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              // 拆分ECharts相关代码
              echarts: {
                name: 'vendors-echarts',
                test: /[\\/]node_modules[\\/](echarts|zrender|echarts-for-weapp)[\\/]/,
                priority: 20,
                chunks: 'all'
              }
            }
          }
        }
      });
      
      // 路径别名
      chain.resolve.alias
        .set('@', path.resolve(__dirname, '..', 'src'))
        .set('@components', path.resolve(__dirname, '..', 'src/components'))
        .set('@hooks', path.resolve(__dirname, '..', 'src/hooks'))
        .set('@utils', path.resolve(__dirname, '..', 'src/utils'))
        .set('@themes', path.resolve(__dirname, '..', 'src/components/ECharts/themes'));
    }
  },
  // H5通用配置
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    router: {
      mode: 'browser',
      basename: '/taro-echarts'
    }
  }
};

module.exports = function(merge) {
  // 根据环境变量合并相应配置
  const env = process.env.TARO_ENV;
  let platformConfig = {};
  
  if (env === 'weapp') {
    platformConfig = weappConfig;
  } else if (env === 'alipay') {
    platformConfig = alipayConfig;
  } else if (env === 'h5') {
    platformConfig = h5Config;
  } else if (env === 'rn') {
    platformConfig = rnConfig;
  } else if (env === 'harmony') {
    platformConfig = harmonyConfig;
  }
  
  // 合并开发/生产环境配置
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'), platformConfig);
  }
  return merge({}, config, require('./prod'), platformConfig);
}; 