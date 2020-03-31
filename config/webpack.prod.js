const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

//设置webpack环境
process.env.NODE_ENV = 'production';

//插件创建
const htmlPlugin = new HtmlWebpackPlugin({
    template: 'index.html', //因为这里是相对于 根目录 这里是同级别的
    filename: 'index.html',
    favicon: "favicon.ico",
    minify: {
        collapseWhitespace: true, //代码压缩
        removeAttributeQuotes: true, //移除引号
        removeComments: true, //移除注释
    },
    hash: true
});
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: 'static/css/main.css',
    chunkFilename: '[id].css',
    hmr: process.env.NODE_ENV === 'development', //开发模式开启热加载 并且设置hot
    reloadAll: true, // if hmr does not work, this is a forceful method.
});

module.exports = {
    mode: 'production',
    entry: './src/index.jsx', //必须使用‘./’开头不然识别不出来
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'static/js/bundle.js' //直接可以写js,这样js文件会被打包入build/js/build.js
    },
    plugins: [htmlPlugin, new CleanWebpackPlugin, miniCssExtractPlugin, new ManifestPlugin],
    module: {
        rules: [{
            test: /\.js|jsx$/,
            use: 'babel-loader',
            exclude: /node_modules/ //打包时不会被babel  做 es6 => es5
        }, {
            test: /favicon\.ico/,
            use: {
                loader: "file-loader",
                options: {
                    name: "./favicon.ico"
                }
            }
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
                /* 3 js中的css抽成单独文件并且加入link */
                MiniCssExtractPlugin.loader,
                /* 2 css加载到js中 */
                { loader: "css-loader", options: { sourceMap: true } },
                {
                    loader: "postcss-loader", //1-2 添加css前缀
                    options: {
                        indent: "postcss",
                        // package.json中的 browserslist区分开发和生成环境
                        plugins: () => [require("postcss-preset-env")()],
                        sourceMap: true
                    }
                },
                /* 1 将sass转换为css */
                { loader: "sass-loader", options: { sourceMap: true } }
            ]
        }]
    },
    devtool: "source-map",
    // 引入资源省略后缀、资源别名配置
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../src'), //相对于本文件的位置
            '~': path.resolve(__dirname, '../')
        }

    }
};