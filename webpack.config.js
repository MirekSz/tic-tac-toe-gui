var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.join(__dirname, '..', 'app');
var TESTS_DIR = path.join(__dirname, '..', 'tests');

var minified_libs = path.join(__dirname, '..', 'lib');

var deps = [
    'lodash/lodash.min.js'
];


module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: ['webpack-hot-middleware/client?http://localhost:3000&overlay=true',
            './src/index.js'],
        test: ['babel-polyfill', 'webpack-hot-middleware/client?http://localhost:3000&overlay=true&reload=true',
            './autoDiscovery.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel?cacheDirectory'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader",
            include: path.join(__dirname, 'src')
        }]
    }
};