const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

//设置webpack环境
process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'development',
    entry: './src/index.jsx', //必须使用‘./’开头不然识别不出来
    output: {
        path: path.resolve(__dirname, '../build'), //相对于本文件所在目录
        filename: 'static/js/bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({ //此插件相对于根目录
            template: 'index.html',
            filename: 'index.html',
            favicon: 'favicon.ico'
        }),
        new ManifestPlugin
    ],
    module: {
        rules: [{
            test: /\.js|jsx$/,
            use: 'babel-loader',
            exclude: /node_modules/ //打包时不会被babel  做 es6 => es5
        }, {
            test: /((?<!favicon)\.ico)|\.(png|jpe?g|gif)/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024 * 8, //8kb以下的会被base64化
                    outputPath: 'static/images/',
                    name: '[hash:10].[ext]', //这里不是使用[name],为了避免重复图片
                    esModule: false //使用commonjs
                }
            }
        }, {
            test: /\.webp$/,
            use: { loader: 'file-loader', options: { name: 'assets/webp/[name].[ext]' } }
        }, {
            test: /\.svg$/,
            use: { loader: 'file-loader', options: { name: 'assets/svg/[name].[ext]' } }
        }, {
            test: /\.scss|sass$/,
            use: [
                "style-loader",
                { loader: "css-loader", options: { sourceMap: true } },
                {
                    loader: "postcss-loader",
                    options: {
                        indent: "postcss",
                        plugins: () => [require("postcss-preset-env")()],
                        sourceMap: true
                    }
                },
                { loader: "sass-loader", options: { sourceMap: true } }
            ]
        }]
    },
    devServer: {
        port: 3000, //监听端口
        contentBase: './build', //基于目录
        hot: true, //开启热更新
        open: true //弹出浏览器
    },
    devtool: "cheap-module-eval-source-map",
    // 引入资源省略后缀、资源别名配置
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../src'), //相对于本文件的位置
            '~': path.resolve(__dirname, '../')
        }
    }
};