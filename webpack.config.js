const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const config = require('./src/config.json');

const isProduction = process.env.NODE_ENV !== 'development';
const styleHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-source-map',
    entry: {
        index: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name]-[chunkhash:8].js',
        chunkFilename: 'js/[name]-[chunkhash:5].js',
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
        
        },
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'src/asset', to: './asset'}
            ],
        }),
        new HtmlWebpackPlugin({
            title: config.site.name,
            template: './src/template.html',
            filename: 'index.html',
            scriptLoading: 'defer',
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css',
            chunkFilename: 'css/[name].[chunkhash].css',
        }),
        new Dotenv({
            ignoreStub: true,
            path: isProduction ? '.prod.env' : '.env',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: isProduction ? 'tsconfig.prod.json' : 'tsconfig.json',
                },
            },
            {
                test: /\.mod.scss$/,
                exclude: /node_modules/,
                use: [
                    {loader: styleHandler},
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName: '[local]--[hash:5]',
                            },
                            importLoaders: 2,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [styleHandler, {loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader'],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]',
                },
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif|ico|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash][ext]',
                },
            }
        ],
    },
    optimization: {
        chunkIds: 'named',
        mergeDuplicateChunks: true,
        moduleIds: 'named',
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        historyApiFallback: true,
        open: false,
        compress: true,
        hot: true,
        port: 9000,
        host: '0.0.0.0',
        http2: false, //не работет с последней нодой.
        https: true
    },
};
