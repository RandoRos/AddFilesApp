const path = require('path');

module.exports = {
    entry: './src/components/index.js',
    output: {
        path: path.join(__dirname, 'public', 'js'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
        }],
    },
};
