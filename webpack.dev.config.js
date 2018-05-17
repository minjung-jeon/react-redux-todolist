const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],

    devtool: 'inline-source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },

    devServer: {
        inline: true,
        port: 3000,
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', {modules: false}],
                                'react'
                            ],
                            plugins: ['react-hot-loader/babel']
                        }
                    }
                ]
            }
        ]
    }
};
