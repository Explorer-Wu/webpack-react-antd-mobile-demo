
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../webpackConfig')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCdnPlugin = require('webpack-cdn-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const env = process.env.NODE_ENV === 'testing'
  ? require('../webpackConfig/test.env')
  : require('../webpackConfig/prod.env')


const prodConfig = {
    mode: 'production',
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    name: "app",
    // dependencies: ["vendor"],
    // 在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。
    bail: true,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    module: {
        rules: [{
            test: /\.(js|mjs|jsx|ts|tsx)$/, //test: /\.(js|jsx)$/,  //test: /\.js$/,
            exclude: /\/node_modules\//,
            // include: [utils.resolve('src'), utils.resolve('libs'), utils.resolve('test')],
            use: 'happypack/loader?id=babel'
            // use: [{
            //     loader: 'babel-loader',
            //     /*cacheDirectory是用来缓存编译结果，下次编译加速*/
            //     options: {
            //         cacheDirectory: true,
            //         cacheCompression: true,
            //         compact: true,
            //     }
            // }],
        },{
            test: /\.(css|less)$/,
            use: [ MiniCssExtractPlugin.loader, 'happypack/loader?id=styles' ],
            // use: [
            //     MiniCssExtractPlugin.loader,
            //     {
            //         loader: 'css-loader',
            //         options: {
                        // modules: {
                        // mode: 'local',
                        // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        // context: utils.resolve('/'),
                        // hashPrefix: 'my-custom-hash',
                        // url: false,
                        //     sourceMap: true
                        // }  

            //             sourceMap: true
            //         }
            //     },
            //     {
            //         loader: 'postcss-loader',
            //         options: {
            //             sourceMap: true
            //         }
            //     }
            // ]
        }],
        // rules: utils.styleLoaders({
        //     sourceMap: config.build.productionSourceMap,
        //     extract: true,
        //     usePostCSS: true
        // })
    },
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true, // Must be set to true if using source-maps in production
    //             terserOptions: {
    //                 // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    //             }
    //         }),
    //         new OptimizeCSSAssetsPlugin({})
    //     ],
    // },
    optimization: {
        minimize: true,
        minimizer: [
          // This is only used in production mode
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              mangle: true, // Note `mangle.properties` is `false` by default.
              // mangle: {
              //   safari10: true,
              // },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
              warnings: true,
              module: false,
              toplevel: false,     
              nameCache: null,
              ie8: false,
              // keep_classnames: undefined,
              // keep_fnames: false,
              // safari10: false,
            },
            // Enable file caching
            cache: true,
            // Use multi-process parallel running to improve the build speed
            // Default number of concurrent runs: os.cpus().length - 1
            // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
            // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
            parallel: true,
            // sourceMap: shouldUseSourceMap,
            sourceMap: true, // Must be set to true if using source-maps in production
          }),
          // This is only used in production mode
          // Compress extracted CSS. We are using this plugin so that possible
          // duplicated CSS from different components can be deduped.
          new OptimizeCSSAssetsPlugin({
            // assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            canPrint: true,
            // cssProcessorPluginOptions: {
            //   preset: ['default', { discardComments: { removeAll: true } }],
            // },
            cssProcessorOptions: config.build.productionSourceMap
              ? {
                safe: true,
                map: {
                    // `inline: false` forces the sourcemap to be output into a separate file
                  inline: false,
                  // `annotation: true` appends the sourceMappingURL to the end of
                  // the css file, helping the browser find the sourcemap
                  annotation: true,
                }
              } : { safe: true }
          }),
        ],
        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
        splitChunks: {
          chunks: 'all',
          name: false,
        },
        // Keep the runtime chunk separated to enable long term caching
        runtimeChunk: true,
    },
    // 插件配置
    plugins: [
      // new CleanWebpackPlugin(), //new CleanWebpackPlugin(['dist/*.*']), // 每次打包前清空
      new CleanWebpackPlugin({
        root: utils.resolve('dist'), // 绝对路径
        verbose: true, // 是否显示到控制台
        dry: false // 不删除所有
      }),
      // new ExtractTextPlugin({
      //     filename: utils.assetsPath('css/[name].[contenthash].css'), //'[name].[chunkhash].css',
      //     // disable: false,
      //     allChunks: true
      // }),
      new MiniCssExtractPlugin({
          filename: utils.assetsPath('css/[name].[contenthash].css'),
          chunkFilename: "static/css/[id].[contenthash].css"
      }),
      
      new HtmlWebpackPlugin({
          // title: 'title',
          // cdnModule: 'react',
          filename: process.env.NODE_ENV === 'testing'
            ? 'index.html'
            : config.build.index,
          template: './public/index.html', //resolve('/public/index.html'),
          inject: true,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
          // chunksSortMode: 'dependency'
          // chunks: ['main', 'vendors'],
          chunksSortMode: 'dependency',
          favicon: utils.resolve('/public/favicon.ico'),
      }),
      new WebpackCdnPlugin({
          modules: [
              { name: 'react', var: 'React', path: `umd/react.${process.env.NODE_ENV}.min.js` },
              { name: 'react-dom', var: 'ReactDOM', path: `umd/react-dom.${process.env.NODE_ENV}.min.js` },
              { name: 'react-router-dom', var: 'react-router-dom', path: 'umd/react-router-dom.min.js' },
              { name: 'react-router-config', var: 'react-router-config', path: 'umd/react-router-config.min.js'}
          ],
          publicPath: '/node_modules'
      }),
      // keep module.id stable when vender modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // enable scope hoisting
      // new webpack.optimize.ModuleConcatenationPlugin(),
      
      // copy custom static assets
      new CopyWebpackPlugin([{
          from: utils.resolve('public/static'),
          to: config.build.assetsSubDirectory,
          ignore: ['.*']
      }])
    ],
    // externals: { React: 'React', 'react-dom': 'react-dom' },
    // library 需要一个名为 lodash 的依赖，这个依赖在 consumer 环境中必须存在且可用
    externals: [
        {
          // String
          // 'react': 'React',
          // 'react-dom': 'ReactDOM',
          'babel-polyfill': 'window', 
          'react': {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
          },
          'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
          },
          // Object
          'lodash': {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_' // indicates global variable
        },
        'react-router-dom': 'ReactRouterDom',
        'react-router-config': 'ReactRouterConfig'
        // 'redux': 'Redux',
        // 'react-redux': 'ReactRedux',
        // 'redux-form': 'ReduxForm',
        // 'immutable': 'Immutable',
        //   'react-redux': 'react-redux'
          // Array,  subtract 可以通过全局 math 对象下的属性 subtract 访问（例如 window['math']['subtract']）
          //subtract: ['./math', 'subtract'] 
        },
        // Function 对于 webpack 外部化，通过定义函数来控制行为, 'commonjs'+ request 定义了需要外部化的模块类型。
        // function(context, request, callback) {
        //     if (/^yourregex$/.test(request)){
        //     return callback(null, 'commonjs ' + request);
        //     }
        //     callback();
        // },
    ],
    performance: {
        hints: "warning", // "warning" 枚举;  "error",性能提示中抛出错误;  false, 关闭性能提示   
        maxAssetSize: 200000, // 整数类型（以字节为单位）此选项根据单个资源体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
        maxEntrypointSize: 400000, // 整数类型（以字节为单位）此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
        assetFilter: function(assetFilename) { //此属性允许 webpack 控制用于计算性能提示的文件
          // 提供资源文件名的断言函数
          return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
};

if (config.build.productionGzip) {
  // const ZipPlugin = require('zip-webpack-plugin')
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
    prodConfig.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
              '\\.(' +
              config.build.productionGzipExtensions.join('|') +
              ')$'
          ),
          include: /\/static$/,
          threshold: 10240,
          minRatio: 0.8
        }),
      
      // new ZipPlugin({
      //   path: utils.resolve('dist'),
      //   filename: 'dist.zip',
      //   fileOptions: {
      //     mtime: new Date(),
      //     mode: 0o100664,
      //     compress: true,
      //     forceZip64Format: false,
      //   },
      //   zipOptions: {
      //     forceZip64Format: false,
      //   },
      // })
    )
}

if (config.build.bundleAnalyzerReport) {
  console.log("bundleAnalyzerReport:", config.build.bundleAnalyzerReport, process.env)
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseWebpackConfig, prodConfig);