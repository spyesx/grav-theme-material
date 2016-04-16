'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('copy', [], function(cb) {

  cb = cb || function() {};

return gulp.src(config.task.copy.src)
	.pipe(gulp.dest(config.task.copy.dest));

});
