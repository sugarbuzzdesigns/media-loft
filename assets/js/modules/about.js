ml.About = {};

(function($){
	ml.About.Global = {
		init: function(){
			this.bindEvents();
		},
		bindEvents: function(){
			var _this = this;

			$('#about-menu li').on('click', function(e){
				e.stopPropagation();
				e.preventDefault();

				_this.scrollToSection(this);
			});

			$('#culture .play-reel').on('click', function(e){
				e.preventDefault();

				_this.playCultureVideo();
			});	

			$('.nav-arrow-down').on('click', function(){
				_this.scrollToSection($('#about-menu li').eq(1));
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

			$('body', 'html').animate({
				scrollTop: sectionTop
			})
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
		},					
	};
	
	$(function(){
		ml.About.Global.init();

		var timeLineWaypoit = $('#timeline2').waypoint({
		  handler: function(direction) {

		  },
		  offset: '50%'
		});			

		var employeeTiles = $('#people .tile').waypoint({
		  handler: function(direction) {
		  	if (direction === 'down') {
		  		console.log('down');
				$(this.element).addClass('in-view');
		  	} else {
				// $(this.element.offsetParent).removeClass('in-view');
		  	}
		  },
		  offset: '80%'
		});		

		var clientsWaypoint = $('#clients').waypoint({
		  handler: function(direction) {
		  	if (direction === 'down') {
		  		console.log('down');
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
					console.log('in from top');
				} else {
					// stop video
					$('#about-culture-video-full')[0].pause();
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
					$('#about-culture-video-full')[0].pause();
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

	});


})(jQuery);