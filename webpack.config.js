const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  mode: 'development',
  devServer: {
    port: 9000,
    hot: false
  },
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/images/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: 'asset/resource'
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader']
      }
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      //   options: {
      //     sources: {
      //       list: [
      //         {
      //           tag: 'img',
      //           attribute: 'data-src',
      //           type: 'src'
      //         },
      //         {
      //           tag: 'img',
      //           attribute: 'data-srcset',
      //           type: 'srcset'
      //         }
      //       ]
      //     }
      //   }
      // }
    ]
  },
  resolve: { alias: { handlebars: 'handlebars/dist/handlebars.min.js' } },
  plugins: [
    new CleanWebpackPlugin(),
    // new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyWebpackPlugin(
      {
        patterns: [
          // {
          //   from: 'assets',
          //   to: 'assets'
          // },
          {
            from: path.resolve(__dirname, 'src/favicon'),
            to: path.resolve(__dirname, 'dist/assets/favicon')
          }
        ]
      }
    )
  ]
};