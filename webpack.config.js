const path = require("path");
var MiniCSS = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./js/main.js", "./scss/index.scss"],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  },
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCSS.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new MiniCSS({
      filename: "app.css"
    })
  ]
};
