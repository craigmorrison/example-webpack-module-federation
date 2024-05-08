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
    port: 3000,
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic'
                }
              ],
              '@babel/preset-env'
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
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.ejs'
    }),
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        table: 'table@http://localhost:3001/table-remote-entry.js',
        counter: 'counter@http://localhost:3002/counter-remote-entry.js',
        people: 'people@http://localhost:3003/people-remote-entry.js'
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
