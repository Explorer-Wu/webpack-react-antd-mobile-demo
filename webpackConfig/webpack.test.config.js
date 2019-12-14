// This is the webpack config used for unit tests.

var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.config')

var webpackConfig = merge(baseConfig, {
    mode: 'none',
    // use inline sourcemap for karma-sourcemap-loader
    module: {
        rules: utils.styleLoaders()
    },
    devtool: '#inline-source-map',
    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('./test.env')
        })
    ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig