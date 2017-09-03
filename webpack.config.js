const path = require('path');
const webpack = require('webpack');

// load the web server settings from package.json
const {
  devServer
} = require('./package.json');

// used to copy content from the src folder to the dist folder
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// configure the environment object for development mode
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
//const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const MINIFY = false;

// configure source and distribution folder paths
const srcFolder = 'src';
const srcFolderPath = path.join(__dirname, srcFolder);
const tsFolderPath = path.join(srcFolderPath, 'ts');

// export webpack configuration
const webpackConfig = {

  // root folder for entry point files
  context: tsFolderPath,

  // entry points for the three bundles, order does not matter
  entry: {
    app: [ 'whatwg-fetch', './app.tsx' ],
  },

  // allows us to require modules using
  // import { someExport } from './my-module';
  // instead of
  // import { someExport } from './my-module.ts';
  // with the extensions in the list, it can be omitted from the import
  // root is an absolute path to the folder containing our application modules
  resolve: {
    extensions: [ '.js', '.ts', '.tsx', '.json' ], // order matters, resolves left to right
    modules: [ tsFolderPath, path.join(__dirname, 'node_modules') ],
  },


  module: {
    rules: [
      // process all JavaScript files through the Babel preprocessor
      // this enables support for ES2017 and earlier including modules
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [ 'ts-loader' ],
      },
      // transpiles global SASS stylesheets
      // loader order is executed right to left
      {
        test: /\.s?css$/,
        exclude: [path.join(__dirname, srcFolder, 'ts')],
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    // copy image files, and the index.html file directly when they are changed
    new CopyWebpackPlugin([{
      from: path.join(srcFolderPath, 'images'),
      to: 'images',
    }, ]),
    // configure the file to have the bundle script elements injected
    // this is almost always the main html for the initial loading of 
    // the site
    new HtmlWebpackPlugin({
      template: path.join(srcFolderPath, 'index.html')
    }),
    // setup environment variables 
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(ENV),
      },
    }),
  ],

  // out file settings
  // path points to web server content folder where the web server will serve the files from
  // publicPath is the path to the files from the perspective of the web browser requesting
  // the files from the web server, this is used to insert the script elements into the index.html
  // file
  // file name is the name of the files, where [name] is the name of each entry point
  output: {
    path: path.join(__dirname, devServer.contentBase),
    publicPath: '/',
    filename: '[name].js'
  },

  // use the webpack dev server to serve up the web application
  devServer,

  // use full source maps
  // this specific setting value is required to set breakpoints in the TypeScript
  // in the web browser for development
  // other source map settings do not allow debugging in browser and vscode
  devtool: 'source-map',
};


// only minify code when in production
if (ENV === 'production' && MINIFY) {
  webpackConfig
    .plugins
    .push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = webpackConfig;