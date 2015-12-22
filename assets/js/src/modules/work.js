/*!
 * tap.js
 * Copyright (c) 2015 Alex Gibson 
 * https://github.com/alexgibson/tap.js/
 * Released under MIT license
 */

/* global define, module */
(function (global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return (global.Tap = factory(global, global.document));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(global, global.document);
    } else {
        global.Tap = factory(global, global.document);
    }
}(typeof window !== 'undefined' ? window : this, function (window, document) {
    'use strict';

    function Tap(el) {
        this.el = typeof el === 'object' ? el : document.getElementById(el);
        this.moved = false; //flags if the finger has moved
        this.startX = 0; //starting x coordinate
        this.startY = 0; //starting y coordinate
        this.hasTouchEventOccured = false; //flag touch event
        this.el.addEventListener('touchstart', this, false);
        this.el.addEventListener('mousedown', this, false);
    }

    // return true if left click is in the event, handle many browsers
    Tap.prototype.leftButton = function(event) {
        // modern & preferred:  MSIE>=9, Firefox(all)
        if ('buttons' in event) {
           // https://developer.mozilla.org/docs/Web/API/MouseEvent/buttons
           return event.buttons === 1;
        } else {
           return 'which' in event ?
               // 'which' is well defined (and doesn't exist on MSIE<=8)
               // https://developer.mozilla.org/docs/Web/API/MouseEvent/which
               event.which === 1 :
               // for MSIE<=8 button is 1=left (0 on all other browsers)
               // https://developer.mozilla.org/docs/Web/API/MouseEvent/button
               event.button === 1;
        }
        return false;
    };

    Tap.prototype.start = function(e) {
        if (e.type === 'touchstart') {

            this.hasTouchEventOccured = true;
            this.el.addEventListener('touchmove', this, false);
            this.el.addEventListener('touchend', this, false);
            this.el.addEventListener('touchcancel', this, false);

        } else if (e.type === 'mousedown' && this.leftButton(e)) {

            this.el.addEventListener('mousemove', this, false);
            this.el.addEventListener('mouseup', this, false);
        }

        this.moved = false;
        this.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        this.startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    };

    Tap.prototype.move = function(e) {
        //if finger moves more than 10px flag to cancel
        var x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        var y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        if (Math.abs(x - this.startX) > 10 || Math.abs(y - this.startY) > 10) {
            this.moved = true;
        }
    };

    Tap.prototype.end = function(e) {
        var evt;

        this.el.removeEventListener('touchmove', this, false);
        this.el.removeEventListener('touchend', this, false);
        this.el.removeEventListener('touchcancel', this, false);
        this.el.removeEventListener('mouseup', this, false);
        this.el.removeEventListener('mousemove', this, false);

        if (!this.moved) {
            //create custom event
            try {
                evt = new window.CustomEvent('tap', {
                    bubbles: true,
                    cancelable: true
                });
            } catch (e) {
                evt = document.createEvent('Event');
                evt.initEvent('tap', true, true);
            }

            //prevent touchend from propagating to any parent
            //nodes that may have a tap.js listener attached
            e.stopPropagation();

            // dispatchEvent returns false if any handler calls preventDefault,
            if (!e.target.dispatchEvent(evt)) {
                // in which case we want to prevent clicks from firing.
                e.preventDefault();
            }
        }
    };

    Tap.prototype.cancel = function() {
        this.hasTouchEventOccured = false;
        this.moved = false;
        this.startX = 0;
        this.startY = 0;
    };

    Tap.prototype.destroy = function() {
        this.el.removeEventListener('touchstart', this, false);
        this.el.removeEventListener('touchmove', this, false);
        this.el.removeEventListener('touchend', this, false);
        this.el.removeEventListener('touchcancel', this, false);
        this.el.removeEventListener('mousedown', this, false);
        this.el.removeEventListener('mouseup', this, false);
        this.el.removeEventListener('mousemove', this, false);
    };

    Tap.prototype.handleEvent = function(e) {
        switch (e.type) {
            case 'touchstart': this.start(e); break;
            case 'touchmove': this.move(e); break;
            case 'touchend': this.end(e); break;
            case 'touchcancel': this.cancel(e); break;
            case 'mousedown': this.start(e); break;
            case 'mouseup': this.end(e); break;
            case 'mousemove': this.move(e); break;
        }
    };

    return Tap;
}));

