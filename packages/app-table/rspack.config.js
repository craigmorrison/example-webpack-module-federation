const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  ModuleFederationPlugin
} = require('@module-federation/enhanced/rspack');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/app.js',
  mode: 'development',
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    port: 3001,
    historyApiFallback: true,
    hot: false,
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
        test: /\.(?:t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              [
                '@babel/preset-react',
                { runtime: 'automatic', importSource: '@emotion/react' }
              ]
            ]
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'table',
      filename: 'table-remote-entry.js',
      exposes: {
        './Table': './src/components/table.jsx'
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
