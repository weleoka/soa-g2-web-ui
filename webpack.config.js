module.exports = {
  //...
  devServer: {
    proxy: {
      "/api:": {
        target: "https://localhost:8282",
        secure: false, // will ignore the https
        // rewrite /api as just ""
        pathRewrite: { "^/api": "" }
      }
    }
  }
};
