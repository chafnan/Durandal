util = require 'util'
path = require 'path'
yeoman = require 'yeoman-generator'


DurandalGenerator = module.exports = class

  constructor: (args, options, config) ->
    yeoman.generators.Base.apply(@, arguments);

    @on 'end', ->
      @installDependencies { skipInstall: options['skip-install'] }

    @pkg = JSON.parse @readFileAsString path.join(__dirname, '../package.json')

  util.inherits @, yeoman.generators.Base

  askFor: ->
    cb = @async()

    console.log @yeoman

    prompts = [
      { name: 'appName', message: 'What would you like to name your app?' }
      { name: 'appVersion', message: 'What is your app version?', 'default': '0.0.0' }
      { name: 'authorName', message: "What is the author's name?" }
      { name: 'authorEmail', message: "What is the author's email?"}
      { name: 'authorWebsite', message: "What is the author's website?" }
      { name: 'private', message: 'Is this app private?', 'default': true}
    ]

    prop = (props) ->
      @appName = props.appName
      @appVersion = props.appVersion

      @author = props.authorName
      @author = "#{@author} <#{props.authorEmail}>" if props.authorEmail
      @author = "#{@author} (#{props.authorWebsite})" if props.authorWebsite

      @private = props.private
      cb()

    @prompt prompts, prop.bind(@)

  projectfiles: ->
    @copy '_package.json', 'package.json'
    @directory 'starter', '.'