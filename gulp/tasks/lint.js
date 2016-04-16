'use strict';

var config = require('../config');
var gulp   = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src(config.task.scripts.src)
    //.pipe(jshint({unused:'vars'}))
    .pipe(jshint.reporter('jshint-stylish'));
});