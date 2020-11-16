// This will be read by vue-cli-service
// which if you are running using 'npm serve', that calls the script
// `vue-cli-service`. Test if the configurations you make here are actually
// finding their way into the full config for Vue using 'vue inspect | grep mySetting'.
//

module.exports = {
  //domain: "asf",
  //baseUrl: process.env.NODE_ENV === "production" ? "/subpath/" : "/",
  configureWebpack: {
    devServer: {
      ///port: 9999,
      proxy: {
        "/api:": {
          //changeOrigin: true,
          target: "http://localhost:8282",
          //secure: false, // will ignore the https
          // rewrite /api as just ""
          pathRewrite: { "^/api": "" },
          logLevel: "debug"
        }
      }
    },
    /*module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["vue-style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          loader: "url-loader",
          options: {
            limit: 8192
          }
        }
      ]
    }*/
  }
};
