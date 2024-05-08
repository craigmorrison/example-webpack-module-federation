const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;
const {
  ModuleFederationPlugin
} = require('@module-federation/enhanced/rspack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(?:t|j)sx?$/,
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
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    port: 3003,
    historyApiFallback: true,
    hot: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'people',
      filename: 'people-remote-entry.js',
      exposes: {
        './People': './src/components/people'
      },
      shared: [
        {
          // ...deps,
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
