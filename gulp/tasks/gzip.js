'use strict';

var gulp   = require('gulp');
var gzip   = require('gulp-gzip');
var config = require('../config');

gulp.task('gzip', function() {

  return gulp.src(config.task.gzip.src)
    .pipe(gzip(config.task.gzip.options))
    .pipe(gulp.dest(config.task.gzip.dest));

});
