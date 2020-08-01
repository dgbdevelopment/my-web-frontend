const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/js/app.js"],
  },
  output: {
    path: __dirname + "/public",
    filename: "js/script-min.js?" + new Date().getTime(),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/views/pages/index.pug",
    }),
    new HtmlWebpackPlugin({
      filename: "blog.html",
      template: "./src/views/pages/blog.pug",
    }),
    new MiniCssExtractPlugin({
      filename: "css/styles.css?" + new Date().getTime(),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader?pretty=true"],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/img/",
              useRelativePath: true,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: true,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 5000,
  },
};
