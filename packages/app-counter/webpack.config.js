const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/app.js',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3002,
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
    filename: 'counter.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'counter',
      filename: 'remoteEntry.js',
      exposes: {
        './Counter': './src/components/counter.jsx'
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
