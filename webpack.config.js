const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/**/*', ignore: [ '*.js' ], flatten: true }
      ]),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
};