/*!
 * jQuery special event "tap" using tap.js
 * Released under MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'tap'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('tap'));
    } else {
        factory(jQuery, Tap);
    }
}(function ($, Tap) {
    'use strict';

    $.event.special.tap = (function () {

        // Fallback to click events in old IE
        if (!document.addEventListener) return { bindType: 'click', delegateType: 'click' };

        var dataKey = 'tap.js';

        return {
            setup: function () {
                $.data(this, dataKey, new Tap(this));

                return false;
            },
            teardown: function () {
                var tap = $.data(this, dataKey);
                if (tap && tap.destroy) {
                    tap.destroy();
                    $.removeData(this, dataKey);
                }

                return false;
            }
        };
    }());
}));




(function IIFE($){

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
			this.$workItemStage = $('#work-item-stage');
			this.$curWorkItem = null;
			this.openOnLoad = true;

			this.pIndex = 0;

			this.$workItems.each(function(i, elm){
				$(elm).data('filter-index', i);
			});

			this.workItemsContainerWidth = 0;

			this.currentFullVideo = null;
			this.currentLoopVideo = null;

			this.numWorkItems = this.$workItems.length;

			this.currentIndex = 0;
			this.carouselIndex = 0;

			if(ML_vars.device != 'mobile'){
				this.setUpWorkPage();
			}			

			this.buildWorkCarousels();
			if(ML_vars.device === 'mobile'){
				this.setupDescription();
			}

			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;

			$.address.change(function(event) {  
				_this.currentPath = event.path;
				// check for #! to go straight work
				// this.checkUrl();				
				_this.checkUrl(event);
			});

			_this.$workCover.on('mouseover', function(){
				if($(this).parent().is('#show-gfx')){
					// console.log('hide right hot spot');
					$('.scrollhotspot.right').hide();
				} else {
					// console.log('show right hot spot');
					$('.scrollhotspot.right').show();
				}

				if($(this).parent().is('#target')){
					// console.log('hide left hot spot');
					$('.scrollhotspot.left').hide();
				} else {
					// console.log('show left hot spot');
					$('.scrollhotspot.left').show();
				}				
			});
			
			_this.$workCover.on('click, tap', function(){
				console.log('from work cover click');
				_this.openWorkItem($(this).parent());
				$(this).parent().removeClass('active');
			});



			$('.nav-arrow-down').on('click', function(){
			  	if(!_this.$workItemsWin.is('.item-open')){
			  		_this.summaryScroll('up');
				} else {
					_this.detailsScroll('up');
				}
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

			_this.$closeBtn.on('click', function(e){
				e.stopPropagation();
				e.preventDefault();

				var $item = _this.$curWorkItem;

				_this.closeWorkItem($item);
			});			

			$('.work-media .video-bg-container .play-full-screen').mouseover(function(){
				// console.log('mouseover');
				$(this).closest('.video-bg-container').addClass('hovered');
			});			

			/*
			Video Event Bindings
			 */		
			$('.work-loop-video, .play-full-screen').on('click', function(){
				_this.playFullVideo($(this));
			});	

			$('.close-video').on('click', function(e){
				e.stopPropagation();	
				e.preventDefault();

				_this.closeFullVideo();
			});	

			/*
			Related Work Click
			 */				
			_this.$relatedWork.on('click', function(){
				if($(this).is('.empty')){
					_this.closeWorkItem(_this.$curWorkItem);
					return;
				}

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
			
			$('.description p').swipe({
				swipe:function(event, direction, distance, duration, fingerCount) {
					var $p = $(this),
						$desc = $(this).parent(),
						$descp = $desc.find('p'),
						$nav = $desc.find('.textNav'),
						count = $descp.length;

					// console.log(count);
					// console.log(count-1 === $p.index());
					// 

					if(direction === 'left'){
						if(count-1 === $p.index()){
							return;
						}

						_this.showPrevNextP('next');
					}

					if(direction === 'right'){
						if($p.index() === 0){
							return;
						}

						_this.showPrevNextP('prev');
					}						

					// console.log(direction, $(this).index());
				}
			});

			$(document).keydown(function bindKeyDown(e){
				if(_this.$curWorkItem == null){ return; }

				var curCarouselItem = _this.$curWorkItem.find('.carousel-item')[_this.carouselIndex];

			    if (e.keyCode == 37) { 
					// console.log( "left pressed" );
					_this.navigateCarouselPrevNext($('#work-item-stage .carousel-arrow-nav .prev'));

					return false;
			    }

			    if (e.keyCode == 39) { 
			       	// console.log( "right pressed" );
					_this.navigateCarouselPrevNext($('#work-item-stage .carousel-arrow-nav .next'));

			       	return false;
			    }		

			    if (e.keyCode == 27) { 
					_this.closeWorkItem(_this.$curWorkItem);

			       return false;
			    }
			});					
		},	

		setUpWorkPage: function(){
			var workItemWidth = this.$workItems[0].getBoundingClientRect().width,
				numWorkItems = this.$workItems.length,
				workItemsContainerWidth = workItemWidth*numWorkItems;

			this.workItemWidth = workItemWidth;

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
			this.openOnLoad = false;
			console.log('open work item');
			var _this = this,
				$loopVideo,
				$loopVideoSrc,
				loopVideoSrc;

			// $('.nav-arrow-down').fadeOut();

			$item.siblings().removeClass('open');
			$item.addClass('open');
			_this.$workItemsWin.addClass('item-open');
			_this.$curWorkItem = $item;

			if(ML_vars.device != 'mobile'){
				_this.scrollLeftPos = $('.scrollWrapper').scrollLeft();
				_this.$workItemStage.empty();
				$item.find('.work-details')
					.clone(true, true)
					.appendTo('#work-item-stage');

				if(ML_vars.device != 'tablet'){
					$loopVideo = _this.$workItemStage.find('.work-loop-video');
					$loopVideoSrc = $('<source></source>');
					loopVideoSrc = $loopVideo.data('src');

					$loopVideoSrc.attr('src', loopVideoSrc);

					$loopVideoSrc.appendTo($loopVideo);

					$loopVideo
						.css({
							opacity: 0,
							transition: 'opacity 0.5s ease'
						})
						.attr('id', 'loop-work-video');

					videojs('loop-work-video', {
						'autoplay': true
					}, function(){
						console.log('loop ready');

						_this.currentLoopVideo = this;

						$('#loop-work-video').css({
							opacity: 1,
							transition: 'opacity 0.5s ease'
						});
						$loopVideo.css({opacity: 1});
					});		
				}				

				_this.$workItemStage.animate({
					left: 0
				}, function(){
					$('.scrollhotspot').hide();
					$('.video-start', _this.$workItemStage).addClass('animate');
				});
				_this.$workItemStage.find('.copy-wrap, .carousel-arrow-nav').addClass('slidein');

				$('.scrollableArea').css('width', '100%');		

				_this.$workItemStage.addClass($item.attr('id'));		

				$('.work-copy.overlay', _this.$workItemStage).mCustomScrollbar({
					scrollbarPosition: 'inside'
				});					
			} else {
				_this.setupDescCarouselMobile();
				$('.nav-arrow-down').fadeIn();
			}

			ml.rightMenu.$rightMenu.addClass('go-away');
			ml.rightMenu.$rightMenuBtn.addClass('go-away');

			_this.currentIndex = $item.data('filter-index');
			_this.updateUrl($item.attr('id'));
		},

		closeWorkItem: function($item){
			this.hideReadMore();

			if(this.$curWorkItem.data('filterIndex') != this.$workItems.length - 1){
				$('.nav-arrow-down').fadeIn();
			} else {
				$('.nav-arrow-down').fadeOut();
			}

			$item.removeClass('open');
			this.$workItemsWin.removeClass('item-open');
			ml.elms.$body.removeClass('show-video');

			$('.scrollWrapper').perfectScrollbar('update');

			this.resetWorkItem(this.$curWorkItem);
			this.resetUrl();

			ml.rightMenu.$rightMenu.removeClass('go-away');
			ml.rightMenu.$rightMenuBtn.removeClass('go-away');

			this.$curWorkItem = null;
			this.carouselIndex = 0;

			if(ML_vars.device != 'mobile'){
				$item
					.css('width', this.workItemWidth);

				_this.$workItemsContainer.css('width', this.workItemsContainerWidth);
				$('.scrollableArea').css('width', this.workItemsContainerWidth);	

				$('.scrollWrapper').scrollLeft(this.scrollLeftPos);

				this.$workItemStage.animate({
					left: '-100%'
				}, function(){
					$('.scrollhotspot').show();
				});

				setTimeout(function () {
				    myScroll.refresh();
				}, 300);	

				this.$workItemStage.removeClass($item.attr('id'));	
				this.$workItemStage.empty();		
				
				if (_this.currentLoopVideo != null) {
					_this.currentLoopVideo.dispose();
				};
				
				if (_this.currentFullVideo != null) {
					_this.currentFullVideo.dispose();
				};	
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
			var i = $item.data('filter-index');
			var scrollTo = ml.env.winHeight * i;

			this.scrollWorkSummary(scrollTo);
		},

		summaryScroll: function(direction){
			var _this = this;

			this.$workItemsWin.addClass('scrolled');

		    if(direction === 'down'){
		    	if(_this.currentIndex === 0){ 
		    		return; 
		    	}

		    	if(_this.currentIndex < _this.numWorkItems){ 
		    		$('.nav-arrow-down').fadeIn();
		    	}

		    	_this.currentIndex--;
		    } 

		    if(direction === 'up'){
		    	if(_this.currentIndex === _this.numWorkItems - 1){ 
		    		return; 
		    	}
		    	
		    	if(_this.currentIndex === _this.numWorkItems - 2){ 
		    		$('.nav-arrow-down').fadeOut();
		    	}	    	
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

			    if(_this.carouselIndex >= $carouselItems.length - 1){ 
			    	$('.nav-arrow-down').fadeIn();
			    }
		    } 

		    if(direction === 'up'){
		    	if(_this.carouselIndex === $carouselItems.length - 1){ 
		    		$('.nav-arrow-down').fadeOut();
		    	}

		    	if(_this.carouselIndex === $carouselItems.length){ 
		    		return; 
		    	}
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

			if(this.carouselIndex === 1){
				$('.video-start', this.$curWorkItem).addClass('animate');
			}

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

		resetWorkItem: function($item){
			$item.removeClass('open');
			$item.find('.carousel-item').eq(0).addClass('show-slide').siblings().removeClass('show-slide');
			$item.find('.carousel-nav li').eq(0).addClass('active').siblings().removeClass('active');

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
					$carouselItems.first().addClass('show-slide');

					$carouselItems.each(function(i, elm){
						$('<li></li>').appendTo($carouselNavUl);
					});
				});

				$('li:first-child', $carouselNavUl).addClass('active');
			});

			_this.bindCarouselNavs();

			if(ML_vars.device != 'mobile'){
				this.$workItems.each(function(){
					var $this = $(this);

					if($('.carousel-item:first .work-copy .desc-wrap p', $this).length === 1){
						return;
					}

					var workCopyOverlay = $('.carousel-item:first .work-copy', $this).clone();

					workCopyOverlay.append('<span class="close"><i></i></span>');

					workCopyOverlay.addClass('overlay').appendTo($('.work-carousel .carousel-item:first-child', $this));

					$('.description:first .desc-wrap p:first', $this).after('<span class="readmore">  READ MORE</span>');

					$('.readmore', $this).on('click', function(){
						_this.showReadMore();
					});

					workCopyOverlay.find('.close').on('click', function(){
						_this.hideReadMore();
					});
				});
			}
		},

		showReadMore: function(){
			$('body').addClass('readmore-open');
			this.$workItemStage.addClass('readmore-open');
		},

		hideReadMore: function(){
			$('body').removeClass('readmore-open');
			this.$workItemStage.removeClass('readmore-open');
		},

		bindCarouselNavs: function(){
			_this = this;

			$('.carousel-nav li').on('click', function(e){
				console.log('carousel nav clicked');
				e.stopPropagation();

				var $this = $(this),
					index = $this.index(),
					$curWorkItem = $('#' + _this.curWorkItem),
					$items = $(this).closest('.carousel-nav').siblings('.carousel-items'),
					slideToShow = $('.carousel-item', $items)[index],
					$slidesToHide = $('.carousel-item:gt('+ index +')', $items);

					_this.carouselIndex = index;

					$this.addClass('active').siblings().removeClass('active')

					$(slideToShow).addClass('show-slide');
					$slidesToHide.removeClass('show-slide');

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
			var $curCarousel = $('#work-item-stage .work-carousel'),
				$curCarouselItems = $('.carousel-item', $curCarousel),
				carouselItemsLen = $curCarouselItems.length,
				firstCarouselitem = $curCarousel.find('.carousel-item')[0];

			if($navButton.is('.disabled')){
				return;
			} 

			if($navButton.is('.prev')){
				if(this.carouselIndex === 0) { 
					this.closeWorkItem(this.$curWorkItem);
					this.carouselIndex = 0;
					this.resetUrl();
					return; 
				}

				$curCarouselItems.eq(this.carouselIndex).removeClass('show-slide');
				this.carouselIndex--;
				// this.showPrevNextP('prev');
			}

			if($navButton.is('.next')){
				if(this.carouselIndex === carouselItemsLen - 1) {
					return;
				}

				this.carouselIndex++;
				// this.showPrevNextP('next');
			}	

			$('.carousel-nav .active', $curCarousel).removeClass('active');
			$('.carousel-nav li', $curCarousel).eq(this.carouselIndex).addClass('active');

			$curCarouselItems.eq(this.carouselIndex).addClass('show-slide');

			if($curCarouselItems.eq(this.carouselIndex).is('.related-content')){
				this.$workItemStage.find('.next').addClass('disabled');
			} else {
				this.$workItemStage.find('.next').removeClass('disabled');
			}
		},	

		showPrevNextP: function(dir){
			var $itemContainer = ML_vars.device === 'mobile' ? this.$curWorkItem : this.$workItemStage;
			var desc = $itemContainer.find('.description').eq(0);
			var descWrap = desc.find('.desc-wrap');
			var pToShow = desc.find('p').eq(this.carouselIndex);
			var pToHide = desc.find('p').eq(this.carouselIndex - 1);

			if($itemContainer.find('.carousel-item').length <= 2 && ML_vars.device != 'mobile'){
				return;
			}

			if(dir === 'prev'){
				pToHide = desc.find('p').eq(this.carouselIndex + 1);
				
				if(pToHide.length > 0){
					this.pIndex--;
				}
			}

			if(dir === 'next' && pToShow.length > 0){
				this.pIndex++;
			}

			if(pToShow.length > 0){
				console.log($('.textNav span').eq(this.pIndex).addClass('active').siblings().removeClass('active'));

				pToShow.addClass('active');
				// START HERE TODO
				descWrap.css({
					marginLeft: -this.pIndex*desc.width()
				});
			} else {
				return;
			}

			if(pToHide.length > 0){
				pToHide.removeClass('active');
			}	
		},

		setupDescription: function(){
			var _this = this,
				$desc = $('.description');

			$desc.each(function(i, elm){
				var $this = $(this),
					$p = $this.find('p'),
					$nav = $('.textNav', $this),
					$workItem = $this.closest('.work-item'),
					$slides = $workItem.find('.carousel-item'),
					numSlides = $slides.length;	

				if(numSlides <= 2 && $p.length > 1){
					$desc.addClass('with-nav');
					$p.each(function(){
						$('<span></span>').appendTo($nav);
					});

					$('.textNav span:first', $this).addClass('active');
				}

				$('p:first', $this).addClass('active');
			});

			$('.textNav span').click(function(){
				var $this = $(this),
					i = $this.index(),
					$desc = $this.closest('.description'),
					$descWrap = $desc.find('.desc-wrap'),
					$descP = $desc.find('p'),
					$pW = $descP.width();

				$this.addClass('active').siblings().removeClass('active');

				$descWrap.css({
					marginLeft: -$pW*i
				});

				_this.pIndex = i;
			});	
		},

		setupDescCarousel: function(){
			var $desc = $('#work-item-stage .description'),
				$descWrap = $desc.find('.desc-wrap'),
				descW = $desc.width(),
				$ps = $desc.find('p'),
				psLen = $ps.length;

			$descWrap.width(descW*psLen);
			$ps.width(descW);
		},

		setupDescCarouselMobile: function(){
			var $desc = $('.description', this.$curWorkItem),
				$descWrap = $desc.find('.desc-wrap'),
				descW = $desc.width(),
				$ps = $desc.find('p'),
				psLen = $ps.length;

			$descWrap.width(descW*psLen);
			$ps.width(descW);
		},		

		playFullVideo: function(){
			var _this = this,
				$fullVideo = $('#work-item-stage').find('.work-full-video'),
				$videoSource = $('<source></source>'),
				videoSrc = $fullVideo.data('src');

				if(!$fullVideo.data('started')){
					$videoSource.attr('src', videoSrc);
					$videoSource.appendTo($fullVideo);
				}
				
				// $loopVideo = _this.$workItemStage.find('.work-loop-video');
				// $loopVideoSrc = $loopVideo.find('source');
				// loopVideoSrc = $loopVideoSrc.data('src');

				// $loopVideoSrc.attr('src', loopVideoSrc);

				// if(ML_vars.device != 'tablet'){
				// 	$loopVideo[0].play();
				// }				

			$fullVideo.show();	

			$fullVideo
				.css('opacity', 0)
				.attr('id', 'featured-work-video');

			$('#work-item-stage .work-full-video').show().css('opacity', 1);

			ml.elms.$body.addClass('show-video');

			if(!$fullVideo.data('started')){
				videojs('featured-work-video', {
					'autoplay': true,
					'controls': true
				}, function(){
					_this.currentFullVideo = this;

					this.on('ended', function(){
						_this.closeFullVideo();
					});
				});			
			}

			_this.currentFullVideo.play();
			$fullVideo.attr('data-started', true);
		},

		closeFullVideo: function(){
			this.currentFullVideo.pause();

			$('#work-item-stage .work-full-video').fadeOut();
						
			ml.elms.$body.removeClass('show-video');
		},

		resizeWorkPage: function(){
			var	winWidth = $(window).width(),
				winHeight = $(window).height(),
				itemWidth = winWidth/4,
				winMinWidth1 = 1030,
				winMinWidth2 = 768,
				containerWidth;

				// if(this.$curWorkItem != null){
				// 	var $copyWrap = this.$workItemStage.find('.copy-wrap'),
				// 		copyWrapW = $copyWrap.width(),
				// 		$desc = $copyWrap.find('.description'),
				// 		$descWrap = $desc.find('.desc-wrap'),
				// 		$ps = $desc.find('p'),
				// 		psLen = $ps.length;

				// 	$ps.each(function(){
				// 		$(this).width(copyWrapW);
				// 	});

				// 	$descWrap.width(psLen*copyWrapW);

				// 	$descWrap.css({
				// 		marginLeft: -this.pIndex*$desc.width()
				// 	});
				// }

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
			this.$workItems.css('width', itemWidth);

			setTimeout(function () {
			    myScroll.refresh();
			}, 300);
		},

		checkUrl: function(event){
			var _this = this,
				workId = '';

			if(_this.currentPath === '/'){
				if (_this.currentWorkItem != '') {
					// reset the work page
					// _this.closeWorkItem(ml.Work.$curWorkItem);
				};

				return;
			} else {
				workId = _this.currentPath.replace('/', '');
				if(this.openOnLoad){
					console.log('from checkURL');
					_this.openWorkItem($('#'+ workId));
					_this.scrollToItem($('#'+ workId));
				}	
			}
		},

		updateUrl: function(workItemId){
			window.location.hash = '#!/' + workItemId;
		},

		resetUrl: function(){
			window.location.hash = '#!/';
		},		

	};

	ml.Work.menu = {
		init: function(){
			this.$link = $('.right-menu a');

			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;

			_this.$link.on('click', function(e){
				e.preventDefault();
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
				_this.worksInCat = _this.filterCat === 'all' ? ml.Work.$workItems : $('[data-category="' + _this.filterCat +'"]');
				_this.worksToHide = ml.Work.$workItems.not(_this.worksInCat),
				_this.workItemsWidth = ml.Work.workItemsContainerWidth = this.workItemWidth * _this.worksInCat;
		},

		filterWork: function(){
			ml.Work.$workItemsWin.removeClass('item-open');

			ml.Work.currentIndex = 0;
			ml.Work.numWorkItems = this.worksInCat.length;

			if(ml.Work.$curWorkItem != null){
				ml.Work.resetWorkItem(ml.Work.$curWorkItem);
			}

			ml.Work.resetToTop();

			this.worksInCat.each(function(i, elm){
				$(elm).data('filter-index', i);
			});

			this.worksInCat.show();
			this.worksToHide.hide();

			ml.Work.resetUrl();

			if(ML_vars.device === 'desktop' || ML_vars.device === 'tablet'){
				var numToShow = ml.env.winWidth >= 768 ? 3 : 4;

				this.workItemsWidth = ml.Work.numWorkItems * ml.Work.workItemWidth;

				if(ml.Work.numWorkItems < numToShow && this.filterCat != 'all'){
					this.workItemsWidth = ml.Work.workItemWidth*numToShow;
				}				
				
				$('#work-items').css('width', this.workItemsWidth);	
				
				myScroll.refresh();			
			}

			if(ml.Work.numWorkItems === 1){
				ml.Work.openWorkItem(this.worksInCat);
			}				

			if(this.filterCat === 'all'){
				ml.Work.$workItems.show();
			}

			if(ml.Work.numWorkItems != 1){
				$('.nav-arrow-down').fadeIn();
				ml.Work.resetUrl();
			}			
		}
	}

	$(function(){
		ml.Work.init();
		ml.Work.menu.init();

		if(ML_vars.device != 'mobile'){
			// $('#work-items-window').wrapInner('<div id="work-items-wrap"></div>');

			// $('#work-items-window').perfectScrollbar();	

			myScroll = new IScroll('#work-items-window', { 
				scrollX: true, 
				scrollY: true, 
				mouseWheel: true,
				scrollbars: 'custom',
				scrollY: false,
				interactiveScrollbars: true,
				click: false,
				keyBindings: {
					left: 37,
    				right: 39
    			}
			});	

			var leftInterval;
			var rightInterval;
			var left;
			var scrollX = myScroll.x;

			$('.scrollhotspot.right').on('mouseover', function(e){
				var _this = $(this);
				
				if(Math.abs(myScroll.x) >= Math.abs(myScroll.maxScrollX)){
					$(this).hide();
					return;
				}

				rightInterval = setInterval(function(){
					myScroll.scrollBy(-10, 0, 0);

					if(Math.abs(myScroll.x) >= Math.abs(myScroll.maxScrollX)){
						clearInterval(rightInterval);
					}					
				}, 10);
			});
		
			$('.scrollhotspot.right').on('mouseout', function(e){
				// console.log('cleat the int');
				clearInterval(rightInterval);
			});	

			$('.scrollhotspot.left').on('mouseover', function(e){
				var _this = $(this);

				if(Math.abs(myScroll.x) <= 0){
					return;
				}

				leftInterval = setInterval(function(){
					myScroll.scrollBy(10, 0, 0);

					if(Math.abs(myScroll.x) <= 0){
						clearInterval(leftInterval);
					}					
				}, 10);
			});
		
			$('.scrollhotspot.left').on('mouseout', function(e){
				// console.log('cleat the int');
				clearInterval(leftInterval);
			});
		}	
	});
})(jQuery);