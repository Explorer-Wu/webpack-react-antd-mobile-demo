
const webpack = require('webpack')
const utils = require('./utils')
const config = require('./index')
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
    name: "app",
    dependencies: ["vendor"],
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
                include: [utils.resolve('src'), utils.resolve('libs'), utils.resolve('test')], //resolve('node_modules/webpack-dev-server/client')  path.join(__dirname, 'src') 
                // use: ['babel-loader?cacheDirectory=true'], 之前是使用这种方式直接使用 loader
                // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
                use: 'happypack/loader?id=babel'  // use: 'happypack/loader?id=jsx'
                // use: [{
                //     loader: 'babel-loader',
                //     /*cacheDirectory是用来缓存编译结果，下次编译加速*/
                //     options: {
                //         cacheDirectory: true,
                //         // cacheCompression: isEnvProduction,
                //         // compact: isEnvProduction,
                //     }
                // }],
            },
            // ...utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
            {
                test: /\.(css|less)$/,
                // use: [
                //     'style-loader',
                //     'css-loader',
                //     // {
                //     //     loader: 'css-loader',
                //     //     options: {
                //     //         modules: {
                //     //             mode: 'local',
                //     //             localIdentName: '[path][name]__[local]--[hash:base64:5]',
                //     //             context: utils.resolve('/'),
                //     //             hashPrefix: 'my-custom-hash',
                //     //         }  
                //     //     }
                //     // },
                //     'postcss-loader',
                //     'less-loader'
                // ]
                
                // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
                use: ['happypack/loader?id=styles'],
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
        quiet: false, // necessary for FriendlyErrorsPlugin
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
        // new webpack.ProvidePlugin({
        //     _: "lodash"
        // }),
        //开发环境使用dll分割代码
        new webpack.DllReferencePlugin({
            //content (optional): 请求到模块 id 的映射 (默认值为 manifest.content)
            context: utils.resolve('libs'),  //(绝对路径) manifest (或者是内容属性)中请求的上下文
            manifest: utils.resolve('libs/vendor-dll-manifest.json'), //包含 content 和 name 的对象，或者在编译时(compilation)的一个用于加载的 JSON manifest 绝对路径
            //dll 暴露的地方的名称 (默认值为 manifest.name) (可参考 externals)
            name: './libs/vendor.dll.js', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
           // dll 是如何暴露的 (libraryTarget)
            sourceType: 'umd', //对应 dll.config 中的 libraryTarget: 'umd'  //sourceType: "commonsjs",
            scope: 'vendor', //dll 中内容的前缀
        }),
        // new webpack.DllReferencePlugin({
        // //scope: "beta",  用于访问dll的内容的前缀
        // context: __dirname,
        // manifest: require(path.join(LIB_DIR, 'HighCharts-dll-manifest.json')),
        // name: "HighCharts_dll",
        // // sourceType: "umd",
        // // extensions: [".js", ".jsx"]
        // }),
        
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: utils.resolve('public/static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ],
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