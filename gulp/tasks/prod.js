'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
global.isProd = true;
gulp.task('prod', ['clean', 'styles', 'images', 'fonts', 'browserify'], function(cb) {

  cb = cb || function() {};

  global.isProd = true;

  cb();

 // runSequence(['styles', 'images', 'fonts', 'twig', 'browserify'], null, cb);

});
