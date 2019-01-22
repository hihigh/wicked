const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
    const config = {
        entry: {
            app: ['./src/assets/js/index.js']
        },
        output: {
            filename: 'js/[name].bundle.js',
            // publicPath: '/dist/',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },

        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use:[
                        {
                            loader: 'vue-loader',
                            options: {
                                loaders: {
                                    'js': 'babel-loader',
                                    'scss': 'vue-style-loader!css-loader!sass-loader',
                                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.s[a|c]ss$/,
                    loader: 'style-loader!css-loader!sass-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                        }
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        publicPath: './dist/images/',
                        name: '[name].[ext]?[hash]'
                    }
                }
            ]
        },

        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'styles': './src/assets/css/style.scss'
            },
            extensions: ['*', '.js', '.vue', '.json']
        },

        plugins : [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, './src/index.html'),
                inject: true,
                filename: path.join(__dirname, './dist/index.html')
            }),

            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, './src/assets/images'),
                    to: path.join(__dirname, './dist/images')
                },
            ])
            // CSS file을 dist폴더로 추출한다.
            // new MiniCssExtractPlugin({
            //     filename: `../css/${cssFilename}`,
            // })
        ]
    };

    if(options.mode === 'development') {
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );

        config.devtool = 'inline-source-map';

        config.devServer = {
            host: '0.0.0.0',
            hot: true,
            port: 8000,
            contentBase: path.resolve(__dirname, 'dist'),
            stats: {
                color: true
            }
        };
    } else {
        config.plugins.push(
            new CleanWebpackPlugin(['dist'])
        );
    }

    return config;
}