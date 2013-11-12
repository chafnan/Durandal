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
      '.jshintrc',
      '.editorconfig'
    ]

    helpers.mockPrompt @app,
      appName: 'Test Project'
      appVersion: '0.0.0'
      authorName: 'Test Author'
      authorEmail: 'test@durandaljs.com'
      authorWebsite: 'durandaljs.com'

    this.app.options['skip-install'] = true

    this.app.run {}, ->
      helpers.assertFiles expected
      done()
