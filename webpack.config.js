/* global __dirname */
var path = require('path'),
    webpack = require('webpack');

module.exports = {
    debug: true,
    watch: false,
    entry: {
        main: "./build/app/main.js"
    },
    output: {
        path: path.join(__dirname, "app/modules"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].module.js"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "ng-cache-loader" },
            { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' },
            { test: /\.scss$/, loader: "style-loader!css-loader!autoprefixer-loader!sass-loader" },
            { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    resolve: {
        root: [
            path.join(__dirname, "node_modules"),
            path.join(__dirname, "app"),
        ],
        alias: {
            'npm': __dirname + '/node_modules',
            'libs': __dirname + '/app/libs',
            'app': __dirname + '/app'
        },
        extensions: ['', '.js', '.json', '.html', '.scss'],
        modulesDirectories: ['app/libs', 'node_modules', 'app'],
    },
    plugins: [
        // this tells Webpack to provide the "_" variable globally in all your app files as underscore.
        new webpack.ProvidePlugin({
            "_": "underscore"
        })
    ]
};