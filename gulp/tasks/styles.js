'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var argv         = require('yargs').argv;
var rename       = require("gulp-rename");
var gutil        = require('gulp-util');
var gulpif       = require('gulp-if');
var replace      = require('gulp-replace');
var sourcemaps   = require('gulp-sourcemaps');

gulp.task('styles', function () {

  if(!argv.lang) argv.lang = config.lang;

  var src = config.task.styles.src + '-' + argv.lang + '.scss';

  return gulp.src(src)
    //.pipe( gulpif( !global.isProd, sourcemaps.init() ) )
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      data:'file',
      includePaths: [].concat(['node_modules/foundation-sites/scss']),
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }).on('error', sass.logError))
    //.pipe( gulpif( !global.isProd, sourcemaps.write() ) )
    .on('error', function(e) {gutil.log(gutil.colors.red('SASS Error ' + e));})
    .pipe(autoprefixer({
        browsers: ["last 3 versions", "> 1%", "ie 8"],
        cascade: false
      }))
    .on('error', function(e) {gutil.log(gutil.colors.red('AutoPrefixer Error ' + e));})
    .pipe(rename(function(path){
        path.basename = path.basename.replace('-' + argv.lang, '');
      }))
    .pipe(gulpif(!global.isProd, replace('%base_url%', '/')))
    .pipe(gulp.dest(config.task.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));


});
