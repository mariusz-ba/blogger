import path from 'path';

export default {
  entry: path.join(__dirname, '/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/server/public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loaders: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}