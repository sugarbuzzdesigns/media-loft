ml.About = {};

(function($){
	ml.About.Global = {
		init: function(){
			this.currentIndex = 0;
			this.sections = $('section');
			this.sectionsCount = this.sections.length;
			this.bindEvents();

			if(ML_vars.device === 'desktop'){
				this.positionPeopleTagline();
			}
		},
		bindEvents: function(){
			var _this = this;

			$('#about-menu li').on('click', function(e){
				e.stopPropagation();
				e.preventDefault();

				console.log('ehylkjklj');

				_this.scrollToSection(this);
			});

			$('#culture .play-reel').on('click', function(e){
				e.preventDefault();

				_this.playCultureVideo();
			});	

			$('.nav-arrow-down').on('click', function(){
				_this.scrollToSection($('#about-menu li').eq(0));
			});

			$('.email .choice').on('click', function(){
				$('.email .active').removeClass('active');
				$(this).addClass('active');

				$('.email .selected').text($(this).text());
				$('.email-link a').attr('href', $(this).data('mailto'));
			});

			$('#culture .close-video').click(function(e){
				e.preventDefault();

				_this.stopCultureVideo();
			});

			$('#about-culture-video-full').on('ended', function(){
				_this.stopCultureVideo();
			});

		},
		positionPeopleTagline: function(){
			var tileHeight = $('#people .tile').height(),
				$cta = $('#people .cta'),
				$tagline = $('#people .cta .tagline'),

				ctaHeight = 68,
				taglineHeight = $tagline.height(),
				
				heightDiff = ctaHeight - taglineHeight,
				topPos = tileHeight*2 - ctaHeight;

			$cta.css({top: topPos});
		},
		scrollToSection: function(menuItem){
			var $menuItem = $(menuItem),
				dataSection = $menuItem.data('section-name'),
				$section = $(dataSection),
				sectionTop = $section.offset().top;

			$menuItem
				.addClass('active')
				.siblings()
				.removeClass('active');

				console.log('scroll down!');

			$('body, html').animate({
				scrollTop: sectionTop
			});
		},
		checkUrl: function(event){
			var _this = this,
				workId = '';

			if(_this.currentPath === '/'){
				if (_this.currentWorkItem != '') {
					// reset the work page
					_this.closeWorkItem(_this.currentWorkItem);
				};

				return;
			} else {
				workId = _this.currentPath.replace('/', '');
				_this.openWorkItem(workId);
			}
		},

		updateUrl: function(workItemId){
			window.location.hash = '#!/' + workItemId;
		},	

		playCultureVideo: function(){
			$('#culture').addClass('play-full-video');

			$('#about-culture-video-loop').fadeOut();
			$('#about-culture-video-full')[0].play();
		},	
		stopCultureVideo: function(){
			$('#culture').removeClass('play-full-video');

			$('#about-culture-video-loop').fadeIn();
			$('#about-culture-video-full')[0].pause();
			$('#about-culture-video-full')[0].currentTime = 0;
		},					
	};
	
	$(function(){
		ml.About.Global.init();

		function updateNav(id){
			var navItem = $('li[data-section-name="#'+ id +'"]');
			
			navItem
				.addClass('active')
				.siblings()
				.removeClass('active');
		};

		var sectionsDownWaypoit = $('section').waypoint({
		  handler: function(direction) {
		  	if (direction === 'down') {
		  		updateNav($(this.element).attr('id'));
		  	}
		  },
		  offset: '50%'
		});			

		var sectionsUpWaypoit = $('section').waypoint({
		  handler: function(direction) {
		  	if (direction === 'up') {
		  		updateNav($(this.element).attr('id'));
		  	}
		  },
		  offset: '-50%'
		});	

		var timeLineWaypoit = $('#timeline2').waypoint({
		  handler: function(direction) {
		  	if (direction === 'down') {
		  		// console.log('down');
				$(this.element).addClass('in-view');

				setTimeout(function(){
					$('#explore-timeline').fadeOut();
				}, 3000);

				setTimeout(function(){
					$('.date').eq(0).addClass('hover');
				}, 500);

				setTimeout(function(){
					$('.date').eq(0).removeClass('hover');
				}, 2200);

				setTimeout(function(){
					$('.date').eq(3).addClass('hover');
				}, 800);

				setTimeout(function(){
					$('.date').eq(3).removeClass('hover');
				}, 2200);

				setTimeout(function(){
					$('.date').eq(5).addClass('hover');
				}, 1100);

				setTimeout(function(){
					$('.date').eq(5).removeClass('hover');
				}, 2200);	

				setTimeout(function(){
					$('.date').eq(8).addClass('hover');
				}, 1100);

				setTimeout(function(){
					$('.date').eq(8).removeClass('hover');
				}, 2200);												
		  	}
		  },
		  offset: '20%'
		});			

		// $('#people .tile').flip({
		// 	trigger: 'manual'
		// });

		var employeeTiles = $('#people .tile').waypoint({
		  handler: function(direction) {
		  	if (direction === 'down') {
				$(this.element).addClass('in-view');		
		  	} else {
				$(this.element).removeClass('in-view');				
		  	}
		  },
		  offset: '80%'
		});		

		var employeeTiles2 = $('#people .tile').waypoint({
		  handler: function(direction) {
		  	if (direction === 'down') {
				$(this.element).removeClass('in-view');		
		  	} else {
				$(this.element).addClass('in-view');				
		  	}
		  },
		  offset: '-20%'
		});				

		var employeeSections = $('#people').waypoint({
		  handler: function(direction) {
		  	if (direction === 'up') {
		  		console.log('out of view up');
		  	} else {
		  		console.log('in view down');
		  		$(this.element).addClass('in-view');
		  	}
		  },
		  offset: '80%'
		});		

		var employeeSection2 = $('#people').waypoint({
		  handler: function(direction) {
		  	if (direction === 'down') {
		  		console.log('out of view down');
		  	} else {
		  		console.log('in view up');
		  		$(this.element).addClass('in-view');
		  	}
		  },
		  offset: '-80%'
		});			

		var clientsWaypoint = $('#clients').waypoint({
		  handler: function(direction) {
		  	if (direction === 'down') {
		  		// console.log('down');
				$(this.element).addClass('in-view');
		  	} else {
				// $(this.element.offsetParent).removeClass('in-view');
		  	}
		  },
		  offset: '50%'
		});		

		var cultureWaypoint = $('#culture').waypoint({
			handler: function(direction) {
				if (direction === 'down') {
					// console.log('in from top');
				} else {
					// stop video
					ml.About.Global.stopCultureVideo();
				}
			},
			offset: '20%'
		});		

		var cultureWaypoint2 = $('#culture').waypoint({
			handler: function(direction) {
				if (direction === 'up') {
					console.log('in from bottom');
				} else {
					// stop video
					ml.About.Global.stopCultureVideo();
				}
			},
			offset: '-80%'
		});		
	
		$("section").snapPoint({ 
		    scrollDelay: 200,       // Amount of time the visitor has to scroll before the snap point kicks in (ms)
		    scrollSpeed: 200,        // Length of smooth scroll's animation (ms)
		    outerTopOffset: ($(window).height() * 0.40),    // Number of pixels for the downward vertical offset (relative to the top of your snapping container)
		    innerTopOffset: ($(window).height() * 0.40)      // Number of pixels for the upward vertical offset (relative to the top of your snapping container)
		});	

		$('body, article').swipe({
			swipe:function(event, direction, distance, duration, fingerCount) {
				if(direction === 'up'){
					if(ml.About.Global.currentIndex === ml.About.Global.sectionsCount-1){ return }
					ml.About.Global.currentIndex++;

					ml.elms.$bodyScrollElement.animate({
						scrollTop: ml.About.Global.currentIndex*ml.env.winHeight
					});
				}

				if(direction === 'down'){
					console.log('down');
					if(ml.About.Global.currentIndex === 0){ return }
					ml.About.Global.currentIndex--;

					ml.elms.$bodyScrollElement.animate({
						scrollTop: ml.About.Global.currentIndex*ml.env.winHeight
					});						
				}
			}
		});	

		$('article').swipe({
			swipe:function(event, direction, distance, duration, fingerCount) {
				console.log(this);
			}
		});
	});

})(jQuery);