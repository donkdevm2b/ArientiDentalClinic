const webpack = require('webpack')
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: [
    './src/index.js'
  ],
  // externals: [
  //   'jQuery',
  //   'foundation-sites'
  // ],
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader']
      // },
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
          // {
          //   loader: 'sass-loader',
          //   query: {
          //     includePaths: [
          //       path.resolve(__dirname, './node_modules/foundation-sites/scss')
          //     ]
          //   }
          // }
        ]
      }
      // {
      //   test: /\.(png|gif|jpg)$/,
      //   include: [
      //     path.join(__dirname, './src/assets/img')
      //   ],
      //   use: 'file-loader'
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: [
      //     'file-loader'
      //   ]
      // }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: './src',
    // contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true,
    port: 3000
    // host: '172.31.99.66'
  }
}
