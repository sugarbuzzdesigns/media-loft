module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'force': false,
				'no-write': false
			}
		},
		concat: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'separator': grunt.util.linefeed,
				'banner': '',
				'footer': '',
				'stripBanners': false,
				'process': false,
				'sourceMap': false,
				'sourceMapName': undefined,
				'sourceMapStyle': 'embed'
			}
		},
		watch: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'spawn': true,
				'interrupt': false,
				'debounceDelay': 500,
				'interval': 100,
				'event': 'all',
				'reload': false,
				'forever': true,
				'dateFormat': null,
				'atBegin': false,
				'livereload': false,
				'cwd': process.cwd(),
				'livereloadOnError': true
			}
		},
		jshint: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'globals': null,
				'jshintrc': null,
				'extensions': '',
				'ignores': null,
				'force': false,
				'reporter': null,
				'reporterOutput': null
			}
		},
		cssmin: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'banner': null,
				'keepSpecialComments': '*',
				'report': 'min'
			}
		},
		uglify: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'mangle': {},
				'compress': {},
				'beautify': false,
				'expression': false,
				'report': 'min',
				'sourceMap': false,
				'sourceMapName': undefined,
				'sourceMapIn': undefined,
				'sourceMapIncludeSources': false,
				'enclose': undefined,
				'wrap': undefined,
				'exportAll': false,
				'preserveComments': undefined,
				'banner': '',
				'footer': ''
			}
		},
		autoprefixer: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'browsers': ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
				'cascade': true,
				'diff': false,
				'map': false,
				'silent': false
			}
		},
		sass: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'sourcemap': 'auto',
				'trace': false,
				'unixNewlines': false,
				'check': false,
				'style': 'nested',
				'precision': 3,
				'quiet': false,
				'compass': false,
				'debugInfo': false,
				'lineNumbers': false,
				'loadPath': [],
				'require': [],
				'cacheLocation': '.sass-cache',
				'noCache': false,
				'bundleExec': false,
				'banner': '',
				'update': false
			}
		},
		compass: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'gigantocluster-of-options-see-them-here': 'https'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('default', ['clean', 'concat', 'watch', 'jshint', 'cssmin', 'uglify', 'autoprefixer', 'sass', 'compass']);
};