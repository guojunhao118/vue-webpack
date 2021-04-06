const webpack = require('webpack')
// 合并配置
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const { deviceIp }  = require('./utils')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        contentBase: "./",
        historyApiFallback: true,
        hot: true,
        open: true,
        port: process.env.PORT || 9090,
        host: deviceIp,
        inline: true, // 实时刷新
    },
    plugins: [
        // 处理环境问题
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        })
    ]

})