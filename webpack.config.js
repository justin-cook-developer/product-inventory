const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './front-end/src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'front-end', 'dist'),
    publicPath: '/',
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'front-end', 'src'),
  //   compress: true,
  //   port: 8080,
  //   hot: true,
  //   historyApiFallback: true,
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
