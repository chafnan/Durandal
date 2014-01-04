path    = require 'path'
helpers = require('yeoman-generator').test


describe 'durandal generator', ->
  beforeEach (done) ->
    err = (err) ->
      return done(err) if err
      this.app = helpers.createGenerator 'durandal:app', [
        '../../app'
      ]
      done()

    helpers.testDirectory path.join(__dirname, 'temp'), err.bind(this)

  it 'creates expected files', (done) ->
    expected = [
      'package.json'

      #app
      'app/viewmodels/flickr.js'
      'app/viewmodels/shell.js'
      'app/viewmodels/welcome.js'
      'app/views/detail.html'
      'app/views/flickr.html'
      'app/views/shell.html'
      'app/views/welcome.html'
      'app/main.js'

      #css
      'css/ie10mobile.css'
      'css/starterkit.css'

      #lib
    ]

    helpers.mockPrompt @app,
      appName: 'Test Project'
      appVersion: '0.0.0'
      authorName: 'Test Author'
      authorEmail: 'test@durandaljs.com'
      authorWebsite: 'durandaljs.com'
      private: true

    this.app.options['skip-install'] = true

    this.app.run {}, ->
      helpers.assertFiles expected
      done()
