// Set the `ENV` global variable to be used in the app.
var path = require('path');
var webpack = require('webpack');

var projectRootDir = process.env.IONIC_ROOT_DIR;
var appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR;

// appScriptsDir > ...\node_modules\@ionic\app-scripts
var config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));

var env = process.env.IONIC_ENV || 'dev';
var envVars = require(path.join(projectRootDir, 'environment', env + '.json'));

config.dev.plugins.push(
  new webpack.DefinePlugin({
    'ENV': JSON.stringify(env),
    'SETTINGS': JSON.stringify(envVars),
  })
);
config.prod.plugins.push(
  new webpack.DefinePlugin({
    'ENV': JSON.stringify(env),
    'SETTINGS': JSON.stringify(envVars),
  })
);


module.exports = {
  dev: config.dev,
  prod: config.prod
}
