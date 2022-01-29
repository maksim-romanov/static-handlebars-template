const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HandlebarsWebpackPlugin = require('handlebars-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    ]
  },
  resolve: { alias: { handlebars: 'handlebars/dist/handlebars.min.js' } },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Generic Head Title',
      // the template you want to use
      template: path.join(__dirname, 'src', 'generatedpartial', 'head.hbs'),
      // the output file name
      filename: path.join(__dirname, 'dist', 'partials', 'head.hbs'),
      inject: 'head'
    }),

    new HandlebarsWebpackPlugin({
      htmlWebpackPlugin: {
        enabled: true, // register all partials from html-webpack-plugin, defaults to `false`
        prefix: 'html', // where to look for htmlWebpackPlugin output. default is "html"
        HtmlWebpackPlugin // optionally: pass in HtmlWebpackPlugin if it cannot be resolved
      },

      entry: path.join(process.cwd(), 'src', 'pages', '*.hbs'),
      output: path.join(process.cwd(), 'dist', '[name].html'),

      partials: [
        path.join(process.cwd(), 'html', /* <-- this should match htmlWebpackPlugin.prefix */ '*', '*.hbs'),
        path.join(process.cwd(), 'src', 'partials', '**', '*.hbs')
      ]
    }),
    // new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon'),
          to: path.resolve(__dirname, 'dist/assets/favicon')
        }
      ]
    })
  ]
};
