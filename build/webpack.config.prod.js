const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        // 清除output 目录中的所有文件
        new CleanWebpackPlugin()
    ]
})