(function($){
	ml.Services = {
		init: function(){
			this.buildSlideshow();
			this.startSlideshow();

			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;

			$('#services-menu li').on('mouseover', function(e){
				var $this = $(this);

				$('#services-container').addClass('show-me');
				$('#services-landing').addClass('hide-me');

				$('.blur-overlay.show').removeClass('show');

				e.preventDefault();
				e.stopPropagation();

				$this.addClass('hovered');
				$this.siblings().removeClass('clicked');

				ml.activateMenuItem($this);
				_this.loadService($this);
			});

			$('#services-menu li').on('click', function(e){
				var $this = $(this);

				e.preventDefault();

				$('#services-menu-btn .open-menu').text($(this).text());

				if(ml.activeVideo){
					ml.pauseActiveVideo();
				}				

				if($this.is('.clicked')){
					_this.hideServiceContent($this);
					ml.playVideo(ml.activeVideo);
				} else {
					_this.showServiceContent($this);
				}				

				$this.toggleClass('clicked');
			});

			$('.service-section .summary').on('click', function(){
				if(ml.activeVideo){
					ml.pauseActiveVideo();
				}				

				$(this).parent().find('.blur-overlay').addClass('show');
				$(this).parent().find('.scaling-svg-container').addClass('show-me');
				$(this).parent().addClass('show-summary');
			});

			// $('.service-section').on('mouseover', function(){
			// 	if ($(this).is('.active') && !$(this).is('.show-summary')) {
			// 		if(ml.activeVideo){
			// 			ml.pauseActiveVideo();
			// 		}				

			// 		$(this).parent().find('.blur-overlay').addClass('show');
			// 		$(this).find('.scaling-svg-container').addClass('show-me');
			// 		$(this).addClass('show-summary');	
			// 	}			
			// });

			$('#services-menu-btn .open-menu').click(function(e){
				e.preventDefault();

				$('body').addClass('right-menu-open');
			});

			$('#services-menu-btn .close-menu').click(function(e){
				e.preventDefault();

				$('body').removeClass('right-menu-open');
			});			
		},

		loadService: function($menuItem){
			console.log('loadService');
			var $serviceSections = $('.service-section');
				$link = $('a', $menuItem),
				sectionToLoadHref = $link.attr('href'),
				$sectionToLoad = $('#' + sectionToLoadHref),
				$servicesContainer = $('#services-container'),
				containerTop = $servicesContainer.offset().top,
				$video = $('video', $sectionToLoad),
				hasVideo = $video.length > 0 ? true : false;

				if(hasVideo){
					if(this.activeVideo){
						ml.pauseActiveVideo();
					}
					
					ml.playVideo($video[0]);
					ml.activeVideo = $video[0];
				}

			// hide current section if showing
			$serviceSections.removeClass('active show-summary');
			// show the section chosen
			$sectionToLoad.addClass('active');
			// go to the section
			$("html, body").animate({ scrollTop: containerTop });
			// hide menu
			ml.$body.removeClass('right-menu-open');
		},

		showServiceContent: function($menuItem){
			var $link = $('a', $menuItem),
				sectionToLoadHref = $link.attr('href'),
				$sectionToLoad = $('#' + sectionToLoadHref);

				console.log($('.blur-overlay', $sectionToLoad));

			$('.blur-overlay', $sectionToLoad).addClass('show');
			$('.scaling-svg-container', $sectionToLoad).addClass('show-me');

			$sectionToLoad.addClass('show-summary');
		},

		hideServiceContent: function($menuItem){
			var $link = $('a', $menuItem),
				sectionToLoadHref = $link.attr('href'),
				$sectionToLoad = $('#' + sectionToLoadHref);

			$('.blur-overlay', $sectionToLoad).removeClass('show');
			$('.scaling-svg-container', $sectionToLoad).removeClass('show-me');

			$sectionToLoad.removeClass('show-summary');
		},	

		buildSlideshow: function(){
			var $quotes = $('blockquote .quote'),
				numQuotes = $('blockquote .quote').length;
			
			$quotes.addClass('animated bounceInRight');

			$('blockquote nav .total').text(numQuotes);
		},

		startSlideshow: function(){
			var _this = this;

			setInterval(function(){
				var nextToShow = $('blockquote .quote.show').next(),
					cur = nextToShow.index() + 1;
					current = $('blockquote .quote.show');

				if(current.is('.last')){
					current.removeClass('show');
					$('blockquote .quote.first').addClass('show');
					cur = 1;
				} else {
					$('blockquote .quote.show').removeClass('show').next().addClass('show');	
				}

				$('blockquote nav .cur').text(cur);
			
			}, 5000);
		}
	}

	$(function(){
		ml.Services.init();			
	});
})(jQuery);

