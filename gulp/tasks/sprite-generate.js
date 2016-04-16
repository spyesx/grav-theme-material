'use strict';

var config = require('../config');
var svgSprite   = require("gulp-svg-sprite");
var spritesmith = require('gulp.spritesmith');
var gulp   = require('gulp');

gulp.task('sprite-generate', function()
{
	if(!argv.lang) argv.lang = config.lang;

	return gulp.src(config.src + 'svg/' + argv.lang + '/**/*.svg')
		.pipe(svgSprite({
			// log: 'verbose',
			shape: {
				spacing: {
					padding: 2
				}
			},
			mode: {
				css: {
					dest: "./",
					dimensions: true,
					bust: false,
					prefix: ".icon--",
					common: "icon",
					render: {
						scss: {
							// dest: '../../../../../' + src + 'sass/partials/_sprites-' + argv.lang + '.scss'
							dest: '_sprites-' + argv.lang + '.scss'
						},
					},
					sprite: "../svg/sprite-" + argv.lang + ".svg",
				},
				symbol: false
			}
		}))
		.pipe(gulp.dest(bin + "svg"));
});