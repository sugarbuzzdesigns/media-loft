// For testing so It's easy to
// make selections in the console
var $ = jQuery;

// Declare global namespace for ML object
ml = {};

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

			_this.$rightMenuOpen.on('click', function(){
				_this.openRightMenu();
			});

			_this.$rightMenuClose.on('click', function(){
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
		activeVideo: '',

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

			if(this.breakpoint === 'smartphone'){
				ml.elms.$body.addClass('smartphone').removeClass('phablet tablet desktop');
			}
			if(this.breakpoint === 'phablet'){
				ml.elms.$body.addClass('phablet').removeClass('smartphone tablet desktop');
			}
			if(this.breakpoint === 'tablet'){
				ml.elms.$body.addClass('tablet').removeClass('phablet smartphone desktop');
			}
			if(this.breakpoint === 'desktop'){
				ml.elms.$body.addClass('desktop').removeClass('phablet tablet smartphone');
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
		// ml.elms.$win.load(function(){
			ml.elms.$body.addClass('loaded');
			ml.elms.$loader.delay(200).fadeOut();
		// });			
		ml.elms.$win.on('resize', myEfficientFn).resize();
		ml.elms.$win.on('scroll', myEfficientFn).scroll();
	});

})(jQuery);