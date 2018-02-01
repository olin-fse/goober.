let path = require('path');
let webpack = require('webpack');
let CompressionPlugin = require('compression-webpack-plugin');

module.exports = {

  entry: path.resolve(__dirname, 'src/js/index.js'),

  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'bundle.js'
  },

  /*
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true,
      compress: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false,
        beautify: false
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],
  */

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js/'),
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src/less/'),
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ]
      }
    ]
  },
};
