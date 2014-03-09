'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DurandalGenerator = module.exports = function DurandalGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appName = this.appname || path.basename(process.cwd());

  this.option('public-path', {
    type: String,
    required: false,
    defaults: 'public',
    description: 'This folder is the public folder for the web server'
  });
  this.publicPath = this.options['public-path'] || 'public'

  this.option('app-path', { type: String, required: false, defaults: 'app' });
  this.appPath = path.join(this.publicPath, (this.options['app-path'] || 'app'));

  this.option('css-path', { type: String, required: false, defaults: 'css' });
  this.cssPath = path.join(this.publicPath, (this.options['css-path'] || 'css'));

  this.starterKitPath = '../starterkit';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.config.defaults({
    appName: this.appName,
    express: this.options.express
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DurandalGenerator, yeoman.generators.Base);

DurandalGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'Would you to name your project?',
    default: this.appName
  },{
    name: 'express',
    message: 'Would you like an express server?',
    default: this.options.express || false
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.options.express = props.express;
    cb();
  }.bind(this));
};

DurandalGenerator.prototype.git = function git() {

}

DurandalGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc')
  this.copy('_bower.json', 'bower.json');
}

DurandalGenerator.prototype.packageJSON = function packageJSON() {
  this.copy('_package.json', 'package.json');
}

DurandalGenerator.prototype.app = function app() {
  var publicPath = this.publicPath;
  var starterKitPath = this.starterKitPath;
  this.directory(starterKitPath + '/app', this.appPath);

  this.copy(starterKitPath + '/index.html', publicPath + '/index.html');
  this.copy(starterKitPath + '/weyland-config.js', publicPath + '/weyland-config.js');
};

DurandalGenerator.prototype.css = function css() {
  this.directory(this.starterKitPath + '/css', this.cssPath);
}

DurandalGenerator.prototype.express = function express() {
  if (!this.options.express) return;
  this.mkdir('routes');

  this.copy('../express/routes/index.js', 'routes/index.js')
  this.copy('../express/app.js', 'app.js')
}

DurandalGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
