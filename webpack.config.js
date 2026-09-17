const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', 
  },
  
  devServer: {
    // Указываем серверу брать статику напрямую из папки src
    static: {
      directory: path.resolve(__dirname, 'src'),
      publicPath: '/',
    },
    port: 8080,
    open: true,       
    hot: true,        
    liveReload: true, 
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body', 
    }),
  ],
  
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

