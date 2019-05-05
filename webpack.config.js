var path = require('path');
var fs = require('fs');
const autoprefixer = require('autoprefixer');

function tryResolve_(url, sourceFilename) {
    // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
    // when the importer throws
    try {
      return require.resolve(url, {paths: [path.dirname(sourceFilename)]});
    } catch (e) {
      return '';
    }
  }
  
  function tryResolveScss(url, sourceFilename) {
    // Support omission of .scss and leading _
    const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`;
    return tryResolve_(normalizedUrl, sourceFilename) ||
      tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
        sourceFilename);
  }
  
  function materialImporter(url, prev) {
    if (url.startsWith('@material')) {
      const resolved = tryResolveScss(url, prev);
      return {file: resolved || url};
    }
    return {file: url};
  }

module.exports = [{
  entry: ['./app.scss', './app.js'],
  output: {
    // This is necessary for webpack to compile
    // But we never use style-bundle.js
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
               plugins: () => [autoprefixer()]
            }
          },
          { loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
              importer: materialImporter
          }
          },
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-assign']
        }
      }
    ]
  },
  devServer: {
    contentBase: './public',
    compress: true,
    host: '0.0.0.0',
    port: 5000,
    disableHostCheck: true,
    https: {
      key: fs.readFileSync('/Users/angus/.keys/rt.itsolver.net.au/privkey1.pem'),
      cert: fs.readFileSync('/Users/angus/.keys/rt.itsolver.net.au/cert1.pem'),
      ca: fs.readFileSync('/Users/angus/.keys/rt.itsolver.net.au/fullchain1.pem')
    }
  }
}];