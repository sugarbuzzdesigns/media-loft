(function($){

	ml.home = {
		init: function(){
			this.$videoOverlay = $('#home-video-overlay');
			this.$homeFullVideo = $('#home-video-full');

			this.bindEvents();
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
			return;
			var _this = this;

			this.$videoOverlay.addClass('show-me');
			this.$homeFullVideo[0].play();
			this.$homeFullVideo.on('ended', function(){
				_this.closeHomeVideo();
			});
		},	

		closeHomeVideo: function(){
			this.$videoOverlay.removeClass('show-me');
			this.$homeFullVideo[0].pause();								
		}
			
	}

	$(function(){
		ml.home.init();
	});

})(jQuery);