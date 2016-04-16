'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  runSequence(['copy', 'styles', 'images', 'fonts'/*, 'twig', 'browserify'*/], 'watch', cb);

});
