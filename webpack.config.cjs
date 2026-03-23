/**
 * TaroViz Webpack 配置
 * 单包构建架构，输出 CommonJS 和 ES Module 两种格式
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// 基础配置
const baseConfig = {
  entry: './src/index.ts',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    modules: [path.resolve(__dirname, 'node_modules')],
    mainFiles: ['index'],
    conditionNames: ['require', 'node', 'module'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [
          /node_modules/, 
          /packages/, 
          /__tests__/, 
          /\.test\.(ts|tsx)$/,
          /src\/main\.tsx/ // Exclude the test application entry point
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
              compilerOptions: {
                module: 'esnext',
                target: 'es5',
                jsx: 'react',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // ForkTsCheckerWebpackPlugin disabled for faster builds
    // Enable when TypeScript errors are fixed
    // new ForkTsCheckerWebpackPlugin({
    //   async: true,
    //   typescript: {
    //     diagnosticOptions: {
    //       semantic: true,
    //       syntactic: true,
    //     },
    //     mode: 'write-references',
    //   },
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            passes: 1,
          },
          format: {
            comments: false,
          },
          ecma: 2020,
          warnings: false,
        },
        extractComments: false,
        parallel: true,
      }),
    ],
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    mangleExports: 'deterministic',
    usedExports: true,
    sideEffects: true,
  },
  // 对于库构建，禁用性能警告（库本身带依赖是正常的）
  performance: false,
  externals: (context, request, callback) => {
    // 将 echarts, react, zrender 等外部化
    if (
      request === 'react' ||
      request === 'react-dom' ||
      request === 'echarts' ||
      request === 'echarts/core' ||
      request === 'echarts/charts' ||
      request === 'echarts/components' ||
      request === 'echarts/renderers' ||
      request === 'zrender'
    ) {
      return callback(null, 'commonjs ' + request);
    }
    callback();
  },
};

// CommonJS 配置
const cjsConfig = {
  ...baseConfig,
  name: 'cjs',
  output: {
    path: path.resolve(__dirname, 'dist/cjs'),
    filename: 'index.js',
    library: {
      type: 'commonjs2',
    },
  },
};

// ES Module 配置
const esmConfig = {
  ...baseConfig,
  name: 'esm',
  output: {
    path: path.resolve(__dirname, 'dist/esm'),
    filename: 'index.js',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  externals: (context, request, callback) => {
    // 将 echarts, react, zrender 等外部化
    if (
      request === 'react' ||
      request === 'react-dom' ||
      request === 'echarts' ||
      request === 'echarts/core' ||
      request === 'echarts/charts' ||
      request === 'echarts/components' ||
      request === 'echarts/renderers' ||
      request === 'zrender'
    ) {
      return callback(null, 'commonjs ' + request);
    }
    callback();
  },
  optimization: {
    minimize: false,
  },
};

// 开发环境配置
const devConfig = {
  ...baseConfig,
  entry: './src/main.tsx',
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [
          /node_modules/, 
          /packages/, 
          /__tests__/, 
          /\.test\.(ts|tsx)$/
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
  },
  plugins: [...baseConfig.plugins, new BundleAnalyzerPlugin()],
  externals: {}, // No externals in dev mode
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};

// 根据环境返回不同配置
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return devConfig;
  }
  
  // 生成stats文件用于分析
  if (argv.analyze) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    cjsConfig.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
    }));
    esmConfig.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report-esm.html',
      openAnalyzer: false,
    }));
  }
  
  return [cjsConfig, esmConfig];
};