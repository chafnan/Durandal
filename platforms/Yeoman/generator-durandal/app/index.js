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
  this.env.options.publicPath = this.options['public-path'] || 'public'

  this.option('app-path', { type: String, required: false, defaults: 'app' });
  this.env.options.appPath = path.join(this.env.options.publicPath, (this.options['app-path'] || 'app'));

  this.option('css-path', { type: String, required: false, defaults: 'css' });
  this.env.options.cssPath = path.join(this.env.options.publicPath, (this.options['css-path'] || 'css'));

  this.env.options.starterKitPath = '../starterkit';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.config.defaults({
    appName: this.appName
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
  }];

  this.prompt(prompts, function (props) {
    for(var key in props) {
      this[key] = props[key];
    }
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
  var publicPath = this.env.options.publicPath;
  var starterKitPath = this.env.options.starterKitPath;
  this.directory(starterKitPath + '/app', this.env.options.appPath);

  this.copy(starterKitPath + '/index.html', publicPath + '/index.html');
  this.copy(starterKitPath + '/weyland-config.js', publicPath + '/weyland-config.js');
};

DurandalGenerator.prototype.css = function css() {
  this.directory(this.env.options.starterKitPath + '/css', this.env.options.cssPath);
}

DurandalGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
