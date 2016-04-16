'use strict';

var config = require('../config');
var gulp   = require('gulp');
var twig   = require('gulp-twig');
var argv   = require('yargs').argv;
var yaml   = require('js-yaml');
var fs     = require('fs');
var gutil  = require('gulp-util');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

// Twig task
gulp.task('twig', function ()
{
	if(!argv.lang) argv.lang = config.lang;

	// LANG
	var yamlLang = yaml.safeLoad( fs.readFileSync(config.src + 'yaml/langs/lang-' + argv.lang + '.yml', 'utf8') );
	//gutil.log(yamlLang);
	yamlLang = JSON.parse(JSON.stringify(yamlLang));


	// __ CUSTOM —————————————————————————————————————————————


	// __ END CUSTOM —————————————————————————————————————————

	return gulp.src(config.task.twig.src)
		.pipe(twig({
			data: {
				locale: argv.lang,
				lang: yamlLang,
				version: '1',
				species: species
			}
		}))
        .pipe(gulpif(!global.isProd, replace('%base_url%', '/')))
		.pipe(gulp.dest(config.task.twig.dest))
		.on('end', function() {gutil.log(gutil.colors.green("Twig compiled"));});
});
