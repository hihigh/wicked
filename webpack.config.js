const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const config = {
        entry: {
            app: ['./src/assets/js/main.js']
        },
        output: {
            filename: 'js/[name].bundle.js',
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
                    loader: 'style!css!sass'
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
                        name: 'img/[name].[ext]?[hash]'
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
            })
        ]
    };

    if(options.mode === 'development') {
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );

        config.devtool = 'inline-source-map';

        config.devServer = {
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