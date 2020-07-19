

require('./check-versions')()

//"start": "webpack-dev-server --inline --color --progress --config --hot webpackConfig/webpack.dev.config.js",
const path = require('path')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server');
const utils = require('../webpackConfig/utils')
const config = require('../webpackConfig/index')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const HOST = process.env.HOST || config.dev.host;
const PORT = Number(process.env.PORT) || config.dev.port

 // var opn = require('opn')
const ora = require('ora')
// const fs = require('fs');
// const chalk = require('react-dev-utils/chalk')
// const clearConsole = require('react-dev-utils/clearConsole');
// const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
// const { choosePort, createCompiler, prepareProxy, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
// const openBrowser = require('react-dev-utils/openBrowser');
const devWebpackConfig = require('../webpackConfig/webpack.dev.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// Add FriendlyErrorsPlugin
devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
  compilationSuccessInfo: {
    messages: [`Your application is running here: http://${HOST}:${PORT}`],
  },
  onErrors: config.dev.notifyOnErrors
    ? utils.createNotifierCallback()
    : undefined
}))

const compiler = Webpack(devWebpackConfig);
const devServerConfig = Object.assign({}, devWebpackConfig.devServer, {
  // open: true,
  // hot: true,
  // lazy: true,
  inline: true,
  // config:
  progress: true,
  stats: {
    // timings: true,
    // version: true,
    // warnings: true,
    colors: true,
    entrypoints: false,
    // children: false
  },
});

const devServer = new WebpackDevServer(compiler, devServerConfig);
const portfinder = require('portfinder')

// const readyPromise = () => {
//   return new Promise((resolve, reject) => {
//     portfinder.basePort = process.env.PORT || config.dev.port
//     portfinder.getPort((err, port) => {
//       if (err) {
//         reject(err)
//       } else {
//         // publish the new Port, necessary for e2e tests
//         process.env.PORT = port
//         // add port to devServer config
//         devWebpackConfig.devServer.port = port

 //         // Add FriendlyErrorsPlugin
//         devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//           compilationSuccessInfo: {
//             messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
//           },
//           onErrors: config.dev.notifyOnErrors
//             ? utils.createNotifierCallback()
//             : undefined
//         }))

 //         resolve(devWebpackConfig)
//       }
//     })
//   })
// }

 // const isInteractive = process.stdout.isTTY;
const spinner = ora('starting for development...')
spinner.start()
// Launch WebpackDevServer.
devServer.listen(PORT, HOST, err => {
    if (err) {
      return console.log(err);
    }
  
    console.log("devWebpackConfig:", devWebpackConfig);
    spinner.stop()
    // if (err) throw err
    // if (isInteractive) {
    //   clearConsole();
    // }

     // We used to support resolving modules according to `NODE_PATH`.
    // This lets you use absolute paths in imports inside large monorepos:
    // if (process.env.NODE_PATH) {
    //   console.log(
    //     chalk.yellow(
    //       'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
    //     )
    //   );
    //   console.log();
    // }
    // publish the new Port, necessary for e2e tests

     // console.log(chalk.cyan('Starting the development server...\n'));
    // openBrowser(urls.localUrlForBrowser);

     // readyPromise()
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});