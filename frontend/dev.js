let path = require('path');

module.exports = {
  devtool: 'eval',

  entry: path.resolve(__dirname, 'src/js/index.js'),

  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'bundle.js'
  },

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