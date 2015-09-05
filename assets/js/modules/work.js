(function($){

	ml.Work = {

		init: function(){
			this.$workItems = $('.work-item');
			this.$workSummary = $('.work-summary');
			this.$workCover = $('.work-cover');
			this.$workItemsWin = $("#work-items-window");
			this.$workCarousels = $('.work-carousel');
			this.$closeBtn = $('.work-item .close');
			this.$curWorkItem = '';

			this.currentVideo = '';

			this.numWorkItems = this.$workItems.length;

			this.currentIndex = 0;
			this.carouselIndex = 0;

			this.setupDescription();
			this.buildWorkCarousels();

			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;

			// _this.$workCover.on('touchstart', function(){
			// 	$(this).parent().addClass('active');
			// });

			_this.$workCover.on('click', function(){
				_this.openWorkItem($(this).parent());
				$(this).parent().removeClass('active');
			});

			_this.$closeBtn.on(ml.env.tapClick, function(e){
				e.stopPropagation();

				var $item = $(this).closest('.work-item');

				_this.closeWorkItem($item);
			});

			_this.$workItemsWin.swipe({
				swipe:function(event, direction, distance, duration, fingerCount) {
					var scrollTo;

				  	if(!_this.$workItemsWin.is('.item-open')){
				  		_this.summaryScroll(direction);
					} else {
						_this.detailsScroll(direction);
					}			  
				}
			});	

			/*
			Video Event Bindings
			 */		
			$('.video-bg-container').on('click', function(){
				_this.playFullVideo($(this));
			});	

			$('.close-video').on('click', function(e){
				e.stopPropagation();	

				_this.closeFullVideo();
			});						
		},

		openWorkItem: function($item){
			$item.addClass('open');
			this.$workItemsWin.addClass('item-open');

			this.$curWorkItem = $item;
		},

		closeWorkItem: function($item){
			$item.removeClass('open');
			this.$workItemsWin.removeClass('item-open');

			this.$curWorkItem = '';
			this.carouselIndex = 0;
		},

		summaryScroll: function(direction){
			var _this = this;

		    if(direction === 'down'){
		    	if(_this.currentIndex === 0){ return; }
		    	_this.currentIndex--;
		    } 

		    if(direction === 'up'){
		    	if(_this.currentIndex === _this.numWorkItems - 1){ return; }
				_this.currentIndex++;
		    }

	    	scrollTo = ml.env.winHeight * _this.currentIndex;

	    	_this.scrollWorkSummary(scrollTo);			    
		},

		detailsScroll: function(direction){
			var _this = this,
				$carouselItems = $('.carousel-item', _this.$curWorkItem);

		    if(direction === 'down'){
		    	if(_this.carouselIndex === 0){ return; }
		    	_this.carouselIndex--;
		    } 

		    if(direction === 'up'){
		    	if(_this.carouselIndex === $carouselItems.length){ return; }
				_this.carouselIndex++;
		    }

	    	_this.scrollWorkDetail();			    
		},		

		scrollWorkSummary: function(scrollTo){
	    	this.$workItemsWin.animate({
	    		scrollTop: scrollTo
	    	}, 500, 'easeOutQuad');				
		},

		scrollWorkDetail: function(){
			var yPos = -this.carouselIndex*100 + '%';

			$('.carousel-items', this.$curWorkItem).css({
				"-webkit-transform":"translate(0,"+ yPos + ")",
				"-ms-transform":"translate(0,"+ yPos + ")",
				"transform":"translate(0,"+ yPos + ")"				
			});
		},

		resetToTop: function(){
	    	this.$workItemsWin.animate({
	    		scrollTop: 0
	    	}, 500, 'easeOutQuad');				
		},

		buildWorkCarousels: function(){
			var _this = this;

			this.$workCarousels.each(function(i, elm){
				var $carousel = $(elm),
					$carouselNavUl = $('.carousel-nav ul', $carousel),
					$carouselItemsContainer = $('.carousel-items', $carousel);

				$carouselItemsContainer.each(function(i, elm){
					$carouselItems = $('.carousel-item', $(elm));

					$carouselItems.each(function(i, elm){
						$('<li></li>').appendTo($carouselNavUl);
					});
				});

				$('li:first-child', $carouselNavUl).addClass('active');
			});

			_this.bindCarouselNavs();
		},

		bindCarouselNavs: function(){
			_this = this;

			$('.carousel-nav li').on('click', function(e){
				e.stopPropagation();

				var $this = $(this),
					index = $this.index(),
					$curWorkitem = $('#' + _this.currentWorkItem),
					$items = $(this).closest('.carousel-nav').siblings('.carousel-items'),
					slideToShow = $('.carousel-item', $items)[index];

					_this.curCarouselItem = index;

					$this.addClass('active').siblings().removeClass('active')

					$(slideToShow).show().siblings().hide();

					if (index === 0) {
						// set prev to disabled
						$('.prev', $curWorkitem).addClass('disabled');
					} else {
						$('.prev', $curWorkitem).removeClass('disabled');
					}

					if(index === ($('.carousel-nav li', $curWorkitem).length-1)){
						$('.related-slide .next', $curWorkitem).addClass('disabled');
					}
			});
		},

		setupDescription: function(){
			$('.description').each(function(i, elm){
				var $this = $(this),
					$p = $this.find('p'),
					$nav = $('.textNav', $this);

				$p.each(function(){
					$('<span></span>').appendTo($nav);
				});

				$('.textNav span:first', $this).addClass('active');
				$('p:first', $this).addClass('active');
			});

			$('.textNav span').click(function(){
				var $this = $(this),
					i = $this.index(),
					$desc = $this.closest('.description');

				$this.addClass('active').siblings().removeClass('active');

				$desc.find('p.active').removeClass('active');
				$desc.find('p').eq(i).addClass('active');
			});	
		},

		playFullVideo: function($videoContainer){
			var _this = this,
				$playBtn = $videoContainer.find('.video-start'),
				videoId = $playBtn.data('video'),
				$video = $('#' + videoId),
				$currentWorkItem = $('#' + ml.Work.currentWorkItem),
				videoSrc = $('source', $video).data('src');

				if(!$video.data('started')){
					$video.attr('src', videoSrc);
				}

			$video.show();	

			_this.currentVideo = $video[0];

			$('.work-loop-video', $currentWorkItem).css('opacity', 0); 
			$('.work-full-video', $currentWorkItem).show().css('opacity', 1);

			ml.elms.$body.addClass('show-video');

			$video[0].play();
			$video.data('started', true);
		},

		closeFullVideo: function(){
			console.log('close video');
			this.currentVideo.pause();
			
			$(this.currentVideo).fadeOut();
			
			ml.elms.$body.removeClass('show-video');
		}							
	};

	ml.Work.menu = {
		init: function(){
			this.$link = $('.right-menu a');

			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;

			_this.$link.on('click touchstart', function(){
				ml.menus.activateMenuItem($(this).parent());

				_this.setUpFilter($(this));
				_this.filterWork();

				if(ml.env.isTouch){
					// _this.touchFilterWork();

					setTimeout(function(){
						ml.rightMenu.closeRightMenu();
					}, 400);
				} else {
					// _this.noTouchFilterWork();
				}				
			});
		},

		setUpFilter: function($filterLink){
			var _this = this;
				
				_this.$filterLink = $filterLink;
				_this.filterCat = _this.$filterLink.data('filter-cat');
				_this.worksInCat = $('[data-category="' + _this.filterCat +'"]');
				_this.worksToHide = ml.Work.$workItems.not(_this.worksInCat);
				// workItemsWidth = this.workItemWidth * numWorkInCat,
		},

		filterWork: function(){
			ml.Work.currentIndex = 0;
			ml.Work.numWorkItems = this.worksInCat.length;

			ml.Work.resetToTop();

			this.worksInCat.show();
			this.worksToHide.hide();
		}
	}

	$(function(){
		ml.Work.init();
		ml.Work.menu.init();
	
		$(window).on('resizeEnd', function(){
			console.log('hey resized');
			if(ML_vars.device != 'mobile'){
				ml.Work.resizeWorkPage();
			}
		});		
	});
})(jQuery);