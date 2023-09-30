const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
// Added HtmlWebpackPlugin GenerateSW and WebpackPwaManifest
    plugins: [
      new HtmlWebpackPlugin( {    // Added this plugin
        template: './index.html',
        title: 'Text Editor'
      }),          
      new WebpackPwaManifest({   // Added this plugin
        name: 'Text Editor',
        short_name: 'Txt Ed',
        description: 'Edit text online or offline!',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('Develop/client/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('Develop', icons),
          },
        ],
      }),
    ],
// Added CSS loader rules and Babel rules 
    module: {
      rules: [
        {
          test: /\.css$/i,                         
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/present-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        },
      ],
    },
  };
};
