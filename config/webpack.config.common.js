const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

const paths = require('./paths')

const isDev = process.env.NODE_ENV === 'development'
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = paths.servedPath === './'
// Options for autoPrefixer
const autoprefixerOptions = {
  browsers: [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'not ie < 9', // React doesn't support IE8 anyway
  ],
  flexbox: 'no-2009',
}
// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css'
// const cssClassName = isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]'
const cssClassName = isDev ? 'sem-dev' : 'sem'
// Heads up!
// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
  { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.NODE_ENV === 'production' && process.env.GENERATE_SOURCEMAP !== 'false'

const extractSass = new ExtractTextPlugin({
  filename: cssFilename
});
const extractLess = new ExtractTextPlugin({
  filename: cssFilename,
});

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  module: {
    strictExportPresence: true,
    // TODO: Disable require.ensure as it's not a standard language feature.
    // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
    // { parser: { requireEnsure: false } },
    rules: [
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          compact: process.env.NODE_ENV === 'production',
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: isDev,
        },
      },

      // Heads up!
      // We apply CSS modules only to our components, this allow to use them
      // and don't break SUI.
      {
        // test:/\.(s*)css$/,
        test:/\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:[
            'css-loader',
            'sass-loader'],
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use: [
            "css-loader",
            "less-loader"],
        })
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 1024,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // "file" loader makes sure assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  plugins: [
    extractSass, extractLess
    /* new ExtractTextPlugin({filename:'app.bundle.css'}), */
  ],
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: [
      'node_modules',
      paths.appNodeModules,
      paths.appSrc,
    ].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: ['.js', '.json', '.jsx'],
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  }
}
