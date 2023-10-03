const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
const WorkboxPlugin = require("workbox-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),  // Below this line, could add - devServer: hot: 'only' - but don't have webopack-dev-server --open 
    },                                        // AND this will run from Heroku, so not needed??
// Added HtmlWebpackPlugin GenerateSW and WebpackPwaManifest
// With the HtmlWebpackPlugin, there is no need for a script inside the index.html file
    plugins: [
      new HtmlWebpackPlugin( {    // Added this plugin
        template: './index.html',
        title: 'Webpack Plugins'      // Activity uses Webpack Plugin as the title
      }),
      new MiniCSSExtractPlugin(), // Added this plugin
      new InjectManifest({        // Added this plugin 
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      //new GenerateSW(),          // Added this plugin
      new WebpackPwaManifest({   // Added this plugin
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Edit text online or offline!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
// Added CSS loader rules and Babel rules 
// Normally, the MiniCSSExtractPlugin is also needed to bundle and build main css folder - this was provided by the activity
    module: {
      rules: [
        {
          test: /\.css$/i,                         
          use: ['style-loader', 'css-loader'],  // For CSS Style Loader
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,  // For images or icons
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,                               // This will downgrade from ES6 to ES5
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
