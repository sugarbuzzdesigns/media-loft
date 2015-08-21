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
			$('#about-culture-video-full').css('opacity', 1);
			$('#culture .blur-overlay').css('opacity', 0);
			$('#about-culture-video-full')[0].play();
		},			
	};
	
	$(function(){
		ml.About.Global.init();
	
		$('#people .tile').flip({
			// trigger: 'manual'
		});

		$("section").snapPoint({ 
		    scrollDelay: 200,       // Amount of time the visitor has to scroll before the snap point kicks in (ms)
		    scrollSpeed: 200,        // Length of smooth scroll's animation (ms)
		    outerTopOffset: 300,    // Number of pixels for the downward vertical offset (relative to the top of your snapping container)
		    innerTopOffset: 300      // Number of pixels for the upward vertical offset (relative to the top of your snapping container)
		});		

	});


})(jQuery);