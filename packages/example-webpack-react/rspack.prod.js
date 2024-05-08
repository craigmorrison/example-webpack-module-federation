const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;
const {
  ModuleFederationPlugin
} = require('@module-federation/enhanced/rspack');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[contenthash].js'
  },
  devtool: 'source-map',
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
  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'sw',
      filename: 'remoteEntry.js',
      exposes: {
        './People': './src/components/people-list/people-list.tsx'
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
