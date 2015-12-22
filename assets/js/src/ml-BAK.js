var $ = jQuery;

var breakpoint = {};
breakpoint.refreshValue = function () {
	this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};

/**
 * Start Media Loft Object
 */
(function($){
	jQuery(window).load(function() {
	  // console.log('all site loaded');
	});

	ml = {

		init: function(){
			this.elms = {
				$win: $(window),
				$body: $('body')
			};
			
			this.env = {
				h: ml.elms.$win.height(),
				w: ml.elms.$win.width()
			};

			this.bindEvents();
		},
		bindEvents: function() {
			var _this = this;

			$('.main-menu li a').click(function(){
				console.log('hey');
				$(this).parent().siblings().removeClass('active');
			});

			$('.main-menu .open-menu').click(function(){
				console.log(ml.elms.$win);
				ml.elms.$body.addClass('main-menu-open');
				console.log('open me');
			});

			$('#menu-overlay').mouseover(function(){
				if(ML_vars.device === 'mobile'){return}

				ml.elms.$body.removeClass('main-menu-open');
				$('#menu-overlay').stop().fadeTo('fast',0);
			});			

			$('.home .play-reel, .home .blur-overlay').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				_this.playHomeVideo();
			});			

			$('#home-video-overlay .close-video').on('click', function(e){
				e.preventDefault();

				_this.closeHomeVideo();
			});	

			if(ML_vars.device === 'mobile'){
				$('.close-menu').click(function(){
					$('body').removeClass('main-menu-open');
					console.log('close me');
				});
			}

			$('#home-video-full').on('ended', function(){
				_this.closeHomeVideo();
			});

			$('video').each(function(i, elm){
				$(this).on('canplay', function(){
					console.log('can play', $(this));
					$(elm).addClass('canplay');
				});
			});

			this.startLandingVideo();
		},
		openNavMenu: function($menuBtn){
			if($menuBtn.is('.main-menu-btn')){
				this.toggleMainMenu();
			} else {
				this.toggleSideMenu();
			}
		},	
		toggleMainMenu: function(){
			ml.elms.$body.toggleClass('main-menu-open');
			if(ml.elms.$body.hasClass('right-menu-open')){
				ml.elms.$body.removeClass('right-menu-open');
			}			
		},
		toggleSideMenu: function(){
			ml.elms.$body.toggleClass('right-menu-open');
			if(ml.elms.$body.hasClass('main-menu-open')){
				ml.elms.$body.removeClass('main-menu-open');
			}
		},
		activateMenuItem: function($menuItem){
			$menuItem.addClass('active');
			$menuItem.siblings().removeClass('active');
		},
		hideRightNav: function(){
			$('.right-menu').addClass('go-away');
		},
		loadService: function($menuItem){
			var $serviceSections = $('.service-section');
				$link = $('a', $menuItem),
				$sectionToLoad = $($link.attr('href')),
				$servicesContainer = $('#services-container'),
				containerTop = $servicesContainer.offset().top,
				$video = $('video', $sectionToLoad),
				hasVideo = $video.length > 0 ? true : false;

				if(hasVideo){
					if(this.activeVideo){
						this.pauseActiveVideo();
					}
					
					this.playVideo($video[0]);

				}

			// hide current section if showing
			$serviceSections.removeClass('active show-summary');
			// show the section chosen
			$sectionToLoad.addClass('active');
			// go to the section
			$("html, body").animate({ scrollTop: containerTop });
			// hide menu
			ml.elms.$body.removeClass('right-menu-open');
		},
		showServiceContent: function($menuItem){
			var $link = $('a', $menuItem),
				$sectionToLoad = $($link.attr('href'));

			$('.blur-overlay', $sectionToLoad).addClass('show');

			$sectionToLoad.addClass('show-summary');	
		},
		startLandingVideo: function(){

			var $vid = $('#landing-video');
				vid = $vid[0];

			$vid.on('canplay', function(){
				vid.play();
			});
		},
		pauseActiveVideo: function(){
			this.activeVideo.pause();
		},
		playVideo: function(video){
			video.play();

			this.activeVideo = video;
		},
		showRelatedBlogArticle: function($article){
			var group = $article.parent(),
				groupSiblings = group.siblings('.group');

			groupSiblings.hide();
			$article.siblings().hide();

			$article.addClass('show-article');

			// console.log($('article').not('.show-article').addClass('hide-me'));
			// console.log($(entry).parent().find('.article-content'));
		},

		scaleSvgHeight: function(){
			var svgContainer = $('.scaling-svg-container');
			var svg = $('.scaling-svg-container svg');

			var w = $(window).width();
			var h = $(window).height();

			var pb = (h/w) * 100;

			svgContainer.css('padding-bottom', pb + '%');

			svg.attr({
				'height': h,
				'width': w,
				'viewBox': [0, 0, w, h].join(' ')
			});		
		}
	};

	ml.Utils = {
		setEnvProps: function(){
			ml.env.h = ml.elms.$win.height();
			ml.env.w = ml.elms.$win.width();
		},

		getHasbang: function(url, i, hash) {
	        url = url || window.location.href;

	        var pos = url.indexOf('#!');
	       
	        if( pos < 0 ) return [];
	        
	        var vars = [], 
	        	hashes = url.slice(pos + 2).split('&');

	        for(i = hashes.length; i--;) {
	            hash = hashes[i].split('=');
	            vars.push({ name: hash[0], value: hash.length > 1 ? hash[1] : null});
	        }

	        return vars;
    	},

		getClosestSection: function(){
			var scrollPos = ml.elms.$win.scrollTop(),
				closest = $('section').first();
				// distance = Math.abs(closest.offset().top - scrollPos);

			$('section').each(function(){
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


	$(function(){
		ml.init();

		$(window).load(function(){
			$('body').addClass('loaded');
			$('#loader').delay(200).fadeOut();
		});

		ml.elms.$win.resize(function() {
			breakpoint.refreshValue();
			ml.Utils.setEnvProps();

			console.log(ml.env.w);

            if(this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function() {
                $(this).trigger('resizeEnd');
            }, 200);

            // ml.scaleSvgHeight();
        }).resize(); 

        $(window).on('orientationchange', function(e){
        	console.log(e);
        });   
		$.event.special.scrollstop.latency = 250;

		ml.elms.$win.on("scrollstop", function() {
		    // Paint it all green when scrolling stops.
		    console.log('stop');
		    $(this).trigger('stop');
		    // ml.Utils.getClosestSection();
		    // ml.Utils.scrollToClosestSection();
		});

		// ml.elms.$win.on("resizeEnd", function() {
		//     // Paint it all green when scrolling stops.
		//     console.log('resize done');
		//     ml.Utils.getClosestSection();
		//     ml.Utils.scrollToClosestSection();
		// });				
	});

})(jQuery);