const {resolve, join} = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = {
    devtool: 'cheap-module-eval-source-map',

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './main.js'
    ],

    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: ''
    },

    context: resolve(__dirname, 'app'),

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'build'),
        historyApiFallback: true,
        publicPath: '/'
    },

    resolve: {
        modules: [join(__dirname, 'app'), 'node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {
            '../../theme.config$': join(__dirname, 'app/assets/theme/theme.config')
        }
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.jsx?$/,
                loaders: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: false
                            }
                        }
                    ],
                    publicPath: '../'
                }))
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'image/png',
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/octet-stream',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'image/svg+xml',
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            // LESS
            {
                test: /\.less$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: [ {
                        loader: 'style-loader'
                    }],
                    use: ['css-loader', 'resolve-url-loader', 'less-loader']
                }))
            },
            // FONTS
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: 'fonts/[name]-[hash:7].[ext]'
                    }
                },
                include: [join(__dirname, 'src'), /[/\\]node_modules[/\\]semantic-ui-less[/\\]/]
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.jsx?$/,
            options: {
                eslint: {
                    configFile: resolve(__dirname, '.eslintrc'),
                    cache: false
                }
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({filename: './styles/style.css', disable: false, allChunks: true}),
        new CopyWebpackPlugin([{from: 'vendors', to: 'vendors'}]),
        new OpenBrowserPlugin({url: 'http://localhost:8080'}),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
