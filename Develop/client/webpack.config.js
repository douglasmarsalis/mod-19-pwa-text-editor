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
      path: path.resolve(__dirname, 'dist'),  // Below this line, could add - devServer: hot: 'only' - but don't have webopack-dev-server --open 
    },                                        // AND this will run from Heroku, so not needed??
// Added HtmlWebpackPlugin GenerateSW and WebpackPwaManifest
// With the HtmlWebpackPlugin, there is no need for a script inside the index.html file
    plugins: [
      new HtmlWebpackPlugin( {    // Added this plugin
        template: './index.html',
        title: 'Text Editor'      // Activity uses Webpack Plugin as the title
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
            destination: path.join('Develop', images),
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
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,                               // This will downgrade from ES6 to ES5
          exclude: /(node_modules | bower_components)/, // May not need bower_components, |, and () - This is from activity 8
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
