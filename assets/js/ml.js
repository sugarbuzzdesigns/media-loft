// For testing so It's easy to
// make selections in the console
var $ = jQuery;

// Declare global namespace for ML object
var ml = {};

/**
 * Start Media Loft Object
 */
(function($){
	ml.elms = {
	    $win: $(window),
	    $html: $('html'),
	    $body: $('body'),
	    $document: $(document),
	    $bodyScrollElement: $('html, body'),
	    $loader: $('#loader')
	};

	ml.env = {
		init: function(){
			this.winHeight = ml.elms.$win.height();
			this.winWidth = ml.elms.$win.width();
			this.isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
			this.tapClick = this.isTouch ? 'touchend' : 'click';

			this.setTouchClass();
		},

		setTouchClass: function(){
			if(this.isTouch){
				ml.elms.$html.addClass('isTouch');
			} else {
				ml.elms.$html.addClass('noTouch');
			}
		}
	};

	ml.mainMenu = {
		init: function(){
			this.$mainMenuBtn = $('main-menu-btn');
			this.$mainMenu = $('.main-menu');
			this.$menuLink = $('.main-menu li a');
			this.$menuOverlay = $('#menu-overlay');
			this.$mainMenuOpen = $('.main-menu .open-menu');
			this.$mainMenuClose = $('.main-menu .close-menu');
			this.openClass = 'main-menu-open';

			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;	

			_this.$mainMenuOpen.on('mouseover touchstart', function(){
				_this.openMainMenu();
			});

			_this.$menuOverlay.on('mouseover', function(e){
				e.preventDefault();
				e.stopPropagation();

				if(ML_vars.device === 'mobile'){return}
				_this.closeMainMenu();
			});	

			_this.$mainMenuClose.on('touchstart', function(){
				_this.closeMainMenu();			
			});

			_this.$menuLink.on('click', function(){
				_this.deselectMenuItems($(this));
			});
		},

		openMainMenu: function(){
			ml.elms.$body.addClass(this.openClass);
			this.$menuOverlay.stop().fadeTo('fast',1);
		},

		closeMainMenu: function(){
			console.log('close main menu');
			ml.elms.$body.removeClass(this.openClass);
			this.$menuOverlay.stop().fadeTo('fast',0);			
		},

		deselectMenuItems: function($link){
			$link.parent().siblings().removeClass('active');
		}
	};

	ml.rightMenu = {
		init: function(){
			this.$rightMenu = $('.right-menu');
			this.$rightMenuBtn = $('.right-menu-btn');
			this.$rightMenuOpen = $('.right-menu-btn .open-menu');
			this.$rightMenuClose = $('.right-menu-btn .close-menu');

			this.openClass = 'right-menu-open';

			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;

			_this.$rightMenuOpen.on('click', function(e){
				e.preventDefault();
				_this.openRightMenu();
			});

			_this.$rightMenuClose.on('click', function(e){
				e.preventDefault();
				_this.closeRightMenu();
			});
		},

		openRightMenu: function(){
			ml.elms.$body.addClass(this.openClass);
		},

		closeRightMenu: function(){
			ml.elms.$body.removeClass(this.openClass);
		}		
	};

	ml.menus = {
		activateMenuItem: function($menuItem){
			$menuItem.addClass('active');
			$menuItem.siblings().removeClass('active');
		}		
	};

	ml.video = {
		init: function(){
			this.checkVideoCanPlay();
		},

		activeVideo: '',

		checkVideoCanPlay: function(){
			$('video').each(function(i, vid){
				$(vid).on('canplay', function(){
					$(this).addClass('canplay');
					console.log('can play videos');
				});
			});
		},

		pauseActiveVideo: function(){
			this.activeVideo.pause();
		},

		playVideo: function(video){
			video.play();

			this.activeVideo = video;
		},
	};

	ml.utils = {
		debounce: function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, 
					args = arguments;
				
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};

				var callNow = immediate && !timeout;

				clearTimeout(timeout);
				
				timeout = setTimeout(later, wait);
				
				if (callNow) func.apply(context, args);
			}
		},

		setBreakpoint: function () {
			this.breakpoint = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');

			if(ML_vars.device === 'mobile'){
				ml.elms.$body.addClass('mobile').removeClass('phablet tablet desktop');
			}
			if(ML_vars.device === 'phablet'){
				ml.elms.$body.addClass('phablet').removeClass('mobile tablet desktop');
			}
			if(ML_vars.device === 'tablet'){
				ml.elms.$body.addClass('tablet').removeClass('phablet mobile desktop');
			}
			if(ML_vars.device === 'desktop'){
				ml.elms.$body.addClass('desktop').removeClass('phablet tablet mobile');
			}									
		},

		isTouch: function(){
			return ml.elms.$html.is('.touch') ? true : false;
		},

		getClosestSection: function($section){
			var scrollPos = ml.elms.$win.scrollTop(),
				closest = $section.first();
				// distance = Math.abs(closest.offset().top - scrollPos);

			$section.each(function(){
				var distanceFromScreenTop = Math.abs($(this).offset().top - scrollPos);

				if(distanceFromScreenTop < Math.abs(closest.offset().top - scrollPos)){
					closest = $(this);
				}
			});

			this.closestSection = closest;
		},	

		scrollToClosestSection: function(){
			var scrollPos = this.closestSection.offset().top;

			$('html, body').animate({
				scrollTop: scrollPos
			});
		} 		
	};

	var myEfficientFn = ml.utils.debounce(function() {
		ml.utils.setBreakpoint();

		if(ml.elms.$body.is('.page-work') && ML_vars.device === 'desktop'){
			ml.Work.resizeWorkPage();			
		}
	}, 350);	

	$(function(){
		ml.env.init();
		ml.mainMenu.init();
		ml.rightMenu.init();
		// ml.video.init();

		ml.elms.$win.load(function(){
			console.log('window loaded');
			// clearTimeout(onLoadTimeout);

			ml.elms.$loader.fadeOut();
			ml.elms.$body.addClass('loaded');
		});			

		var onLoadTimeout = setTimeout(function(){
			console.log('timeout done');
			ml.elms.$loader.fadeOut();
			ml.elms.$body.addClass('loaded');
		}, 500);

		ml.elms.$win.on('resize', myEfficientFn).resize();
		ml.elms.$win.on('scroll', myEfficientFn).scroll();

		var url = $.url(window.location);
		
		if(url.param('getdevice') === '1'){
			alert('is touch: ' + ml.env.isTouch + '   env: ' + ML_vars.device);
		}
	});

})(jQuery);