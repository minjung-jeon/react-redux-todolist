const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',

    entry: [
        'webpack-dev-server/client?http://0.0.0.0:4000', // 개발서버의 포트가 이 부분에 입력되어야 제대로 작동합니다
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],

    devtool: 'inline-source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: '/public/'
    },

    devServer: {
        inline: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        hot: true, // 서버에서 HMR을 켠다.
        proxy: {
            "**": "http://localhost:3001" // express 서버주소
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react'],
                            plugins: ['react-hot-loader/babel']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};
