'use strict';

var config      = require('../config');
var browserSync = require('browser-sync');
var gulp        = require('gulp');
var argv        = require('yargs').argv;

gulp.task('browserSync', function() {

	if(!argv.browsersync) argv.browsersync = config.task.browsersync.active;

	if(argv.browsersync === 'yes'){

		browserSync.init({
			// proxy: config.domain + ':' + config.serverport,
			// proxy: 'localhost:' + config.serverport
			proxy: config.domain,
			files: [
				config.task.browsersync.styleFile,
				config.task.browsersync.scriptFile
			],
			baseDir: "",
    		index: "/"
		});
	}

});