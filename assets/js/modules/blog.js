ml.Blog = {};

(function($){
	ml.Blog = {
		init: function(){
			this.currentArticle = '';
			this.currentPath = '';

			this.setUpSocialLinks();

			this.setUpUrl();

			this.bindEvents();
		},

		setUpUrl: function(){
			var referrer = document.referrer;

			if(referrer === 'https://www.facebook.com/'){
				this.updateUrl(window.location.hash.substr(3));
			}
		},

		bindEvents: function(){
			_this = this;

			$.address.change(function(event) {  
				_this.currentPath = event.path;
				// check for #! to go straight work
				// this.checkUrl();				
				_this.checkUrl(event);
			});				

			$('.blog-article .header').on('click touchend', function(e){
				e.preventDefault();

				if (ML_vars.isTouch) {
					console.log('log touch evice');
				};

				console.log($(this).parent());

				if($(this).parent().is('.show-article')){ return; };

				var id = $(this).parent().attr('id');

				_this.updateUrl(id);
				_this.openArticle(id);
			});	

			$('.related-article').on('click touchend', function(e){
				e.preventDefault();
				e.stopPropagation();

				var $this = $(this),
					articleId = $this.data('related-article');

				_this.updateUrl(articleId);
				_this.openArticle(articleId);
			});		

			// TODO Make dynamic
			$('.video-start').on('click touchend', function(e){
				e.preventDefault();
				e.stopPropagation();

				_this.playBlogVideo();
				
			});

			// TODO make dynamic
			$('.close-video').on('click touchend', function(e){
				e.preventDefault();

				$('video')[0].pause();
				$('video').css('width', 0);
				$('#blog-video-overlay').removeClass('show-me');
			});			
		},

		setUpSocialLinks: function(){
			$('.blog-article .social a').each(function(i, link){
				var url = $(link).data('url'),
					title = $(link).data('title');

				if($(link).is('.twitter')){
					$(link).attr('href', 'http://twitter.com/intent/tweet?status='+ encodeURIComponent(title) + '+' + encodeURIComponent(ML_vars.homes+url));
				} else {
					$(link).attr('href', 'http://www.facebook.com/sharer/sharer.php?u=http://ml.dev&title=' + encodeURIComponent(title));
					$(link).on('click', function(e){
						e.preventDefault();
						var windowObjectReference = window.open($(link).attr('href'), 'facebook share', "resizable,height=500,width=500");
					});
				}
			});
		},

		// TODO Make dynamic
		playBlogVideo: function(){
			$('#blog-video-overlay').addClass('show-me');		

			$('video').css('width', $(window).width());

			$('video')[0].play();

			// $('video').on('canplay', function(){
			// 	console.log('play me');
			// 	$('video')[0].play();
			// });
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

			$('body').addClass('article-open');

			$('#blog').addClass('show-article');

			groupSiblings.hide();
			$article.siblings().removeClass('show-article').hide();

			$article.addClass('show-article').show();

			this.currentArticle = $article;

			$('html, body').animate({scrollTop: 0}, 0);

			// console.log($('article').not('.show-article').addClass('hide-me'));
			// console.log($(entry).parent().find('.article-content'));
		},
		closeArticle: function($article){
			var group = $article.parent(),
				groupSiblings = group.siblings('.group');

			$('body').removeClass('article-open');	

			$('#blog').removeClass('show-article');

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