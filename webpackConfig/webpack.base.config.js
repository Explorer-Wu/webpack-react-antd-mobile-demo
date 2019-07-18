
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const postcssNormalize = require('postcss-normalize');
const webpack = require('webpack'); //访问内置的插件
let utils = require('./utils')
let config = require('./index')

// const commonConfig
module.exports = {
    //webpack 的主目录,基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    // entry 和 module.rules.loader 选项,相对于此目录解析
    context: path.resolve(__dirname, '../'),
    entry: {
        app: [
            '@babel/polyfill',
            './src/main.js' //resolve('/src/main.js')
        ],
        vendor: ['react', 'react-dom'] //['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        path: config.build.assetsRoot,  //path: resolve('/dist'),
        filename: '[name].[hash]js',
        chunkFilename: '[name].[chunkhash].js',  //决定 non-entry chunk(非入口 chunk) 的名称
        //publicPath: "/"
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    module: {
        // strictExportPresence: true, 废弃
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
                test: /\.(js|jsx)$/, // /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                exclude: /\/node_modules\//,
                include: [utils.resolve('src')],
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),
                        },
                    },
                ],  
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('static/images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('static/media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('static/fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    // test: /[\\/]node_modules[\\/]/,
                    test: /node_modules\/(.*)\.js/
                },
                manifest: {
                    name: 'manifest',
                    chunks: 'initial',
                },
                styles: {
                    name: 'styles',
                    test: /\.scss|css$/,
                    chunks: 'all', // merge all the css chunk to one file
                    enforce: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        //在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源。而 stats 中所有 assets 中的 emitted 标记都是 false
        noEmitOnErrors: true
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html', //resolve('/public/index.html'),
            inject: true
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            // publicPath: '/',
            publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
            generate: (seed, files) => {
                const manifestFiles = files.reduce(function(manifest, file) {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);

                return {
                    files: manifestFiles,
                };
            },
        }),
    ],
    // 配置模块如何解析
    // 请求重定向，显示指出依赖查找路径  resolve.alias 配置路径映射，减少文件递归解析
    resolve: {
        //webpack 解析模块时应该搜索的目录, （不适用于对 loader 解析）
        // modules: [utils.resolve('/'), 'node_modules'],
        //自动解析确定的扩展, require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.less', '.tpl', 'png', 'jpg', 'jpeg', 'gif'], 
        //配置别名，在项目中可缩减引用路径 
        alias: {
            'public': utils.resolve('public'), //path.join(__dirname, '../public'),
            '@pages': utils.resolve('src/pages'),
            '@router': utils.resolve('src/router'),
            '@components': utils.resolve('src/components'),
            '@containers': utils.resolve('src/reduxstore/containers'),
            '@actions': utils.resolve('src/reduxstore/actions'),
            '@reducers': utils.resolve('src/reduxstore/reducers'),
            '@store': utils.resolve('src/reduxstore/store'),
            '@utils': utils.resolve('src/utils'),
            '@api': utils.resolve('src/api'),
            'mock': utils.resolve('mock'),
            '@': utils.resolve('src'),
            // 'static': utils.resolve('static'),
        }
    },
    //配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块
    //配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块
    //每个属性都是 Node.js 全局变量或模块的名称，每个 value 是以下其中之一
    // true：提供 polyfill。
    // "mock"：提供 mock 实现预期接口，但功能很少或没有。
    // "empty"：提供空对象。
    // false: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，触发 ReferenceError 而崩溃。
    //尝试使用 require('modulename') 导入模块的代码，可能会触发 Cannot find module "modulename" 错误。
    node: {
        // prevent webpack from injecting useless setImmediate polyfill
        // because source contains it (although only uses it if it's native).
        setImmediate: true, //boolean | "mock" | "empty"
        process: true,  //boolean | "mock"
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
        // path: true,
        // url: false
    }
};