// This will be read by vue-cli-service
// which if you are running using 'npm serve', that calls the script
// `vue-cli-service`. Test if the configurations you make here are actually
// finding their way into the full config for Vue using 'vue inspect | grep mySetting'.
//

module.exports = {
  //domain: "asf",
  //baseUrl: process.env.NODE_ENV === "production" ? "/subpath/" : "/",
  configureWebpack: {
    // devtool: 'source-map', // should help with generating source maps
    devtool: "inline-source-map",
    devServer: {
      port: 9997,
      proxy: {
        // Rules order is important.
        "/api/occasions": {
          //changeOrigin: true,
          target: "http://localhost:8082", // course-service
          //secure: false, // will ignore the https
          pathRewrite: { "^/api/occasions": "/course-service/V1/occasions" },  //eslint-disable-line
          logLevel: "debug"
        },
        // Rules order is important.
        "/api/courses": {
          //changeOrigin: true,
          target: "http://localhost:8082", // course-service
          //secure: false, // will ignore the https
          pathRewrite: { "^/api/courses": "/course-service/V1/courses" },  //eslint-disable-line
          logLevel: "debug"
        },
        "/api/examination": {
          //changeOrigin: true,
          target: "http://localhost:8085", // app-middleware
          //secure: false, // will ignore the https
          pathRewrite: { "^/api/examination": "/app/V1/examination" },  //eslint-disable-line
          logLevel: "debug"
        },
        "/api": {
          //changeOrigin: true,
          target: "http://localhost:8282", // nodemocks
          //secure: false, // will ignore the https
          // rewrite /api to ""
          pathRewrite: { "^/api": "" },  //eslint-disable-line
          logLevel: "debug"
        },
        "/appmw": {
          //changeOrigin: true,
          target: "http://localhost:8085", // app-middleware
          pathRewrite: { "^/appmw": "/app/V1" },  //eslint-disable-line
          logLevel: "debug"
        }
      }
    }
    /*chainWebpack: config => {
      const oneOfsMap = config.module.rule("scss").oneOfs.store;
      oneOfsMap.forEach(item => {
        item
          .use("sass-resources-loader")
          .loader("sass-resources-loader")
          .options({
            resources: [
              "./assets/scss/vars.scss",
              "./assets/scss/mixins.scss",
              "./assets/scss/functions.scss"
            ]
          })
          .end();
      });
    }*/
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
