const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        // 清除output 目录中的所有文件
        new CleanWebpackPlugin(),
        // 处理环境问题
        new webpack.DefinePlugin({
            'process.env': require('../config/pro.env')
        }),
        // 压缩js
        new UglifyjsWebpackPlugin(),
        //src下其他的文件直接复制到dist目录下
        // new CopyWebpackPlugin(
        //     patterns:
        //     [
        //         { from:'./src/assets/favicon.ico',to: 'favicon.ico' }
        //
        //     ]
        // ),
        new CopyWebpackPlugin({
            patterns: [
                {from: './src/assets/favicon.ico', to: 'favicon.ico'}
            ]
        })
    ]
})