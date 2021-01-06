module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "static/sfx/",
          outputPath: "static/sfx/",
          name: "[name].[ext]",
          esModule: false,
        },
      },
    });

    return config;
  },
};
