var webpack = require('webpack');

var config = {
  target: 'electron',
  entry: {
    main: ['webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr', './src/index'],
    gistDetails: './src/gistDetails/gistDetails',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }
      // {
      // test: /\.css$/,
      // loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    // }
    , {
      test: /\.png|\.svg$/,
      loaders: ['file-loader']
    },
      { test: /\.css$/, loader: "style-loader!css-loader" }]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:9000/dist/',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "source-map"
};

module.exports = config;