
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../webpackConfig')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV === 'testing'
  ? require('../webpackConfig/test.env')
  : require('../webpackConfig/prod.env')


const prodConfig = {
    mode: 'production',
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    // 在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。
    bail: true,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
        // publicPath: process.env.NODE_ENV === 'production' ?
        //     config.build.assetsPublicPath :
        //     config.dev.assetsPublicPath
    },
    module: {
        rules: [{
            test: /\.(js|mjs|jsx|ts|tsx)$/, //test: /\.(js|jsx)$/,  //test: /\.js$/,
            exclude: /\/node_modules\//,
            include: [utils.resolve('src'), utils.resolve('test')], //path.join(__dirname, 'src')
            // use: ['babel-loader?cacheDirectory=true'], 
            use: [{
                loader: 'babel-loader',
                /*cacheDirectory是用来缓存编译结果，下次编译加速*/
                options: {
                    cacheDirectory: true,
                    cacheCompression: true,
                    compact: true,
                }
            }],
        },{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                // use: ["css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader"]
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]--[hash:base64:5]',
                            // url: false,
                            minimize: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            })
        }],
        // rules: utils.styleLoaders({
        //     sourceMap: config.build.productionSourceMap,
        //     extract: true,
        //     usePostCSS: true
        // })
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            }),
        ],
    },
    // 插件配置
    plugins: [
        new CleanWebpackPlugin(['dist']), //new CleanWebpackPlugin(['dist/*.*']), // 每次打包前清空
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'), //'[name].[chunkhash].css',
            // disable: false,
            allChunks: true
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        // new MiniCssExtractPlugin({ // 压缩css
        //     filename: "[name].[contenthash].css",
        //     chunkFilename: "[id].[contenthash].css"
        // }),
        // new OptimizeCssAssetsPlugin()
        new HtmlWebpackPlugin({
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
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vender modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        // new webpack.optimize.ModuleConcatenationPlugin(),
        
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../public/static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
        }])
    ],
    externals: { React: 'React', 'react-dom': 'react-dom' },
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
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    prodConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseWebpackConfig, prodConfig);