const webpack = require('webpack')
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    './src/index.js'
  ],
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, './src/style'),
      path.resolve(__dirname, './src/style/components')
    ],  
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(?:sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: './public',
    watchContentBase: true,
    hot: true,
    port: 3000
    // contentBase: path.join(__dirname, 'src'),
    // host: '172.31.99.66'
  }
}
