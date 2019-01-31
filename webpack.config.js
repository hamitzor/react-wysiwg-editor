const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


module.exports = function (env, argv) {
  var configObject = {
    output: {
      filename: 'bundle.[contenthash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }]
        },
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    },
    resolve: {
      alias: {
        '@material-ui/core': '@material-ui/core/es'
      }

    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'WYSIWYG Editor for React'
      })
    ],
    devServer: {
      open: true,
      compress: true,
      port: 4000,
      publicPath: '/',
      historyApiFallback: {
        index: '/index.html'
      }
    }
  }

  if (argv.mode === 'development') {
    configObject.devtool = 'cheap-module-source-map'
  }

  return configObject
}