const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/**/*', ignore: [ '*.js' ], flatten: true },
      ]),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
};
