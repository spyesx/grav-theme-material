'use strict';

var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');

gulp.task('clean', function(cb) {

  del.sync(config.task.clean.dev);

  cb();

});
