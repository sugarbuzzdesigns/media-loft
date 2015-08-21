var $ = jQuery;

/**
 * Start Media Loft Object
 */
(function($){
	jQuery(window).load(function() {
	  // console.log('all site loaded');
	});

	ml = {

		selections: {
			$win: $(window)
		},

		init: function(){
			this.bindEvents();

			// Cache some often used elements
			this.$win = $(window);
			this.$body = $('body');

			this.env = $('html').is('.mobile') ? 'mobile' : 'desktop';

			// console.log(this.env);
		},
		bindEvents: function() {
			var _this = this;

			// $('#main-menu').mouseover(function(){
			// 	_this.$body.addClass('main-menu-open');
			// 	console.log('hover');
			// });

			// // Main menu binding
			// $('.menu-btn, .open-menu').on('click', function(e){
			// 	e.preventDefault();
			// 	_this.openNavMenu($(this));
			// });
		
			$('#culture .play-reel').on('click', function(e){
				e.preventDefault();

				_this.playCultureVideo();
			});

			$('.home .play-reel').on('click', function(e){
				e.preventDefault();

				_this.playHomeVideo();
			});			

			this.startLandingVideo();

			$('#blog .header').on('click', function(e){
				e.preventDefault();
				
				_this.showBlogArticle($(this).parent());
			});

			$('.related-articles').on('click', function(){
				_this.showRelatedBlogArticle();
			});
		},
		openNavMenu: function($menuBtn){
			if($menuBtn.is('#main-menu-btn')){
				this.toggleMainMenu();
			} else {
				this.toggleSideMenu();
			}
		},	
		toggleMainMenu: function(){
			this.$body.toggleClass('main-menu-open');
			if(this.$body.hasClass('right-menu-open')){
				this.$body.removeClass('right-menu-open');
			}			
		},
		toggleSideMenu: function(){
			this.$body.toggleClass('right-menu-open');
			if(this.$body.hasClass('main-menu-open')){
				this.$body.removeClass('main-menu-open');
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
			this.$body.removeClass('right-menu-open');
		},
		showServiceContent: function($menuItem){
			var $link = $('a', $menuItem),
				$sectionToLoad = $($link.attr('href'));

			$('.blur-overlay', $sectionToLoad).addClass('show');

			$sectionToLoad.addClass('show-summary');	
		},
		playCultureVideo: function(){
			$('#culture .cta, #culture .video-cover').remove();
			$('#about-culture-videos')[0].play();
		},
		playHomeVideo: function(){
			$('#culture .cta, #culture .video-cover').remove();
			$('#about-culture-video')[0].play();
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
		showBlogArticle: function($article){
			var group = $article.parent(),
				groupSiblings = group.siblings('.group');

			groupSiblings.hide();
			$article.siblings().hide();

			$article.addClass('show-article');

			// console.log($('article').not('.show-article').addClass('hide-me'));
			// console.log($(entry).parent().find('.article-content'));
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
			var svgContainer = $('.responsive-height-svg');
			var svg = $('.responsive-height-svg svg');

			var w = $(window).width();
			var h = $(window).height();

			var pb = (h/w) * 100;

			svgContainer.css('padding-bottom', pb + '%');

			svg.attr({
				viewbox: [0, 0, w, h].join(' ')
			});		
		}
	};

	ml.Utils = {

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
			var scrollPos = ml.selections.$win.scrollTop(),
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

		ml.selections.$win.resize(function() {
            if(this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function() {
                $(this).trigger('resizeEnd');
            }, 200);

            ml.scaleSvgHeight();
        });      
		// $.event.special.scrollstop.latency = 250;

		// ml.selections.$win.on("scrollstop", function() {
		//     // Paint it all green when scrolling stops.
		//     console.log('stop');
		//     $(this).trigger('stop');
		//     ml.Utils.getClosestSection();
		//     ml.Utils.scrollToClosestSection();
		// });

		// ml.selections.$win.on("resizeEnd", function() {
		//     // Paint it all green when scrolling stops.
		//     console.log('resize done');
		//     ml.Utils.getClosestSection();
		//     ml.Utils.scrollToClosestSection();
		// });		
	});

})(jQuery);