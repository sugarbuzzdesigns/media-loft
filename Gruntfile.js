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
		concat_css: {
		    options: {
		        // Task-specific options go here. 
		    },
		    all: {
		      	src: ['assets/css/css-dependencies.css', 'assets/css/breakpoints.css', 'assets/css/tiles.css', 'assets/css/timeline.css', 'assets/css/animate.css'], 
		    	dest: 'assets/css/style.css'
		    }
		},		
		concat: {
			vendor: {
				src: ['assets/js/vendor/jquery-ui.js','assets/js/vendor/*.js'],
				dest: 'assets/js/vendor/vendor.min.js'
			},
			options: {
				'separator': ';\n',
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
			files: ['assets/scss/**/*.scss', 'assets/js/**/*.js'], 
			tasks: ['dev']
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
				src: ['assets/css/style.css'], 
				dest: 'assets/css/style.min.css'
			},
			options: {
				'banner': null,
				'keepSpecialComments': '*',
				'report': 'min'
			}
		},
		uglify: {
			task: {
				files: {
					'assets/js/libs/libs.min.js' : 'assets/js/libs/libraries.js',
					'assets/js/ml.min.js' : 'assets/js/ml.js',
					'assets/js/modules/work.min.js' : 'assets/js/modules/work.js'
				}
			},
			options: {
				'mangle': false,
				'compress': { unused: false },
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
				files: {
					'assets/css/style.css': 'assets/css/style.css',
					'assets/css/timeline.css': 'assets/css/timeline.css'
				}

				// ['assets/css/style.css'], 
				// dest: 'assets/css/style.css'
			},
			options: {
				'browsers': ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 11', 'ie 10'],
				'cascade': true,
				'diff': false,
				'map': false,
				'silent': false
			}
		},
		sass: {
			dev: {                            // Target
				options: {                       // Target options
					style: 'expanded'
				},
				files: {                         // Dictionary of files
					'assets/css/breakpoints.css': 'assets/scss/breakpoints.scss',
					'assets/css/timeline.css': 'assets/scss/timeline.scss'
				}
			},		
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded'
				},
				files: {                         // Dictionary of files
					'assets/css/breakpoints.css': 'assets/scss/breakpoints.scss',
					'assets/css/timeline.css': 'assets/scss/timeline.scss',
					'assets/css/css-dependencies.css': 'assets/scss/partials/css-dependencies.scss'       // 'destination': 'source'
				}
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
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-compass');	

	grunt.registerTask('build', ['sass:dist', 'concat_css', 'concat', 'autoprefixer', 'cssmin', 'uglify']);
};