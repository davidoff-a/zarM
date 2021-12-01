const path = require("path");
// const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}