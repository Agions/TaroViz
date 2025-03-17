// config/rn.js
const path = require('path');

module.exports = {
  rn: {
    appName: 'TaroECharts',
    // RN特定配置
    output: {
      // 显式指定输出位置
      iosSourceDir: 'rn_temp/ios',
      androidSourceDir: 'rn_temp/android'
    },
    // 解析设置
    resolve: {
      // 引用模块时可以不写后缀
      include: ['tsx', 'jsx', 'js', 'ts']
    },
    // Metro打包配置
    metro: {
      // 拆分包配置
      transformer: {
        asyncRequireModulePath: require.resolve('metro-react-native-babel-transformer'),
        // 使用Hermes引擎
        enableHermes: true,
        // 优化配置
        minifierConfig: {
          keep_classnames: false,
          keep_fnames: true,
          mangle: {
            toplevel: false,
            keep_fnames: true
          },
          output: {
            ascii_only: true,
            quote_style: 3,
            wrap_iife: true
          },
          sourceMap: {
            includeSources: false
          },
          toplevel: false,
          compress: {
            reduce_funcs: false
          }
        }
      },
      // 配置模块解析
      resolver: {
        extraNodeModules: {
          // RN环境使用WebView版本的ECharts
          '@/adapters/current': path.resolve(__dirname, '../src/components/ECharts/adapters/rn.tsx'),
        },
        // 排除不需要的平台代码
        blacklistRE: /\.(weapp|alipay|harmony|h5)\.tsx$/
      }
    },
    // 兼容设置
    postcss: {
      // RN不使用pxtransform
      pxtransform: {
        enable: false
      },
      // RN环境样式配置
      cssModules: {
        enable: false
      }
    },
    // 模拟适配
    enableMultipleClassName: true,
    // 样式血缘关系
    enableSvgTransform: true,
    // 支持Hermes
    enableHermes: true,
    // 是否分离公共能力
    commonChunks: false,
    // RN不兼容的配置处理
    webpackChain(chain, webpack) {
      // 处理RN环境
      chain.plugin('define').tap(args => {
        args[0]['process.env'].TARO_ENV = JSON.stringify('rn');
        return args;
      });
      
      // 排除不需要的适配器
      chain.module
        .rule('compile')
        .exclude
        .add(/src\/components\/ECharts\/adapters\/(h5|weapp|alipay|harmony)\.tsx$/)
        .end();
    }
  }
}; 