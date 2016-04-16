'use strict';

var config = require('../config');
var svgSprite   = require("gulp-svg-sprite");
var spritesmith = require('gulp.spritesmith');
var gulp   = require('gulp');

gulp.task('sprite', ["sprite-generate"], function()
{
	if(!argv.lang) argv.lang = config.lang;

	// return gulp.src(bin + "svg/_sprites-" + argv.lang + ".scss")
	// 	.pipe(gulp.dest(src + 'sass/partials'))
	// 	.pipe(fs.unlink(bin + "svg/_sprites-" + argv.lang + ".scss"));

	fs.rename(bin + "svg/_sprites-" + argv.lang + ".scss", config.src + 'sass/partials/_sprites-' + argv.lang + ".scss");
});