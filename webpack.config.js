var path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "index.js",
    library: "incorta-items-list",
    libraryTarget: "umd",
    publicPath: "/dist/",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true,
              paths: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "node_modules")
              ]
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      } /*
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }*/
    ]
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom")
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    },
    antd: {
      commonjs: "antd",
      commonjs2: "antd",
      amd: "antd",
      root: "antd"
    },
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "lodash"
    },
    classnames: {
      commonjs: "classnames",
      commonjs2: "classnames",
      amd: "classnames",
      root: "classnames"
    }
  }
};
