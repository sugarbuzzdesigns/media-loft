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

				ml.activateMenuItem($this);
				_this.loadService($this);
			});

			$('#services-menu li').on('click', function(e){
				var $this = $(this);

				e.preventDefault();

				console.log('clicked');

				if(_this.activeVideo){
					ml.pauseActiveVideo();
				}				

				_this.showServiceContent($this);				
			});

			$('.service-section .summary').on('click', function(){
				if(_this.activeVideo){
					ml.pauseActiveVideo();
				}				

				$(this).parent().find('.blur-overlay').addClass('show');
				$(this).parent().find('.scaling-svg-container').addClass('show-me');
				$(this).parent().addClass('show-summary');
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

			$('.blur-overlay', $sectionToLoad).addClass('show');
			$('.scaling-svg-container', $sectionToLoad).addClass('show-me');

			$sectionToLoad.addClass('show-summary');	
		},		

		buildSlideshow: function(){
			var numQuotes = $('blockquote .quote').length;

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

