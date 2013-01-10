﻿require.config({
    paths: {
        "text": "vendor/text"
    }
});

define(function(require) {
    var app = require('durandal/app'),
        system = require('durandal/system');

    system.debug(true);

    app.start().then(function() {
        app.adaptToDevice();
        app.setRoot('samples/widgets/shell');
    });
});