// webpack.config.js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// 获取当前环境
const env = process.env.TARO_ENV || 'all';
const isProduction = process.env.NODE_ENV === 'production';
const shouldAnalyze = process.env.ANALYZE === 'true';

// 忽略的TS错误代码
const ignoredTsErrorCodes = [
  6133, // 声明但未使用
  2769, // No overload matches this call
  2540, // Cannot assign to 'current' because it is a read-only property
  2683, // 'this' implicitly has type 'any'
  7030, // Not all code paths return a value
  2554, // Expected 1 arguments, but got 0
  2308  // Module has already exported a member named 'version'
];

// 外部依赖不打包
const externals = [
  'react',
  'react-dom',
  '@tarojs/taro',
  '@tarojs/components',
  'echarts',
  'echarts/core',
  'echarts/charts',
  'echarts/components',
  'echarts/renderers',
  'echarts-for-react',
];

// 平台特定入口
const platformEntries = env === 'all'
  ? {
      h5: './packages/adapters/src/h5/index.ts',
      weapp: './packages/adapters/src/weapp/index.ts',
      alipay: './packages/adapters/src/alipay/index.ts',
      harmony: './packages/adapters/src/harmony/index.ts',
      swan: './packages/adapters/src/swan/index.ts'
    }
  : { [env]: `./packages/adapters/src/${env}/index.ts` };

// 打包分包
const packageEntries = {
  core: './packages/core/src/index.ts',
  adapters: './packages/adapters/src/index.ts',
  charts: './packages/charts/src/index.ts',
  themes: './packages/themes/src/index.ts',
  data: './packages/data/src/index.ts',
  hooks: './packages/hooks/src/index.ts',
  'core-bundle': './packages/all/src/index.ts'
};

// 设置路径别名
const aliasConfig = {
  '@agions/core': path.resolve(__dirname, 'packages/core/src'),
  '@agions/adapters': path.resolve(__dirname, 'packages/adapters/src'),
  '@agions/charts': path.resolve(__dirname, 'packages/charts/src'),
  '@agions/themes': path.resolve(__dirname, 'packages/themes/src'),
  '@agions/data': path.resolve(__dirname, 'packages/data/src'),
  '@agions/hooks': path.resolve(__dirname, 'packages/hooks/src')
};

// 基础webpack配置
const baseConfig = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
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
              configFile: path.resolve(__dirname, './tsconfig.json'),
              transpileOnly: true,
              ignoreDiagnostics: ignoredTsErrorCodes
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
    alias: aliasConfig
  },
  externals: [nodeExternals({
    allowlist: [/\.css$/, /\.scss$/]
  })],
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
            passes: 3
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
      }),
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, './tsconfig.json'),
        diagnosticOptions: {
          semantic: true,
          syntactic: false,
          declaration: false,
          global: false
        },
        mode: 'write-references'
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};

// 主入口
const mainConfig = {
  ...baseConfig,
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'umd',
      name: 'TaroViz'
    },
    globalObject: 'this'
  }
};

// ESM版本配置
const esmConfig = {
  ...baseConfig,
  entry: {
    'index.esm': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  }
};

// 平台特定配置
const platformConfigs = Object.keys(platformEntries).map(name => ({
  ...baseConfig,
  entry: { [name]: platformEntries[name] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'umd',
      name: ['TaroViz', name]
    },
    globalObject: 'this'
  }
}));

// 平台特定ESM配置
const platformEsmConfigs = Object.keys(platformEntries).map(name => ({
  ...baseConfig,
  entry: { [`${name}.esm`]: platformEntries[name] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  }
}));

// 分包配置
const packageConfigs = Object.keys(packageEntries).map(name => ({
  ...baseConfig,
  entry: { [name]: packageEntries[name] },
  output: {
    path: path.resolve(__dirname, `dist/packages/${name}`),
    filename: 'index.js',
    library: {
      type: 'umd',
      name: ['TaroViz', name]
    },
    globalObject: 'this'
  }
}));

// 分包ESM配置
const packageEsmConfigs = Object.keys(packageEntries).map(name => ({
  ...baseConfig,
  entry: { [name]: packageEntries[name] },
  output: {
    path: path.resolve(__dirname, `dist/packages/${name}`),
    filename: 'index.esm.js',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  }
}));

// 类型声明配置
const dtsConfigs = Object.keys(packageEntries).map(name => ({
  ...baseConfig,
  entry: { [name]: packageEntries[name] },
  output: {
    path: path.resolve(__dirname, `dist/packages/${name}`),
    filename: 'index.d.ts'
  },
  module: {
    ...baseConfig.module,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, './tsconfig.json'),
              compilerOptions: {
                declaration: true,
                emitDeclarationOnly: true
              },
              ignoreDiagnostics: ignoredTsErrorCodes
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}));

// 分析配置
if (shouldAnalyze) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  baseConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = [
  mainConfig,
  esmConfig,
  ...platformConfigs,
  ...platformEsmConfigs,
  ...packageConfigs,
  ...packageEsmConfigs
]; 