(function($){

	ml.Work = {

		init: function(){
			this.$workItemsContainer = $('#work-items');
			this.$workItems = $('.work-item');
			this.$workSummary = $('.work-summary');
			this.$workCover = $('.work-cover');
			this.$workItemsWin = $("#work-items-window");
			this.$workCarousels = $('.work-carousel');
			this.$closeBtn = $('.work-item .close');
			this.$relatedWork = $('.related-work');
			this.$curWorkItem = null;

			this.workItemsContainerWidth = 0;

			this.currentVideo = null;

			this.numWorkItems = this.$workItems.length;

			this.currentIndex = 0;
			this.carouselIndex = 0;

			if(ML_vars.device != 'mobile'){
				this.setUpWorkPage();
			}			

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

				console.log('hey');

				var $item = $(this).closest('.work-item');

				_this.closeWorkItem($item);
			});

			if(ML_vars.device === 'mobile'){ 
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
			}

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

			/*
			Related Work Click
			 */				
			_this.$relatedWork.on('click', function(){
				_this.openRelatedWork($(this));
			});

			/*
			Work Carousel
			 */
			$('.carousel-arrow-nav a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				_this.navigateCarouselPrevNext($(this));				
			});			
		},

		setUpWorkPage: function(){
			var workItemWidth = this.$workItems[0].getBoundingClientRect().width,
				numWorkItems = this.$workItems.length,
				workItemsContainerWidth = workItemWidth*numWorkItems;

			this.$workItemsWin.css({
				width: ml.env.winWidth,
				height: ml.env.winHeight
			});
		
			this.$workItems.css({
				width: workItemWidth
			});

			$('#work-items').css({
				height: ml.env.winHeight,
			});

			this.workItemWidth = workItemWidth;
			this.workItemsContainerWidth = workItemsContainerWidth;
			this.numWorkItems = numWorkItems;

			this.$workItems.css('width', workItemWidth);
			this.$workItemsContainer.addClass('loaded').css('width', workItemsContainerWidth);
			
			this.$workItems.show();

			setTimeout(function(){
				$('#work-items').css({
					left: 0
				});
			}, 500);
		},		

		openWorkItem: function($item){
			var _this = this;

			$item.siblings().removeClass('open');
			$item.addClass('open');
			_this.$workItemsWin.addClass('item-open');

			if(ML_vars.device != 'mobile'){
				_this.scrollLeftPos = $('.scrollWrapper').scrollLeft();

				$item
					.css('width', '100%');

				_this.$workItemsContainer.css('width', '100%');
				_this.$workItems.not('.open').css('display', 'none');
				$('.scrollableArea').css('width', '100%');	
			}

			ml.rightMenu.$rightMenu.addClass('go-away');
			ml.rightMenu.$rightMenuBtn.addClass('go-away');

			_this.$curWorkItem = $item;
			_this.currentIndex = $item.index();
		},

		closeWorkItem: function($item){
			$item.removeClass('open');
			this.$workItemsWin.removeClass('item-open');

			$('.scrollWrapper').perfectScrollbar('update');

			this.resetWorkItem(this.$curWorkItem);

			ml.rightMenu.$rightMenu.removeClass('go-away');

			this.$curWorkItem = null;
			this.carouselIndex = 0;

			if(ML_vars.device != 'mobile'){
				$item
					.css('width', this.workItemWidth);

					console.log(this.workItemsContainerWidth);

				_this.$workItemsContainer.css('width', this.workItemsContainerWidth);
				_this.$workItems.show();
				$('.scrollableArea').css('width', this.workItemsContainerWidth);	

				$('.scrollWrapper').scrollLeft(this.scrollLeftPos);
			}			
		},

		openRelatedWork: function($link){
			var workName = $link.data('href'),
				$item = $('#' + workName);

			this.resetWorkItem(this.$curWorkItem);	

			this.closeWorkItem(this.$curWorkItem);
			this.scrollToItem($item);

			this.openWorkItem($item);
		},

		scrollToItem: function($item){
			var i = $item.index();
			var scrollTo = ml.env.winHeight * i;

			this.scrollWorkSummary(scrollTo);
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

		scrollWorkDetail: function(index){
			var yPos = (index) ? -index*100 + '%' : -this.carouselIndex*100 + '%';

			$('.carousel-items', this.$curWorkItem).css({
				"-webkit-transform":"translate(0,"+ yPos + ")",
				"-ms-transform":"translate(0,"+ yPos + ")",
				"transform":"translate(0,"+ yPos + ")"				
			});

			console.log($('.carousel-items', this.$curWorkItem));
		},

		resetToTop: function(){
	    	this.$workItemsWin.animate({
	    		scrollTop: 0
	    	}, 500, 'easeOutQuad');				
		},

		resetWorkItem: function($item){
			this.carouselIndex = 0;
			this.scrollWorkDetail();
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
					$curWorkItem = $('#' + _this.curWorkItem),
					$items = $(this).closest('.carousel-nav').siblings('.carousel-items'),
					slideToShow = $('.carousel-item', $items)[index];

					_this.carouselIndex = index;

					$this.addClass('active').siblings().removeClass('active')

					$(slideToShow).show().siblings().hide();

					if (index === 0) {
						// set prev to disabled
						$('.prev', $curWorkItem).addClass('disabled');
					} else {
						$('.prev', $curWorkItem).removeClass('disabled');
					}

					if(index === ($('.carousel-nav li', $curWorkItem).length-1)){
						$('.related-slide .next', $curWorkItem).addClass('disabled');
					}
			});
		},

		navigateCarouselPrevNext: function($navButton){
				var $curCarousel = $('.work-carousel', this.$curWorkItem),
					firstCarouselitem = $curCarousel.find('.carousel-item')[0];

				if($navButton.is('.prev') && this.carouselIndex === 0){
					this.closeWorkItem(this.$curWorkItem);
					// this.resetUrl();
					return;
				}

				if($navButton.is('.disabled')){
					return;
				} 

				if($navButton.is('.prev')){
					// try prev
					console.log('prev');
					$('.carousel-nav .active', $curCarousel).removeClass('active');

					this.carouselIndex--;
					$('.carousel-nav li', $curCarousel).eq(this.carouselIndex).addClass('active');

					var curIndex = $navButton.closest('.carousel-item').index();

					$navButton.closest('.carousel-item').hide();
					$navButton.closest('.carousel-item').prev().show();

					// if (curIndex === 1) { 
					// 	console.log('disable it');
					// 	 $(firstCarouselitem).find('.prev').addClass('disabled');
					// 	return; 
					// };

					$navButton.closest('.carousel-item').index();
				}

				if($navButton.is('.next')){
					// try next
					console.log('next');
					$('.carousel-nav .active', $curCarousel).removeClass('active');

					this.carouselIndex++;

					$('.carousel-nav li', $curCarousel).eq(this.carouselIndex).addClass('active');

					$('.prev', this.$curWorkItem).removeClass('disabled');

					$navButton.closest('.carousel-item').hide();
					$navButton.closest('.carousel-item').next().show();

					if($navButton.closest('.carousel-item').next().is('.related-content')){
						$navButton.closest('.carousel-item').next().find('.next').addClass('disabled');
						return;
					}					
				}	
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
				$curWorkItem = $('#' + ml.Work.curWorkItem),
				videoSrc = $('source', $video).data('src');

				if(!$video.data('started')){
					$video.attr('src', videoSrc);
				}

			$video.show();	

			_this.currentVideo = $video[0];

			$('.work-loop-video', $curWorkItem).css('opacity', 0); 
			$('.work-full-video', $curWorkItem).show().css('opacity', 1);

			ml.elms.$body.addClass('show-video');

			$video[0].play();
			$video.data('started', true);
		},

		closeFullVideo: function(){
			console.log('close video');
			this.currentVideo.pause();
			
			$(this.currentVideo).fadeOut();
			
			ml.elms.$body.removeClass('show-video');
		},

		resizeWorkPage: function(){
			var	winWidth = $(window).width(),
				winHeight = $(window).height(),
				itemWidth = winWidth/4,
				winMinWidth1 = 1030,
				winMinWidth2 = 768,
				containerWidth;

				if (winWidth < winMinWidth1) {
					itemWidth = winWidth/3;
				}

				if (winWidth < winMinWidth2) {
					itemWidth = winWidth/2;
				}		

			this.workItemWidth = itemWidth;

			if($('.work-item.open').length > 0){
				containerWidth = '100%';
			} else {
				this.workItemsContainerWidth = containerWidth = itemWidth*this.numWorkItems;
				$('.scrollableArea').css('width', this.workItemsContainerWidth);
			}

			this.$workItemsContainer.css('height', winHeight);
			this.$workItemsContainer.css('width', containerWidth);
			$('#work-items-window').css('height', winHeight);
			$('#work-items-window').css('width', winWidth);

			$('.work-item').not('.open').css('width', itemWidth);
			$('.work-item.open').css('width', '100%');

			$('.scrollWrapper').perfectScrollbar('update');
		},

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

			if(this.filterCat === 'all'){
				ml.Work.$workItems.show();
			};
		}
	}

	$(function(){
		ml.Work.init();
		ml.Work.menu.init();

		if(ML_vars.device != 'mobile'){
			// $('#work-items-window').wrapInner('<div id="work-items-wrap"></div>');

			// $('#work-items-wrap').perfectScrollbar({useBothWheelAxes: true});	

			$('#work-items-window').smoothDivScroll({
				setupComplete: function(){
					$('.scrollWrapper').perfectScrollbar({useBothWheelAxes: true});	
				}
			});
		}	
	});
})(jQuery);