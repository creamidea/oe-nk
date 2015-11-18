// http://jslog.com/2014/10/02/react-with-webpack-part-1/
module.exports = {
  entry: './web/app.jsx',
  output: {
    filename: './public/bundle.js', //this is the default name, so you can skip it
    //at this directory our bundle file will be available
    //make sure port 8090 is used when launching webp ack-dev-server
    // publicPath: 'http://localhost:8090/assets'
    publicPath: '/'
  },
  module: {
    loaders: [{
      //tell webpack to use jsx-loader for all *.jsx files
      test: /\.jsx$/,
      // loader: 'jsx-loader'
      loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    ace: "/bower_components/ace/lib/ace",
  }
}
