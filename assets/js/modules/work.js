(function($){

	ml.Work = {

		init: function(){
			// cache some often used elements
			this.$workItemsContainer = $('#work-items');
			this.$workItems = $('.work-item');
			this.$workCarousels = $('.work-carousel');
			this.numWorkItems = 0;
			this.$mouseWheelElm = $('.scrollWrapper');

			this.scrollTopPos = 0;

			this.curCarouselItem = 0;

			this.$itemInView = $('.work-item').eq(0);

			this.currentWorkItem = '';
			this.filterCat = '';
			
			if(ML_vars.device != 'mobile'){
				this.setupWorkPage();
			}

			this.setupDescription();
			
			this.buildWorkCarousels();
			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;

			// $.address.init(function(event) {  
			// 	ml.currentPath = event.path;
			// 	console.log('init');
			// });  	

			$.address.change(function(event) {  
				_this.currentPath = event.path;
				// check for #! to go straight work
				// this.checkUrl();				
				_this.checkUrl(event);
			});			
			// WORK PAGE - work items click handler
			_this.$workItems.on('click', function(){
				var workItemId = $(this).attr('id');

				if(!$(this).hasClass('show-details')){
					// _this.openWorkItem(workItemId);
					// _this.startWorkVideoLoop(workItemId);
					_this.updateUrl(workItemId);
				}
			});

			if(ML_vars.device != 'mobile'){
				_this.$workItems.hover(function(){
						$(this).find('.work-item-bg').fadeOut();
						$(this).find('.work-item-bg-hover').fadeIn();
					},
					function(){
						$(this).find('.work-item-bg').fadeIn();
						$(this).find('.work-item-bg-hover').fadeOut();
					}
				);
			}				

			$('.work-carousel .close').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				
				var workItemId = $(this).closest('.work-item').attr('id');

				_this.closeWorkItem(workItemId);
				_this.resetUrl();
			});

			$('.carousel-image').mouseover(function(){
				$(this).addClass('hovered');
			});

			$('.work-media .video-bg-container').mouseover(function(){
				console.log('mouseover');
				$(this).addClass('hovered');
			});			

			$('.carousel-image, .work-media .video-bg-container').mouseout(function(){
				$(this).removeClass('hovered');
			});			

			$('.carousel-arrow-nav a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				_this.navigateCarouselPrevNext($(this));				
			});

			$('.related-work').on('click', function(e){
				e.stopPropagation();

				_this.openRelatedWork(this);
			});

			$(document).keydown(function(e){
				if(_this.currentWorkItem === ''){ return; }

				var $curWorkitem = $('#'+_this.currentWorkItem),
					curCarouselItem = $curWorkitem.find('.carousel-item')[_this.curCarouselItem];

			    if (e.keyCode == 37) { 
			       console.log( "left pressed" );

			       $('.prev', $(curCarouselItem)).click();

			       return false;
			    }

			    if (e.keyCode == 39) { 
			       console.log( "right pressed" );

					$('.next', $(curCarouselItem)).click();

			       return false;
			    }		

			    if (e.keyCode == 27) { 
					_this.closeWorkItem(_this.currentWorkItem);

			       return false;
			    }
			});			

			$('.right-menu a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				_this.filterWork(this);

				if(ML_vars.device === 'mobile'){
					setTimeout(function(){
						$('body').removeClass('right-menu-open');
					}, 400);
						
					$('html', 'body').animate({scrollTop: 0}, 500);
					console.log('scroll to top');
				}
			});
		
			$('.carousel-image').on('click', function(){
				var $curWorkitem = $('#'+_this.currentWorkItem),
					curCarouselItem = $curWorkitem.find('.carousel-item')[_this.curCarouselItem];

				$('.next', $(curCarouselItem)).click();					
			});

			$("#work-items-window").mousewheel(function(event, delta) {
				this.scrollLeft -= (delta);
				event.preventDefault();
			});		

			$('.work-copy .category').on('click' , function(e){
				e.stopPropagation();

				var categoryText = $(this).text();

				_this.closeWorkItem(_this.currentWorkItem);
				_this.filterWork($('[data-filter-cat="'+ categoryText +'"]')[0]);
				_this.resetUrl();
			});	

			$('#work-menu-btn .open-menu').click(function(e){
				e.preventDefault();

				$('body').addClass('right-menu-open');
			});

			$('#work-menu-btn .close-menu').click(function(e){
				e.preventDefault();

				$('body').removeClass('right-menu-open');
			});			
		},

		setupWorkPage: function(){
			var workItemWidth = this.$workItems.outerWidth(),
				numWorkItems = this.$workItems.length,
				workItemsContainerWidth = workItemWidth*numWorkItems;
		
			$('#work-items-window').css({
				width: $(window).width(),
				height: $(window).height(),
			});

			$('#work-items').css({
				height: $(window).height(),
				left: -workItemsContainerWidth + 'px'
			});

			this.workItemWidth = workItemWidth;
			this.workItemsContainerWidth = workItemsContainerWidth;
			this.numWorkItems = numWorkItems;

			this.$workItems.css('width', workItemWidth);
			this.$workItemsContainer.addClass('loaded').css('width', workItemsContainerWidth);

			// $("#work-items-window").smoothDivScroll({
			// 	setupComplete: function(){
			// 		$('.scrollWrapper').css({
			// 			'width': $(window).width(),
			// 			'overflow': 'scroll'
			// 		});
			// 		console.log('complete');
			// 	}
			// });				
			this.$workItems.show();

			setTimeout(function(){
				$('#work-items').css({
					left: 0
				});
			}, 500);
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

		resizeWorkPage: function(){
			var	winWidth = $(window).width(),
				winHeight = $(window).height(),
				itemWidth = winWidth/4,
				winMinWidth1 = 1200,
				winMinWidth2 = 875,
				containerWidth;

				if (winWidth < winMinWidth1) {
					itemWidth = winWidth/3;
				}

				if (winWidth < winMinWidth2) {
					itemWidth = winWidth/2;
				}		

			this.workItemWidth = itemWidth;

			if($('.work-item.show-details').length > 0){
				containerWidth = '100%';
			} else {
				containerWidth = itemWidth*this.numWorkItems;
			}

			this.$workItemsContainer.css('height', winHeight);
			this.$workItemsContainer.css('width', containerWidth);
			$('#work-items-window').css('height', winHeight);
			$('#work-items-window').css('width', winWidth);

			$('.work-item').not('.show-details').css('width', itemWidth);
			$('.work-item.show-details').css('width', '100%');
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

		navigateCarouselPrevNext: function($navButton){
				var $curWorkitem = $('#' + this.currentWorkItem),
					$curCarousel = $('.work-carousel', $curWorkitem),
					firstCarouselitem = $curCarousel.find('.carousel-item')[0];

				if($navButton.is('.prev') && this.curCarouselItem === 0){
					this.closeWorkItem(this.currentWorkItem);
					this.resetUrl();
					return;
				}

				if($navButton.is('.disabled')){
					console.log('cant go that way');
					return;
				} 

				if($navButton.is('.prev')){
					// try prev
					console.log('prev');
					$('.carousel-nav .active', $curCarousel).removeClass('active');

					this.curCarouselItem--;
					$('.carousel-nav li', $curCarousel).eq(this.curCarouselItem).addClass('active');

					var curIndex = $navButton.closest('.carousel-item').index();

					$navButton.closest('.carousel-item').hide();
					$navButton.closest('.carousel-item').prev().show();

					// if (curIndex === 1) { 
					// 	console.log('disable it');
					// 	 $(firstCarouselitem).find('.prev').addClass('disabled');
					// 	return; 
					// };

					console.log($navButton.closest('.carousel-item').index());
				}

				if($navButton.is('.next')){
					// try next
					console.log('next');
					$('.carousel-nav .active', $curCarousel).removeClass('active');

					this.curCarouselItem++;
					$('.carousel-nav li', $curCarousel).eq(this.curCarouselItem).addClass('active');

					$('.prev', $curWorkitem).removeClass('disabled');

					$navButton.closest('.carousel-item').hide();
					$navButton.closest('.carousel-item').next().show();

					if($navButton.closest('.carousel-item').next().is('.related-content')){
						$navButton.closest('.carousel-item').next().find('.next').addClass('disabled');
						return;
					}					
				}	
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

		resetUrl: function(){
			window.location.hash = '#!/';
		},

		hideRightNav: function(){
			$('.right-menu').addClass('go-away');
		},	

		showRightNav: function(){
			$('.right-menu').removeClass('go-away');
		},	

		filterWork: function(filterLink){
			var _this = this,
				filterCat = $(filterLink).data('filter-cat'),
				worksInCat = $('[data-category="' + filterCat +'"]'),
				numWorkInCat = worksInCat.length,
				workItemsWidth = this.workItemWidth * numWorkInCat,
				worksToHide = $('.work-item').not(worksInCat);

			if(numWorkInCat === 1){
				this.openWorkItem(worksInCat.attr('id'));
				this.updateUrl(worksInCat.attr('id'));
				worksInCat.show();
				return;
			}

			_this.filterCat = filterCat;

			$(filterLink).parent().addClass('active');
			$(filterLink).parent().siblings().removeClass('active');

			if(numWorkInCat < 4 && filterCat != 'all'){
				workItemsWidth = this.workItemWidth*4;
			}

			if(filterCat === 'all'){
				workItemsWidth = this.$workItems.length * this.workItemWidth;
			}
			
			$('#work-items').css('width', workItemsWidth);	

			console.log(workItemsWidth);

			if (filterCat === 'all') {
				$('.work-item').show();

				return;
			};	

			this.filterCat = filterCat;

			worksToHide.hide();
			worksInCat.show();
		},		

		openWorkItem: function(workItemId){
			var $thisWorkItem = $('#' + workItemId),
				$loopVideo = $('.work-loop-video', $thisWorkItem);

			this.scrollTopPos = $thisWorkItem.index() * $(window).height();

			$('#work-items-window').unmousewheel();

			// prob don't need to pause the work video
			// this.currentVideo = loopVideo;
			this.currentWorkItem = workItemId;				

			if($loopVideo.length > 0){
				$loopVideo[0].play();
				ml.Work.video.currentVideo = $loopVideo[0];
			}

			this.hideRightNav();
			this.$workItemsContainer.css('width', '100%');
			$('.scrollableArea').css('width', '100%');
			$('.scrollingHotSpotLeft, .scrollingHotSpotRight').css('top', '-100%');

			$thisWorkItem
				.css('width', '100%')
				.addClass('show-details');

			this.$workItems.not('.show-details').css('display', 'none');
		},

		openRelatedWork: function(relatedWork){
			var relatedWorkId = $(relatedWork).data('href');

			this.closeWorkItem(this.currentWorkItem);
			this.openWorkItem(relatedWorkId);

			this.updateUrl(relatedWorkId);
		},

		closeWorkItem: function(workItemId){
			var $thisWorkItem = $('#' + workItemId);

			$("#work-items-window").mousewheel(function(event, delta) {
				this.scrollLeft -= (delta);
				event.preventDefault();
			});			

			if(ml.Work.video.currentVideo !== ''){
				ml.Work.video.currentVideo.pause();
			}

			$thisWorkItem
				.css('width', this.workItemWidth)
				.removeClass('show-details');

			this.$workItems.css('display', 'block');
			this.$workItemsContainer.css('width', this.workItemsContainerWidth);
			$('.scrollableArea').css('width', this.workItemsContainerWidth);
			$('.scrollingHotSpotLeft, .scrollingHotSpotRight').css('top', '-100%');

			this.showRightNav();

			if(this.filterCat != ''){
				var filterCatLink = $('[data-filter-cat="' + this.filterCat + '"]');

				this.filterWork(filterCatLink);
			}
			this.currentWorkItem = '';

			if(ML_vars.device != 'mobile'){
				this.resetWorkItem($thisWorkItem);
			} else {
				$('#work-items-window').scrollTop(this.scrollTopPos);
			}
		},

		resetWorkItem: function($workItem){
			$workItem.find('.carousel-item').eq(0).show().siblings().hide();
			$workItem.find('.carousel-nav li').eq(0).addClass('active').siblings().removeClass('active');

			this.curCarouselItem = 0;
		},

		startWorkVideoLoop: function(workItemId){
			var $thisWorkItem = $('#' + workItemId),
				loopVideo = $('.work-loop-video', $thisWorkItem)[0];

			loopVideo.play();
		},

		getClosestSection: function($section){
			var scrollPos = $('#work-items-window').scrollTop(),
				closest = $section.first();
				// distance = Math.abs(closest.offset().top - scrollPos);

			$section.each(function(){
				var distanceFromScreenTop = Math.abs($(this).offset().top - scrollPos);

				if(distanceFromScreenTop < Math.abs(closest.offset().top - scrollPos)){
					closest = $(this);
				}
			});

			this.closestSection = closest;

			console.log(closest);
		},
		scrollToClosestSection: function($scrollItem){
			var scrollPos = this.closestSection.index() * $(window).height();

			$scrollItem.animate({
				scrollTop: scrollPos
			});

			debugger;
		} 				
	}

	ml.Work.video = {
		init: function(){
			this.currentVideo = '';
			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;
			// Play full screen videos
			$('.video-bg-container ').on('click', function(){
				_this.playFullVideo($(this));
			});	

			$('.close-video').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				_this.stopVideo();
				_this.closeVideo();
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

			_this.currentVideo = $video[0];

			$('.work-loop-video', $currentWorkItem).css('opacity', 0); 
			$('.work-full-video', $currentWorkItem).show().css('opacity', 1);

			$('.work-carousel .close').addClass('show-video');
			$('.show-details .work-details').addClass('show-video');
			$('#main-logo, .main-menu-btn, .carousel-nav').addClass('show-video');

			if(ML_vars.device === 'mobile'){
				$playBtn.fadeOut();
			}

			$video[0].play();
			$video.data('started', true);

			$video.on('pause', function(){
				if(ML_vars.device === 'mobile'){
					$playBtn.fadeIn();
					$video.hide();
				}				
			});
		},

		stopVideo: function(){
			this.currentVideo.pause();		
		},

		closeVideo: function(){
			$('.work-carousel .close').removeClass('show-video');
			$('.show-details .work-details').removeClass('show-video');
			$('#main-logo, .main-menu-btn, .carousel-nav').removeClass('show-video');
		}
	}	

	$(function(){
		ml.Work.init();
		ml.Work.video.init();

        // $("#work-items-window").mCustomScrollbar({
        // 	axis:"x"
        // });

		// $('#work-items-window').jScrollPane();

		  //   $(window).swipe({
		  //     //Generic swipe handler for all directions
		  //     swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
		  //     	var scrollTo = ml.Work.$itemInView.next().index() * $(window).height();

		  //       if(direction === 'up'){
		  //       	console.log('up');
		  //       	$('#work-items-window').animate({
		  //       		scrollTop: scrollTo
		  //       	});

				// 	ml.Work.$itemInView = ml.Work.$itemInView.next();
		  //       }

				// if(direction === 'down'){
				// 	console.log(ml.Work.$itemInView);

				// 	if(ml.Work.$itemInView.index() === 0){
				// 		return;
				// 	}

				// 	var scrollTo = ml.Work.$itemInView.prev().index() * $(window).height();
		        	
		  //       	console.log(scrollTo);
		        	
		  //       	$('#work-items-window').animate({
		  //       		scrollTop: scrollTo
		  //       	});

		  //       	ml.Work.$itemInView = ml.Work.$itemInView.prev();
		  //       }	          
		  //     },
		  //     //Default is 75px, set to 0 for demo so any distance triggers swipe
		  //      threshold:0
		  //   });

		// $('#work-items-window').on('scrollstop', function(){
		// 	if(ML_vars.device === 'mobile' || ML_vars.device === 'tablet'){
		// 		ml.Work.getClosestSection($('.work-item'));
		// 		// ml.Work.scrollToClosestSection($('#work-items-window'));
		// 	}
		// });
			
		$(window).on('resizeEnd', function(){
			console.log('hey resized');
			if(ML_vars.device != 'mobile'){
				ml.Work.resizeWorkPage();
			}
		});		
	});
})(jQuery);