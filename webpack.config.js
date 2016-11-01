var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: {
    'signup': path.join(process.cwd(), 'src/signup'),
    'login': path.join(process.cwd(), 'src/login'),
    'waiting': path.join(process.cwd(), 'src/waiting'),
  },
  output: {
    path: './dest/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        // test: /.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: { 
    alias: {
        // AppConfig:  path.join(process.cwd(), 'app/config/app_conf'),
        // underscore :  path.join(process.cwd(), 'js/underscore')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
        // _ : 'underscore',
        // AppConfig: 'AppConfig'
    //     $: "jquery",
    //     jQuery: "jquery"
    })

  ]
}