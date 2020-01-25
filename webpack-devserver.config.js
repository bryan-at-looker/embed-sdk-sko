var path = require('path')
var config = require ('./config')
const proxy = require('http-proxy-middleware');
var user = require('./demo/demo_user.json')
var { createSignedUrl, accessToken } = require('./server_utils/auth_utils')

var webpackConfig = {
  mode: 'development',
  entry: {
    demo: './demo/demo.ts'
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "demo")
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      config: path.join(__dirname, './config.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          compilerOptions: {
            declaration: false
          }
        }
      }
    ]
  },
  devServer: {
    clientLogLevel: 'debug',
    compress: true,
    contentBase: [
      path.join(__dirname, "demo")
    ],
    host: config.demo_host,
    port: config.demo_port,
    disableHostCheck: true,
    https: true,
    headers: {
      "Accept": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true
    },
    // proxy: {
    //   '/api': {
    //     logLevel: 'debug',
    //     target: process.env.LOOKERSDK_BASE_URL,
    //     changeOrigin: true,
    //     secure: false,
    //     "secure": false,
    //     "headers": {
    //       "Host": 'johnkuitheme.dev.looker.com',
    //       "Origin": null
    //     },
    //   }
    // },
    watchContentBase: true,
    before: (app) => {
      app.get('/auth', async function(req, res) {
        // Authenticate the request is from a valid user here
        const src = req.query.src;
        const url = await createSignedUrl(src, user, config.host);
        res.json({ url });
      });
      app.get('/token', async function(req, res) {
        const token = await accessToken(user.external_user_id);
        res.json( token );
      });
    }
  }
}

module.exports = webpackConfig
