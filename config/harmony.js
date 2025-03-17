// config/harmony.js
const path = require('path');

module.exports = {
  harmony: {
    // 鸿蒙应用名
    appName: 'TaroECharts',
    // 鸿蒙项目ID
    bundleName: 'com.taro.echarts',
    // 编译设置
    compileSdkVersion: 8,
    // 最低兼容版本
    compatibleSdkVersion: 7,
    // 目标版本
    targetSdkVersion: 8,
    // 鸿蒙特有配置
    webpackChain(chain, webpack) {
      // 处理鸿蒙环境
      chain.plugin('define').tap(args => {
        args[0]['process.env'].TARO_ENV = JSON.stringify('harmony');
        return args;
      });
      
      // 鸿蒙特有能力处理
      chain.resolve.alias
        .set('@/adapters/current', path.resolve(__dirname, '../src/components/ECharts/adapters/harmony.tsx'));
      
      // 排除其他平台代码
      chain.module
        .rule('compile')
        .exclude
        .add(/src\/components\/ECharts\/adapters\/(h5|weapp|alipay|rn)\.tsx$/)
        .end();
    },
    // 分包策略
    subpackages: false,
    // 公共模块配置
    commonChunks: ['vendors', 'common'],
    // 静态资源处理
    copy: {
      patterns: [
        { from: 'src/assets/', to: 'assets/' }
      ]
    },
    // 鸿蒙特有编译配置
    compile: {
      ignore: [
        'src/components/ECharts/adapters/h5.tsx',
        'src/components/ECharts/adapters/weapp.tsx',
        'src/components/ECharts/adapters/alipay.tsx',
        'src/components/ECharts/adapters/rn.tsx'
      ]
    },
    // 样式处理
    postcss: {
      // 鸿蒙环境像素转换配置
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/^body$/, /^html$/, /\.echarts-/]
        }
      }
    }
  }
}; 