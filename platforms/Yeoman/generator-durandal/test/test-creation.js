/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('durandal generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('durandal:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.jshintrc',
      '.editorconfig',
      ['.bowerrc', /\.\/public\/lib/],
      ['bower.json', /"name": "test-project"/],
      ['package.json', /"name": "test-project"/],
      'public/app',
      'public/css',
      'public/index.html',
      'public/weyland-config.js'
    ];

    helpers.mockPrompt(this.app, {
      appName: 'Test Project',
      express: false
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates the expected files for express', function (done) {
    var expected = [
      ['package.json', /"express": "\^\d.\d.\d"/],
      'routes/index.js',
      'app.js'
    ];

    helpers.mockPrompt(this.app, {
      appName: 'Test Project',
      express: true
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
