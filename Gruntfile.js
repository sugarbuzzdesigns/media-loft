module.exports = function(grunt) {
    // require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: {
				src: ['assets/js/build']
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
				src: ['assets/js/src/vendor/jquery-ui.js',
				      'assets/js/src/vendor/jquery-kinetic.js',
					  'assets/js/src/vendor/jquery-mousewheel.js',
					  'assets/js/src/vendor/jquery-smoothscroll.js',
					  'assets/js/src/vendor/modernizr.js'
				],
				dest: 'assets/js/build/vendor/vendor.min.js'
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
			css: {
				files: ['assets/scss/**/*.scss'], 
				tasks: ['css-build']		
			},
			js: {
				files: ['assets/js/src/**/*.js'], 
				tasks: ['js-build']		
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
			modules: {
				files: {		
					'assets/js/build/ml.min.js' : 'assets/js/src/ml.js',
					'assets/js/build/modules/home.min.js' : 'assets/js/src/modules/home.js',
					'assets/js/build/modules/work.min.js' : 'assets/js/src/modules/work.js'
				}
			},
			libs: {
				files: {
					'assets/js/build/libs/libs.min.js' : 'assets/js/src/libs/libraries.js'				
				}
			},
			options: {
				'mangle': false,
				'compress': { unused: false },
				'beautify': false,
				'expression': false,
				'report': 'min',
				'sourceMap': true,
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
					'assets/css/style.css': 'assets/css/style.css'
				}
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
					'assets/css/breakpoints.css': 'assets/scss/breakpoints.scss'
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

	grunt.registerTask('css-build', ['sass:dist', 'concat_css', 'autoprefixer', 'cssmin']);
	grunt.registerTask('js-build', ['clean', 'concat', 'uglify:modules']);
};