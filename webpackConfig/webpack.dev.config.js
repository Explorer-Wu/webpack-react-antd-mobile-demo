
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../webpackConfig')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devConfig = {
    mode: 'development',
    // devtool: 'inline-source-map',
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    // entry: {
    //     app: [
    //         // 'react-hot-loader/patch',
    //         '@babel/polyfill',
    //         utils.resolve('src/main.js')
    //     ]
    // },
    // output: {
    //     path: config.build.assetsRoot,  //path: resolve('/dist'),
    //     // path: path.join(__dirname, '../dist'),
    //     /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
    //     filename: '[name].[hash].js',
    //     chunkFilename: '[name].[chunkhash].js',
    // },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/, //test: /\.(js|jsx)$/,  //test: /\.js$/,
                exclude: /\/node_modules\//,
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../test')], //resolve('node_modules/webpack-dev-server/client')  path.join(__dirname, 'src') 
                // use: ['babel-loader?cacheDirectory=true'], 
                use: [{
                    loader: 'babel-loader',
                    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
                    options: {
                        cacheDirectory: true,
                        // cacheCompression: isEnvProduction,
                        // compact: isEnvProduction,
                    }
                }],
            },
            // ...utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
            {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader",
                //     publicPath: "/dist"
                // })
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            // localIdentName: '[local]--[hash:base64:5]'s
                            modules: { localIdentName: '[hash:base64:5][path]-[local]' }
                        }
                    },
                    'postcss-loader',
                    // 'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        //tree shaking通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)
        usedExports: true,
        splitChunks: {
          chunks: 'all'
        }
    },
    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
        contentBase: false, //设置为 false 以禁用 contentBase。 默认情况下，将使用当前工作目录作为提供内容的目录，如：[path.join(__dirname, 'public'), path.join(__dirname, 'assets')]。
        compress: true, // gzip压缩
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': require('./dev.env'), //config.dev.env JSON.stringify(process.env.NODE_ENV)
        // }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // - new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        // - new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            _: "lodash"
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public/static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
};

// const devWebpackConfig = merge({
//     customizeArray(a, b, key) {
//         /*entry.app不合并，全替换*/
//         console.log("devMerge:", key)
//         if (key === 'entry.app') {
//             return b;
//         }
//         return undefined;
//     }
// })(baseWebpackConfig, devConfig);

module.exports = merge(baseWebpackConfig, devConfig);