'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var browserSync = require('browser-sync');

gulp.task('fonts', function() {

  return gulp.src(config.task.fonts.src)
    .pipe(changed(config.task.fonts.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.task.fonts.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));

});
