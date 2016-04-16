'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var argv    = require('yargs').argv;
var glob    = require("glob");
var fsextra = require('fs-extra');
var fs      = require('fs');
var del     = require('del');
var zip     = require('gulp-zip');

function listPages()
{
	var files = glob.sync(config.task.deploy.src, {ignore: config.task.deploy.ignore});

	if(!files.length) return console.log('Nothing to deploy');

	files.forEach(function(file)
	{
		var page = file.replace(config.www, '').replace('.html', '');
		createFolders(page)
	});
}

function createFolders(page)
{
	var distPagePath = config.dist + page + '-' + argv.lang;
	fsextra.copy(config.www, distPagePath, function (error)
	{
		if (error) return console.error(error);

		var files = glob.sync(distPagePath + '/*.html', {ignore: distPagePath + '/' + page + '.html'});

		if(!files.length) return console.log('Nothing to deploy');

		cleanFolders(files);

		renamePageToIndex(distPagePath, page);
	});
}

function cleanFolders(files)
{
	files.forEach(function(file)
	{
		fs.unlinkSync(file);
	});
}

function renamePageToIndex(distPagePath, page)
{
	var oldPath = distPagePath + '/' + page + '.html';
	var newPath = distPagePath + '/index.html';

	fs.renameSync(oldPath , newPath);

	makeArchives(distPagePath, page);
}

function makeArchives(distPagePath, page)
{
	gulp.src(distPagePath + '/**/*')
        .pipe(zip(page + '-' + argv.lang + '.zip'))
        .pipe(gulp.dest(config.dist))
        .on('end', function () {
            del(distPagePath);
        });

	gutil.log(gutil.colors.green( 'Created : ' + page + '-' + argv.lang ));
}

gulp.task('deploy', ['prod'], function() {

	if(!argv.lang) argv.lang = config.lang;

	del.sync(config.dist);

	listPages();
});
