
const path = require('path');
const webpack = require('webpack'); //访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const postcssNormalize = require('postcss-normalize');

const HappyPackPlugin = require('./happypack.plugin');

let utils = require('./utils')
let config = require('./index')

// const commonConfig
module.exports = {
    //webpack 的主目录,基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    // entry 和 module.rules.loader 选项,相对于此目录解析
    context: utils.resolve('/'),
    entry: {
        app: [
            // '@babel/polyfill',
            './src/main.js' //resolve('/src/main.js')
        ],
        // vendor: ['react', 'react-dom', 'react-router-dom', 'react-router-config'] //[ 'redux', 'react-redux']
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
        noParse: /lodash/, // 忽略未采用模块化的文件，因此jquery或lodash将不会被下面的loaders解析
        // noParse: function(content) {
        //     return /jquery|lodash/.test(content)
        // },
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
                test: /\.(js|jsx)$/, // /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                exclude: /\/node_modules\//,
                include: [utils.resolve('src'), utils.resolve('libs'), utils.resolve('test')],
                use: 'happypack/loader?id=eslint'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'async', // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
            minSize: 30000, // 模块超过30k自动被抽离成公共模块
            minChunks: 1, // 模块被引用>=1次，便分割
            maxAsyncRequests: 5,  // 异步加载chunk的并发请求数量<=5
            maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
            name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
            automaticNameDelimiter: '~', // 命名分隔符
            cacheGroups: { // 缓存组，会继承和覆盖splitChunks的配置
                default: { // 模块缓存规则，设置为false，默认缓存组将禁用
                    minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                    priority: -20, // 优先级
                    reuseExistingChunk: true, // 默认使用已有的模块
                },
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    // test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
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
            },
        },
        //在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源。而 stats 中所有 assets 中的 emitted 标记都是 false
        noEmitOnErrors: true
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            // publicPath: '/',
            basePath: config.build.assetsRoot,
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
        //自动生成html文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html', //resolve('/public/index.html'),
            inject: true,
            hash: true,
            cache: true,
            // chunks: ['main', 'vendor'],
            chunksSortMode: 'dependency',
            favicon: utils.resolve('public/favicon.ico'),
        }),
        ...HappyPackPlugin
    ],
    // 配置模块如何解析
    // 请求重定向，显示指出依赖查找路径  resolve.alias 配置路径映射，减少文件递归解析
    resolve: {
        modules: [ // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
            utils.resolve('src'),
            utils.resolve('node_modules'),
        ],
        mainFields: ['main'], // 只采用main字段作为入口文件描述字段，减少搜索步骤
        //webpack 解析模块时应该搜索的目录, （不适用于对 loader 解析）
        // modules: [utils.resolve('/'), 'node_modules'],
        //自动解析确定的扩展, require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.less', '.tpl', 'png', 'jpg', 'jpeg', 'gif'], 
        //配置别名，在项目中可缩减引用路径 
        alias: {
            'public': utils.resolve('/public'), //path.join(__dirname, '../public'),
            '@views': utils.resolve('/src/views'),
            '@router': utils.resolve('/src/router'),
            '@components': utils.resolve('/src/components'),
            '@containers': utils.resolve('/src/reduxstore/containers'),
            '@actions': utils.resolve('/src/reduxstore/actions'),
            '@reducers': utils.resolve('/src/reduxstore/reducers'),
            '@store': utils.resolve('/src/reduxstore/store'),
            '@utils': utils.resolve('/src/utils'),
            '@api': utils.resolve('/src/api'),
            'mock': utils.resolve('/mock'),
            '@': utils.resolve('/src'),
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