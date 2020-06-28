const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        contentBase: "./",
        historyApiFallback: true,
        hot: true,
        open: true,
        port: process.env.PORT || 9090,
        host: '0.0.0.0',
        inline: true, // 实时刷新
    },
})