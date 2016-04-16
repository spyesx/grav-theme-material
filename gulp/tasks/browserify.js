'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var buffer       = require('vinyl-buffer');
var streamify    = require('gulp-streamify');
var watchify     = require('watchify');
var browserify   = require('browserify');
var babelify     = require('babelify');
var uglify       = require('gulp-uglify');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var debowerify   = require('debowerify');
var browserifyShim = require('browserify-shim');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {


  var bundler = browserify({
    entries      : config.task.browserify.entries,
    cache        : {},
    packageCache : {},
    fullPaths    : false,
    paths        : [config.src + 'js/'],
    debug        : true,
  }, watchify.args);




  if ( !global.isProd ) {
    bundler = watchify(bundler);
    bundler.on('update', function(){
      rebundle();
    });
  }

  var transforms = [
    // babelify,
    debowerify,
    browserifyShim,
    'brfs',
    'bulkify'
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform);
  });

  function rebundle() {
    var stream = bundler.bundle();
    var createSourcemap = global.isProd && config.task.browserify.sourcemap;

    gutil.log('Rebundle...');

    return stream.on('error', function(e) {gutil.log(gutil.colors.red('Browserify Error ' + e));})
      .pipe(source(file))
      .pipe(gulpif(createSourcemap, buffer()))
      .pipe(gulpif(createSourcemap, sourcemaps.init()))
      .pipe(gulpif(global.isProd, streamify(uglify({
        compress: { drop_console: true }
      }))))
      .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
      .pipe(gulp.dest(config.task.scripts.dest))
      .on('end', function() {gutil.log(gutil.colors.green("Rebundle... OK"));})
      .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
  }

  return rebundle();

}

gulp.task('browserify', function() {

  return buildScript(config.task.browserify.bundleName);

});
