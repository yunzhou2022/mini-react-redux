const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  mode: isProd ? "production" : "development",

  externals: {
    react: "React",
    redux: "Redux",
  },
  output: {
    filename: isProd ? "mini-react-redux.min.js" : "mini-react-redux.js",
    library: "MiniReactRedux",
    libraryTarget: "umd",
  },
};
