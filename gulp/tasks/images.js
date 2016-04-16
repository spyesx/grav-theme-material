'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var imagemin    = require('gulp-imagemin');
var browserSync = require('browser-sync');

gulp.task('images', function() {

  return gulp.src(config.task.images.src)
    .pipe(changed(config.task.images.dest)) // Ignore unchanged files
    .pipe(gulpif(global.isProd, imagemin())) // Optimize
    .pipe(gulp.dest(config.task.images.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));

});
