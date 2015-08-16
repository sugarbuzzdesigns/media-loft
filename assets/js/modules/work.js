(function($){

	ml.Work = {

		init: function(){
			// cache some often used elements
			this.$workItemsContainer = $('#work-items');
			this.$workItems = $('.work-item');
			this.$workCarousels = $('.work-carousel');

			this.currentWorkItem = '';
			this.filterCat = '';
			
			if(ml.env != 'mobile'){
				this.setupWorkPage();
			}
			
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

				if($(this).not('.show-details')){
					_this.openWorkItem(workItemId);
					// _this.startWorkVideoLoop(workItemId);
					_this.updateUrl(workItemId);
				}
			});

			$('.work-carousel .close').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				
				var workItemId = $(this).closest('.work-item').attr('id');

				_this.closeWorkItem(workItemId);
				_this.resetUrl();
			});

			$('.carousel-image, .work-video').mouseover(function(){
				$(this).addClass('hovered');
			});

			$('.right-menu a').on('click', function(e){
				e.preventDefault();

				_this.filterWork(this);
			});

			$("#work-items-window").mousewheel(function(event, delta) {
				this.scrollLeft -= (delta);
				event.preventDefault();
			});

		},

		setupWorkPage: function(){
			console.log('setupWorkPage');
			var workItemWidth = this.$workItems.outerWidth(),
				numWorkItems = this.$workItems.length,
				workItemsContainerWidth = workItemWidth*numWorkItems;

			this.workItemWidth = workItemWidth;
			this.workItemsContainerWidth = workItemsContainerWidth;

			this.$workItems.css('width', workItemWidth);
			this.$workItemsContainer.addClass('loaded').css('width', workItemsContainerWidth);

			// CursorDivScroll('work-items-window', 40).noVertical();
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
			$('.carousel-nav li').on('click', function(){
				var $this = $(this),
					index = $this.index(),
					$items = $(this).closest('.carousel-nav').siblings('.carousel-items'),
					slideToShow = $('.carousel-item', $items)[index];

					$this.addClass('active').siblings().removeClass('active')

					$(slideToShow).show().siblings().hide();
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
			console.log('open work item');
			var $thisWorkItem = $('#' + workItemId),
				$loopVideo = $('.work-loop-video', $thisWorkItem);

			// prob don't need to pause the work video
			// this.currentVideo = loopVideo;
			this.currentWorkItem = workItemId;				

			if($loopVideo.length > 0){
				$loopVideo[0].play();
			}

			this.hideRightNav();
			this.$workItemsContainer.css('width', '100%');

			$thisWorkItem
				.css('width', '100%')
				.addClass('show-details');

			this.$workItems.not('.show-details').css('display', 'none');
		},

		closeWorkItem: function(workItemId){
			var $thisWorkItem = $('#' + workItemId);

			$thisWorkItem
				.css('width', this.workItemWidth)
				.removeClass('show-details');

			this.$workItems.css('display', 'block');
			this.$workItemsContainer.css('width', this.workItemsContainerWidth);

			this.showRightNav();
		},

		startWorkVideoLoop: function(workItemId){
			var $thisWorkItem = $('#' + workItemId),
				loopVideo = $('.work-loop-video', $thisWorkItem)[0];

			loopVideo.play();
		}		
	}

	ml.Work.video = {
		init: function(){
			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;
			// Play full screen videos
			$('.play-full-screen').on('click', function(){
				_this.playFullVideo(this);
			});	

			$('.close-video').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				_this.stopVideo();
				_this.closeVideo();
			});
		},

		playFullVideo: function(playBtn){console.log('play full video');
			var _this = this,
				$playBtn = $(playBtn),
				videoId = $playBtn.data('video'),
				$video = $('#' + videoId),
				$currentWorkItem = $('#' + ml.Work.currentWorkItem),
				videoSrc = $('source', $video).data('src');

				if(!$video.data('started')){
					$video.attr('src', videoSrc);
				}


			_this.currentVideo = $video[0];

			console.log();

			$('.work-loop-video', $currentWorkItem).css('opacity', 0); 
			$('.work-full-video', $currentWorkItem).show().css('opacity', 1);

			$('.work-carousel .close').addClass('show-video');
			$('.show-details .work-details').addClass('show-video');
			$('#main-logo, #main-menu-btn, .carousel-nav').addClass('show-video');

			$video[0].play();
			$video.data('started', true);
		},

		stopVideo: function(){
			this.currentVideo.pause();
		},

		closeVideo: function(){
			$('.work-carousel .close').removeClass('show-video');
			$('.show-details .work-details').removeClass('show-video');
			$('#main-logo, #main-menu-btn, .carousel-nav').removeClass('show-video');
		}
	}	

	$(function(){
		ml.Work.init();
		ml.Work.video.init();
	});
})(jQuery);