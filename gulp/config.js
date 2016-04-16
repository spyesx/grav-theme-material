'use strict';

var theme = 'dist';

module.exports = {

	'lang'        : 'en',
	'domain'      : 'spyesx.dev',
	'title'       : "grav-theme-material",
	'src'         : 'src/',
	'www'         : theme+'/',
	'dist'        : 'dist/',
	'serverport'  : 3000,

	'task' : {

		'browserify': {
			'entries'   : ['./src/js/Main.js'],
			'bundleName': 'scripts.js',
			'sourcemap' : true
		},

		'browsersync': {
			'active'   : 'yes'
		},

		'clean': {
			'dev' : [theme+'/css', theme+'/library/js']
		},

		'copy': {
			'src': [],
			'dest': theme+'',
		},

		'deploy': {
			'src': 'www/*.html',
			'ignore': ['www/index.html']
		},

		'dist': {
			'root'  : 'www'
		},

		'fonts': {
			'src' : ['src/fonts/**/*'],
			'dest': theme+'/fonts'
		},

		'gzip': {
			'src': 'www/**/*.{html,xml,json,css,js,js.map}',
			'dest': theme+'/',
			'options': {}
		},

		'images': {
			'src' : 'src/img/**/*',
			'dest': theme+'/images/'
		},

		'langs': {
			'watch' : 'src/yaml/langs/**/*',
		},

		'styles': {
			'watch' : ['src/sass/**/*.scss'],
			'src' : [/*'../../node_modules/foundation-sites/scss/', */'src/sass/style'],
			'dest': theme+'/css'
		},

		'scripts': {
			'src' : ['src/js/**/*.js', '!src/js/lib/**/*'],
			'dest': theme+'/js'
		},

		'test': {
			'karma': 'test/karma.conf.js',
			'protractor': 'test/protractor.conf.js'
		},

		'twig': {
			'src': [
				'src/twig/**/*.twig',
				'!src/twig/components/**/*',
				'!src/twig/layouts/**/*',
				'!src/twig/partials/**/*',
				'!src/twig/**/_*',
			],
			'srcOptions': {
					'ignore': [
						'src/twig/components',
						'src/twig/layouts',
						'src/twig/partials',
					]
			},
			'dest' : 'www',
			'watch' : ['src/twig/**/*.twig' ]
		},
	}
};
