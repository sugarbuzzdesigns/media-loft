var ml = ml || {};

(function($){
	ml.VideoGallery = {
		init: function(){
			// global elms
			this.$win = $(window);
			this.$body = $('body');
			this.$scrollElm = $('html,body');

			// gallery elements
			this.$videoGallery = $('.gallery');
			this.$galleryItems = $('.gallery-item');

			this.numberOfGalleryItems = this.$galleryItems.length;

			// overlay elements
			this.$galleryOverlay = $('.gallery-overlay');
			this.$galleryOverlayItemWrap = $('.gallery-overlay-item');
			this.$galleryOverlayTrans = $('.gallery-overlay-transition');
			this.$overlayVideo = null;
			this.$overlayCopy = $('.gallery-overlay .copy');
			this.$overlayDescription = $('.gallery-overlay .description');
			this.$overlayTitle = $('.gallery-overlay .title');
			this.$overlayCategory = $('.gallery-overlay .category');
			this.$overlayShareLink = $('.gallery-overlay .share-link');
			this.$galleryOverlayVideoWrap = $('.gallery-overlay .video-wrap');

			// overlay button elements
			this.$overlayCloseBtn = $('.close-video');
			this.$videoStartBtn = $('.video-start');
			this.$galleryNav = $('.gallery-overlay nav');
			this.$galleryNavNext = $('.gallery-overlay nav .next');
			this.$galleryNavPrev = $('.gallery-overlay nav .prev');
			// page env info
			this.curScrollPos = 0;

			// url info
			this.currentPath = $.address.path();

			// gallery element that has been clicked to open 
			// in the overly
			this.$currentVideo = null;
			this.overlayVideoPlaying = false;

			// video JS instance for current video
			this.curVideoJs = null;

			// data for current open video
			this.currentVideoData = {};

			// set video URL based on if we are on desktop or mobile
			this.videoPath = ML_vars.device === 'desktop' ? 'desktop-url' : 'mobile-url';

			// if there is only one video
			// we are going to open it right away
			this.checkGalleryCount();

			// open video based on hash
			if(this.currentPath != '/' && this.currentPath){
				this.openVideoFromHash();
			}

			// bind event eg. click
			this.bindEvents();
		},

		checkGalleryCount: function(){
			if(typeof oneGalleryVideo != 'undefined' && oneGalleryVideo){
				this.openVideoInOverlay(this.$galleryItems.eq(0));

				// When we have a single video, let's show 
				// a loader and remove it when it's all done showing.
				// this.closeLoadingScreen();				
			}
		},

		bindEvents: function(){
			var _this = this;

			$.address.change(function(event) {  
				_this.currentPath = event.path;
				// check for #! to go straight work
				// this.checkUrl();	
				console.log(_this.currentPath);			
			});

			ml.elms.$win.on('resize-done', function(){
				_this.setVideoHeight();
			});

			_this.$galleryItems.on('click', function(e){
				e.preventDefault();

				_this.openVideoInOverlay(this);
			});

			_this.$overlayCloseBtn.on('click', function(e){
				e.preventDefault();

				_this.closeVideoInOverlay();
			});

			_this.$videoStartBtn.on('click', function(e){
				e.preventDefault();

				_this.playOverlayVideo();
			});

			_this.$galleryNavNext.on('click', function(e){
				e.preventDefault();

				_this.navigateGalleryOverlay('next');
			});

			_this.$galleryNavPrev.on('click', function(e){
				e.preventDefault();

				_this.navigateGalleryOverlay('prev');
			});			
		},

		openVideoFromHash: function(){
			var $galleryItem = $('[data-deep-link="'+ $.address.pathNames()[0] +'"]');

			this.openVideoInOverlay($galleryItem[0]);
		},

		openVideoInOverlay: function(galleryItem){
			var _this = this;
			// set class on body for open overlay
			// gives us a nice namespace in our css
			_this.$body.addClass('overlay-open');

			// get our current scroll position
			_this.curScrollPos = _this.$win.scrollTop();

			// populate the gallery overlay
			// with the right elements and copy
			_this.populateOverlay(galleryItem);

			_this.$videoGallery.animate({
				opacity: 0
			}, 500, function(){
				_this.$scrollElm.scrollTop(0);
				_this.$videoGallery.hide();

				// _this.$galleryOverlayTrans.animate({opacity: 0}, 200);
				
				_this.$galleryOverlay.fadeIn(function(){
					_this.setVideoHeight();
					_this.showOverlayElements();
					_this.$videoStartBtn.addClass('animate');	
				});
			});

			// this.$galleryOverlayTrans.delay(250).animate({opacity: 1}, 200);

			_this.updateUrl(this.currentVideoData.deepLink);
		},

		closeVideoInOverlay: function(){
			var _this = this;

			// if here
			if(this.overlayVideoPlaying){
				console.log('stop video and return to open state');
				stopAndCloseOverlayVideo();
			} else {
				console.log('close open item completely');
				closeWholeOverlay();
			}

			function stopAndCloseOverlayVideo(){
				_this.curVideoJs.pause();

				_this.overlayVideoPlaying = false;
				_this.setVideoHeight();
			}

			function closeWholeOverlay(){
				_this.$body.removeClass('overlay-open');
				
				_this.currentVideoData = {};
				
				_this.$galleryOverlay.fadeOut(500, function(){
					// _this.$galleryOverlayTrans.animate({opacity: 0}, 200);
					_this.$videoGallery.show();
					_this.$scrollElm.scrollTop(_this.curScrollPos);

					_this.$videoGallery.animate({
						opacity: 1
					});
				});

				// this.$galleryOverlayTrans.delay(250).animate({opacity: 1}, 200);

				_this.$videoStartBtn.removeClass('animate');

				_this.resetOverlay();				
			}	


		},

		populateOverlay: function(galleryItem){
			var $src = $('<source/>');

			// set the current video gallery element
			this.$currentVideo = $(galleryItem);

			// populate data object with data about
			// the current video element
			this.setUpCurrentVideoData();			

			this.$overlayVideo = $('<video class="video-js vjs-default-skin" width="100%" height="100%"></video>');

			this.$overlayDescription.html(this.currentVideoData.description);
			this.$overlayTitle.html(this.currentVideoData.title);
			this.$overlayCategory.html(this.currentVideoData.category);
			this.$overlayShareLink.attr('href', this.currentVideoData.shareLink);

			$src.attr('src', this.currentVideoData.videoUrl);
			$src.appendTo(this.$overlayVideo);

			this.$overlayVideo.attr('id', this.currentVideoData.videoId);
			this.$overlayVideo.attr('poster', this.currentVideoData.poster);

			this.$overlayVideo.appendTo(this.$galleryOverlayVideoWrap);

			this.initVideo();
		},  

		setVideoHeight: function(){
			var copyHeight = this.$overlayCopy.outerHeight(),
				navHeight = this.$galleryNav.outerHeight(),
				winHeight = this.$win.outerHeight(),
				videoHeight = winHeight - (copyHeight + navHeight);

			if(this.overlayVideoPlaying){
				this.$galleryOverlayVideoWrap.height(winHeight);
				console.log('go full height');
			} else {
				this.$galleryOverlayVideoWrap.height(videoHeight);
			}
		},

		resizePage: function(){

		},

		showOverlayElements: function(){
			this.$galleryNav.addClass('galleryFadeIn');
			this.$galleryOverlayItemWrap.addClass('galleryFadeIn');
		},

		hideOverlayElements: function(){
			this.$galleryNav.removeClass('galleryFadeIn');
			this.$galleryOverlayItemWrap.removeClass('galleryFadeIn');
		},		

		dePopulateOverlay: function(){
			this.$overlayVideo.remove();
		},

		setUpCurrentVideoData: function(){
			this.currentVideoData.poster = this.$currentVideo.data('poster-url');
			this.currentVideoData.videoUrl = this.$currentVideo.data(this.videoPath);
			this.currentVideoData.videoId = this.$currentVideo.find('.video-placeholder').data('video-id');
			this.currentVideoData.title = this.$currentVideo.find('.title').html();
			this.currentVideoData.category = this.$currentVideo.find('.category').html();
			this.currentVideoData.shareLink = window.location.href;
			this.currentVideoData.galleryIndex = this.$currentVideo.data('item-index');
			this.currentVideoData.deepLink = this.$currentVideo.data('deep-link');

			this.currentVideoData.description = this.$currentVideo.find('.description').html();
		},

		initVideo: function(){
			var _this = this;

			videojs(_this.currentVideoData.videoId, {
				'controls': true
			}, function(){
				_this.curVideoJs = this;
				console.log('init video: ', _this.curVideoJs.pause);
			});	
		},

		playOverlayVideo: function(){
			this.overlayVideoPlaying = true;

			this.$galleryOverlay.addClass('play-video');
			this.$galleryOverlayVideoWrap.css({height: this.$win.outerHeight()});
			
			this.curVideoJs.play();
		},

		navigateGalleryOverlay: function(dir){
			var _this = this, videoId, $galleryItemToShow;

			this.hideOverlayElements();

			if(dir === 'next'){
				// do next stuff
				if(this.currentVideoData.galleryIndex + 1 > this.numberOfGalleryItems){
					$galleryItemToShow = this.getGalleryItemByIndex(1);
				} else {
					$galleryItemToShow = this.getGalleryItemByIndex(this.currentVideoData.galleryIndex + 1);
				}
			} else {
				// do prev stuff
				if (this.currentVideoData.galleryIndex - 1 === 0) {
					$galleryItemToShow = this.getGalleryItemByIndex(this.numberOfGalleryItems);
				} else {
					$galleryItemToShow = this.getGalleryItemByIndex(this.currentVideoData.galleryIndex - 1);
				}
			}

			if(this.overlayVideoPlaying){
				_this.curVideoJs.pause();
				_this.overlayVideoPlaying = false;
				_this.setVideoHeight();
			}

			this.$galleryOverlayItemWrap.animate({
				opacity: 0
			}, 500, function(){
				_this.resetOverlay();
				_this.populateOverlay($galleryItemToShow);
				_this.updateUrl(_this.currentVideoData.deepLink);
				_this.showOverlayElements();
			});			

			// this.$galleryOverlayItemWrap.delay(250).animate({
			// 	opacity: 1
			// });
		},

		getGalleryItemByIndex: function(index){
			return $('.gallery-item[data-item-index="'+ index +'"');
		},

		resetOverlay: function(){
			this.resetUrl();
			this.curVideoJs.dispose();
			this.$galleryOverlay.removeClass('play-video');
		},

		closeLoadingScreen: function(){
			$('#gallery-loader').fadeOut();
		},

		updateUrl: function(deepLink){
			window.location.hash = '#!/' + deepLink;
		},

		resetUrl: function(){
			window.location.hash = '#!/';
		},		
	}

	// Doc Ready
	$(function(){
		ml.VideoGallery.init();
	});
})(jQuery);
