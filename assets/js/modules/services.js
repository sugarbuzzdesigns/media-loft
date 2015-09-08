(function($){
	ml.Services = {
		init: function(){
			this.buildSlideshow();
			// this.startSlideshow();

			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;

			$('#services-menu li').on('mouseover', function(e){
				var $this = $(this);

				if ($this.is('.clicked')) {
					return;
				}

				$('#services-container').addClass('show-me');
				$('#services-landing').addClass('hide-me');
				$('#services-menu').addClass('inactive');

				$('.blur-overlay.show').removeClass('show');

				e.preventDefault();
				e.stopPropagation();

				$this.addClass('hovered');
				$this.siblings().removeClass('clicked');

				ml.menus.activateMenuItem($this);
				_this.loadService($this);
			});

			$('#services-menu li').on('click', function(e){
				var $this = $(this);

				e.preventDefault();

				if(ML_vars.device === 'mobile'){
					_this.loadService($this);
				}

				$('#services-menu-btn .open-menu').text($(this).data('menu-text'));

				if(ml.video.activeVideo){
					ml.video.pauseActiveVideo();
				}				

				if($this.is('.clicked')){
					_this.hideServiceContent($this);
					ml.video.playVideo(ml.video.activeVideo);
					$('#services-menu').addClass('inactive');	
				} else {
					_this.showServiceContent($this);	
					$('#services-menu').removeClass('inactive');			
				}				

				$this.toggleClass('clicked');
			});

			$('.service-section .summary').on('click', function(){
				if(ml.video.activeVideo){
					ml.video.pauseActiveVideo();
				}				

				if(ML_vars.device === 'desktop'){
					$(this).parent().find('.blur-overlay').addClass('show');
				}

				$(this).parent().find('.scaling-svg-container').addClass('show-me');
				$(this).parent().addClass('show-summary');
			});

			// $('.service-section').on('mouseover', function(){
			// 	if ($(this).is('.active') && !$(this).is('.show-summary')) {
			// 		if(ml.video.activeVideo){
			// 			ml.video.pauseActiveVideo();
			// 		}				

			// 		$(this).parent().find('.blur-overlay').addClass('show');
			// 		$(this).find('.scaling-svg-container').addClass('show-me');
			// 		$(this).addClass('show-summary');	
			// 	}			
			// });

			$('#services-menu-btn .open-menu').click(function(e){
				e.preventDefault();

				console.log('open the menu');

				$('body').addClass('right-menu-open');
			});

			$('#services-menu-btn .close-menu').click(function(e){
				e.preventDefault();

				$('body').removeClass('right-menu-open');
			});	

			$('#services-menu').mouseleave(function(){
				if($(this).is('.inactive')){
					$('#services-container').removeClass('show-me');
					$('#services-landing').removeClass('hide-me');					
				}
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
						ml.video.pauseActiveVideo();
					}
					
					ml.video.playVideo($video[0]);
					ml.video.activeVideo = $video[0];

					console.log('playe the video');
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
				sectionToLoadHref = $link.attr('href'),
				$sectionToLoad = $('#' + sectionToLoadHref);

			if(ML_vars.device === 'desktop'){
				$sectionToLoad.find('.blur-overlay').addClass('show');
				console.log('show overlay');
			}

			$('.scaling-svg-container', $sectionToLoad).addClass('show-me');

			console.log($sectionToLoad);

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

