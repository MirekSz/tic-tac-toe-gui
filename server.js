var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    overlay: true,
    noInfo: false,
    quiet: false,
    reload: true,
    stats: {colors: true},
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
});
