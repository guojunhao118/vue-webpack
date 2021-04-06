/**
 * 通用配置 入口，出口，插件，loader等
 */
const webpack = require('webpack')

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 是否是开发模式
const devMode = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.join(__dirname, '../dist'),
    },
    module: {
        rules: [
            // 配置babel loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'stage-0'] // env 转换es6 stage-0转es7
                    }
                }
            },
            // 加载 vue 文件
            {
                test: /.vue$/,
                loader: 'vue-loader'
            },
            /**
             * 如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。
             * url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。
             * 再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，
             * 编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，
             * 大于limit的还会使用file-loader进行copy。
             */
            {
                test: /\.(png|gif|jpe?g)/, // ?e可有可无
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name]_[hash:8].[ext]", //[hash]解决缓存，[ext]保留旧文件的文件后缀
                        limit: 1000,  //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath: "image/", //图片放到image/目录下
                        esModule: false,
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 文件大小小于limit参数，url-loader将会把文件转为DataUR
                    limit: 10000,
                    name: '[name]-[hash:5].[ext]',
                    output: 'fonts/'
                }
            },
            // sass 文件转换
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, '../src'),   // 限制打包范围，提高打包速度
                // 排除node_modules文件夹
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                            // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                            publicPath: './',
                            // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                            hmr: devMode, // 仅dev环境启用HMR功能
                        },
                    },
                    // 处理css (前缀，压缩)
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: devMode
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: devMode
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [require('autoprefixer')],
                            sourceMap: devMode
                        }
                    },
                ]
            }

        ]
    },
    plugins: [
        // vue loader 15 版本之后需要此配置
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'vue-webpack',
            template: "./index.html",
        }),
        new MiniCssExtractPlugin({
            // 这里的配置和webpackOptions.output中的配置相似
            // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
        })
    ],
    // 解析模块的可选项
    resolve: {
        // 配置别名
        // modules: [ ]//模块的查找目录 配置其他的css等文件
        extensions: [".js", ".json", ".jsx", ".scss", ".sass", ".css"],  //用到文件的扩展名
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
}
