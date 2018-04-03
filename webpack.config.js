const webpack = require('webpack')
const path = require('path')
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}