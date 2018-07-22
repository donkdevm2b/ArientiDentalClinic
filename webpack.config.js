const webpack = require('webpack')
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    // 'script-loader!slick-carousel/slick/slick.min.js',
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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
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
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: './public',
    watchContentBase: true,
    hot: true,
    port: 8082
    // contentBase: path.join(__dirname, 'src'),
    // host: '172.31.99.66'
  }
}
