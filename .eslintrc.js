module.exports = {
  extends: "react-app",
  settings: {
    "import/resolver": {
      webpack: {
        config: "webpack.config.js"
      },
      node: {
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  },
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": 1,
    "react-hooks/exhaustive-deps": 1
  }
};
