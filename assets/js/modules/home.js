(function($, globals){

	ml.home = {
		init: function(){
			this.$videoOverlay = $('#home-video-overlay');
			this.$homeFullVideo = $('#home-video-full');

			this.bindEvents();

			this.bgVideo = videojs('home-video-loop');
			this.overlayVideo = videojs('home-video-full');
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

		playHomeVideo: function(){
			var _this = this;

			this.$videoOverlay.addClass('show-me');
			
			this.bgVideo.pause();
			this.overlayVideo.play();
			this.overlayVideo.on('ended', function(){
				_this.closeHomeVideo();
			});
		},	

		closeHomeVideo: function(){
			this.bgVideo.play();
			
			this.$videoOverlay.removeClass('show-me');
			this.overlayVideo.pause();								
		}
			
	}

	$(function(){
		ml.home.init();
	});

})(jQuery, window);