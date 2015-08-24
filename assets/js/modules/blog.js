ml.Blog = {};

(function($){
	ml.Blog = {
		init: function(){
			this.currentArticle = '';
			this.currentPath = '';

			this.bindEvents();
		},

		bindEvents: function(){
			_this = this;

			$.address.change(function(event) {  
				_this.currentPath = event.path;
				// check for #! to go straight work
				// this.checkUrl();				
				_this.checkUrl(event);
			});				

			$('.blog-article .header').on('click', function(e){
				e.preventDefault();

				console.log($(this).parent());

				if($(this).parent().is('.show-article')){ return; };

				var id = $(this).parent().attr('id');

				_this.updateUrl(id);
				_this.openArticle(id);
			});	

			$('.related-article').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				var $this = $(this),
					articleId = $this.data('related-article');

				_this.updateUrl(articleId);
				_this.openArticle(articleId);
			});		

			// TODO Make dynamic
			$('.video-start').click(function(e){
				e.preventDefault();
				e.stopPropagation();

				_this.playBlogVideo();
				
			});

			// TODO make dynamic
			$('.close-video').click(function(e){
				e.preventDefault();

				$('video')[0].pause();
				$('video').css('width', 0);
				$('#blog-video-overlay').removeClass('show-me');
			});			
		},

		// TODO Make dynamic
		playBlogVideo: function(){
			$('#blog-video-overlay').addClass('show-me');		

			$('video').css('width', $(window).width());

			$('video').on('canplay', function(){
				$('video')[0].play();
			});
		},

		updateUrl: function(blogArticleId){
			window.location.hash = '#!/' + blogArticleId;
		},

		checkUrl: function(event){
			var _this = this,
				articleId = '';

				console.log(_this.currentPath);

			if(_this.currentPath === '/'){
				if (_this.currentArticle != '') {
					// reset the work page
					console.log(_this.currentArticle);
					_this.closeArticle(_this.currentArticle);
				};

				return;
			} else {
				articleId = _this.currentPath.replace('/', '');
				_this.openArticle(articleId);
			}
		},
		openArticle: function(articleId){
			var $article = $('#' + articleId),
				group = $article.parent(),
				groupSiblings = group.siblings('.group');

			groupSiblings.hide();
			$article.siblings().hide();

			$article.addClass('show-article').show();

			this.currentArticle = $article;

			$('html, body').animate({scrollTop: 0}, 0);

			// console.log($('article').not('.show-article').addClass('hide-me'));
			// console.log($(entry).parent().find('.article-content'));
		},
		closeArticle: function($article){
			var group = $article.parent(),
				groupSiblings = group.siblings('.group');

			groupSiblings.show();
			$article.siblings().show();

			$article.removeClass('show-article');

			this.currentArticle = '';
		}			
	}

	$(function(){
		ml.Blog.init();
	});

})(jQuery);