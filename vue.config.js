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
        // Rules order has significance: from more precise to less
        // /schedule-service/V1/schedule/occasion/{courseOccasionId}
        /*        "/api/schedules": {
          target: "http://localhost:8282", // nodemocks
          //pathRewrite: { "^/api/schedules": "/api/schedules" },  //eslint-disable-line
          logLevel: "debug"
        },*/
        "/api/events": {
          target: "http://localhost:8086", // app-middleware
          pathRewrite: { "^/api/events": "/app/V1/schedules" },  //eslint-disable-line
          logLevel: "debug"
        },

        "/api/resources": {
          target: "http://localhost:8086", // app-middleware
          pathRewrite: { "^/api/resources": "/app/V1/bookings/resources" },  //eslint-disable-line
          logLevel: "debug"
        },
        "/api/rooms": {
          target: "http://localhost:8086", // app-middleware
          pathRewrite: { "^/api/rooms": "/app/V1/bookings/rooms" },  //eslint-disable-line
          logLevel: "debug"
        },
        // /app/V1/schedules/{courseOccasionId}
        "/api/schedules": {
          target: "http://localhost:8086", // app-middleware
          pathRewrite: { "^/api/schedules": "/app/V1/schedules" },  //eslint-disable-line
          logLevel: "debug"
        },
        // /schedule-service/V1/schedule/occasion/{courseOccasionId}
        /*        "/api/schedule/occasion": {
          target: "http://localhost:8085", // schedule-service
          pathRewrite: { "^/api/schedule/occasion": "/schedule-service/V1/schedule/occasion" },  //eslint-disable-line
          logLevel: "debug"
        },*/

        "/api/occasions": {
          target: "http://localhost:8086", // app-middleware
          pathRewrite: { "^/api/occasions": "/app/V1/courses/occasions" },  //eslint-disable-line
          logLevel: "debug"
        },
        "/api/courses": {
          target: "http://localhost:8086", // app-middleware
          pathRewrite: { "^/api/courses": "/app/V1/courses" },  //eslint-disable-line
          logLevel: "debug"
        },

        /* === OLD === */
        "/api/examination": {
          target: "http://localhost:8086", // app-middleware
          pathRewrite: { "^/api/examination": "/app/V1/examination" },  //eslint-disable-line
          logLevel: "debug"
        },
        "/api": {
          target: "http://localhost:8282", // nodemocks
          pathRewrite: { "^/api": "" },  //eslint-disable-line
          logLevel: "debug"
        }
        /*        "/appmw": {
          target: "http://localhost:8086", // app-middleware
          pathRewrite: { "^/appmw": "/app/V1" },  //eslint-disable-line
          logLevel: "debug"
          //changeOrigin: true,
          //secure: false, // will ignore the https
        }*/
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
