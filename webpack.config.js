var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?https://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './kanbanAsync/index.js'
    ],
    output: {
        filename: './kanbanAsync/dist/bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /.\jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}