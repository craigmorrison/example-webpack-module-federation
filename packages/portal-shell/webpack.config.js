const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;
const deps = require('./package.json').dependencies;
const SourceMapDevToolPlugin = require('webpack').SourceMapDevToolPlugin;

module.exports = {
  entry: './src/app.js',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'portal.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.ejs'
    }),
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        table: 'table@http://localhost:3001/remoteEntry.js',
        counter: 'counter@http://localhost:3002/remoteEntry.js',
        sw: 'sw@http://localhost:8080/remoteEntry.js'
      },
      shared: [
        {
          ...deps,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: deps.react
          },
          'react-dom': {
            eager: true,
            singleton: true,
            requiredVersion: deps['react-dom']
          }
        }
      ]
    })
  ]
};
