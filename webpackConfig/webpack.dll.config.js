
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const webpack = require('webpack'); //访问内置的插件
let utils = require('./utils')
let config = require('./index')

// const commonConfig
module.exports = {
    context: utils.resolve('/'),
    name: "vendor",
    //要打包的模块的数组
    entry: {
        vendor: [
            '@babel/polyfill',
            'react',
            'react-dom',
            'react-router-dom',
            'react-router-config',
            'axios',
            'lodash'
            // 'redux',
            // 'react-redux',
            // 'common/js/format',
            // 'popup',
            // 'prop-types'
        ]
    },
    output: {
        path: utils.resolve('libs'),  // config.build.assetsRoot+
        filename: '[name].dll.js',
        // filename: '[name].[hash]js',
        chunkFilename: '[name].dll.[chunkhash].js',  //决定 non-entry chunk(非入口 chunk) 的名称
        library: '[name]_dll_[hash]',
        libraryTarget: 'umd',
        publicPath: "/"
        // publicPath: process.env.NODE_ENV === 'production'
        //     ? config.build.assetsPublicPath
        //     : config.dev.assetsPublicPath
    },
    module: {
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
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    'file-loader',
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            // name: utils.assetsPath('media/[name].[hash:7].[ext]')
                        }
                    }
                ],
            },
            // {
            //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //   loader: 'url-loader',
            //   options: {
            //     limit: 10000,
            //     name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            //   }
            // }
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    'file-loader', 
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            minetype: 'application/font-woff',
                        },
                    }
                ],
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    'file-loader',
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            minetype: 'application/font-woff',
                        },
                    }
                ],
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    'file-loader', 
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            minetype: 'application/octet-stream',
                        },
                    }
                ],
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    'file-loader', 
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            minetype: 'application/vnd.ms-fontobject',
                        },
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                 use: [
                     'file-loader',
                      {
                          loader: 'url-loader',
                          options: {
                              limit: 10000,
                              name: utils.assetsPath('images/[name].[hash:7].[ext]')
                          }
                      }
                 ]
            },
        ]
    },
    optimization: {
        // 如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export。
        sideEffects: true
	},
    plugins: [
        new webpack.ProgressPlugin(),
        // 清除上一次生成的文件
        // new CleanWebpackPlugin(), ['/libs'], 
        new CleanWebpackPlugin({
            root: utils.resolve('libs'), // 绝对路径 utils.resolve('/dist'),
            verbose: true, // 是否显示到控制台
            dry: false // 不删除所有
        }),
        new webpack.DllPlugin({
            context: utils.resolve('libs'),
            path: utils.resolve('libs/[name]-dll-manifest.json'),
            name: '[name]_dll_[hash]',
        }),
    ],
};