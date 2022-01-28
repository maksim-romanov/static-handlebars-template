const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  mode: 'development',
  devServer: {
    port: 9000,
    hot: false,
  },
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: 'asset/resource',
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },
  resolve: { alias: { handlebars: 'handlebars/dist/handlebars.min.js' } },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon'),
          to: path.resolve(__dirname, 'dist/assets/favicon'),
        },
      ],
    }),
  ],
};
