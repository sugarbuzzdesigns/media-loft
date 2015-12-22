(function($, globals){

	ml.home = {
		init: function(){
			this.$videoOverlay = $('#home-video-overlay');

			this.bindEvents();
			this.initVideos();
		},
		
		bindEvents: function(){
			var _this = this;

			$('.play-reel, .blur-overlay').on('click', function(e){
				e.preventDefault();

				_this.playHomeVideo();
			});	

			$('.close-video').on('click', function(e){
				e.preventDefault();

				_this.closeHomeVideo();
			});									
		},

		initVideos: function(){
			if (ML_vars.isMobile != '1') {
				this.bgVideo = videojs('home-video-loop');
			} else {
				console.log('mobile, don\'t init.');
			}

			this.overlayVideo = videojs('home-video-full');
		},

		playHomeVideo: function(){
			var _this = this;

			this.$videoOverlay.addClass('show-me');
			
			if (this.bgVideo) {
				this.bgVideo.pause();
			};
			
			this.overlayVideo.play();
			this.overlayVideo.on('ended', function(){
				_this.closeHomeVideo();
			});
		},	

		closeHomeVideo: function(){
			if (this.bgVideo) {
				this.bgVideo.play();
			};
			
			this.$videoOverlay.removeClass('show-me');
			this.overlayVideo.pause();								
		}
			
	}

	$(function(){
		ml.home.init();
	});

})(jQuery, window);