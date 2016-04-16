'use strict';

var config        = require('../config');
var gulp          = require('gulp');

gulp.task('watch', ['browserSync', 'server'], function() {

  // Scripts are automatically watched and rebundled by Watchify inside Browserify task
  gulp.watch(config.task.scripts.src, ['lint']);
  gulp.watch(config.task.styles.watch,  ['styles']);
  gulp.watch(config.task.images.src,  ['images']);
  gulp.watch(config.task.fonts.src,   ['fonts']);
  gulp.watch(config.task.twig.watch, ['twig']);
  gulp.watch(config.task.langs.watch, ['twig']);

});
