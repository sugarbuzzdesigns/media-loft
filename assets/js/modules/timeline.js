(function($){

	ml.Timeline = {
		init: function(){
			this.timeline = $('#timeline2');
			this.timelineScrollElm = $('#timeline2 .scrollWrapper');
			this.timeLineImageDir = timeLineImageDir;
			this.videoContainer = $('#timeline2 .video-overlay');
			this.timelineVideo = $('#timeline2 .video-overlay video');

			this.windowHeight = $(window).height();
			this.maxTimelineHeight = 600;

			this.maxSquareSideLength = 250;

			this.setSquareSideLength();
			
			this.squareLeft = 0;
			this.squareTop = 0;
			this.containerIndex = 10;

			this.dates = [];

			this.loopEvents(0);
			this.loopEvents(1);
			this.loopEvents(2);
			this.loopEvents(3, 2, true);	

			this.addDates();
			this.numDates = $('#timeline2 .date').length;
			this.setUpTimeLine();
			this.timelineWidth = this.getTimelineWidht();

			this.bindEvents();
		},

		setSquareSideLength: function(){
			var winH = this.windowHeight,
				length;

			length = Math.sqrt(Math.pow(winH/1.5, 2)/2);

			this.squareSideLength = length - 75;

			return Math.sqrt(Math.pow(winH/1.5, 2)/2);
		},

		getTimelineWidht: function(){
			var width = 0;

			$('#timeline2 article').each(function(i, elm){
				width += $(elm).width();
			});

			return width;
		},
		bindEvents: function(){
			var _this = this;

			$('#timeline2 .date').on('mouseover', function(){
				_this.expandDateBtn(this);
			});

			$('#timeline2 .date').on('click', function(e){
				e.stopPropagation();
				e.preventDefault();

				_this.toggleDateInfo(this);
			});	

			$('#timeline2 .date').on('touchmove', function(e){
				e.preventDefault();
			});

			$('#timeline2 .play-reel').on('click', function(){
				_this.openTimelineVideo($(this));
			});

			$('#timeline2 .close-video').click(function(e){
				e.preventDefault();

				_this.stopTimelineVideo();
			});			
		},
		expandDateBtn: function(dateBtn){
			var year = $(dateBtn).data('year'),
				yearAbrev = $(dateBtn).data('year-abrev');

				$('.large-date').text(yearAbrev);			
		},	
		toggleDateInfo: function(dateBtn){
			if($(dateBtn).is('.selected')){
				this.closeDateInfo(dateBtn);
			} else {
				this.openDateInfo(dateBtn);
			}
		},	
		openDateInfo: function(dateBtn){
			var _this = this;

			var $dateBtn = $(dateBtn),
				date = $dateBtn.find('.num').text(),
				$timelineBlock = $dateBtn.parent(),
				infoid = $dateBtn.data('info-id'),
				bgImg = $dateBtn.data('bg-image'),
				$timelineBgImage = $('#timeline2 .full-bleed'),
				$imgPlaceholder = $('img', $timelineBgImage),
				$infoItem = $('#item-' + infoid);

			$('.large-date').text(date.slice(-2));

			$timelineBgImage.removeClass('shown');

			$imgPlaceholder.attr('src', _this.timeLineImageDir + bgImg);	
			
			$imgPlaceholder.on('load', function(){
				$timelineBgImage
					.attr('style', 'background-image:url(' + _this.timeLineImageDir + bgImg + ');')
					.addClass('shown');
			});
					
			$infoItem.addClass('show-me');
			$('.info').not($infoItem).removeClass('show-me');			
			
			$dateBtn.addClass('selected');
			$('.date').not($dateBtn).removeClass('selected');

			$('.large-date').fadeOut();

			_this.scrollTimeline($timelineBlock);
		},	
		closeDateInfo: function(dateBtn){
			var _this = this;

			var $dateBtn = $(dateBtn),
				infoid = '#item-' + $dateBtn.data('info-id'),
				$timelineBgImage = $('#timeline2 .full-bleed');	
					
			$(infoid).removeClass('show-me');
			$dateBtn.removeClass('selected');

			$('.large-date').fadeIn();
			$timelineBgImage.fadeOut();
		},				
		loopEvents: function(containerIndex, numBoxes, isLast){
			var tl = $('#timeline2').css('overflow', 'hidden'),
				container = tl.find('article').eq(containerIndex);

			var aSqbSq = (this.squareSideLength * this.squareSideLength) + (this.squareSideLength * this.squareSideLength);
			var sqRoot = Math.floor(Math.sqrt(aSqbSq));	

			var cLeft = containerIndex * (sqRoot*3) + 40;
			var containerWidth = sqRoot*3;

			numBoxes = numBoxes || 4;
			isLast = isLast || false;

			if(numBoxes === 2){
				containerWidth = sqRoot*2;
			}

			if(isLast) {
				containerWidth +=100;
			}

			container.css({
				position: 'absolute',
				left: cLeft,
				height: sqRoot*2 - sqRoot/2,
				width: containerWidth,
				zIndex: this.containerIndex--
			});

			for (var i = 0; i <= numBoxes-1; i++) {
				var left = sqRoot * i + (sqRoot - this.squareSideLength)/2;
				var bottom = (sqRoot - this.squareSideLength)/2;

				if(i % 2 === 0 && i != 0){
					bottom = bottom + sqRoot/2;
					left = left - (sqRoot/2);
				} else {
					bottom = bottom;
				}

				if(i === 3){
					left = Math.floor(left - sqRoot);
				}

				if(i === 0){
					boxZIndex = 4;
				}

				if(i === 1){
					boxZIndex = 3;
				}

				if(i === 2){
					boxZIndex = 2;
				}

				if(i === 3){
					boxZIndex = 1;
				}					

				// add div for each event
				$('<div/>', {
					class: 'timeline-block',
					height: this.squareSideLength + 'px',
					width: this.squareSideLength + 'px',
				}).css({
					position: 'absolute',
					bottom: bottom,
					left: left,
					zIndex: boxZIndex
				}).appendTo(container);

				console.log(this.squareSideLength);
			}		
		},

		addDates: function(){
			var _this = this;

			$('#timeline2 .timeline-block').each(function(i, block){
				var blockHTML = $('#timeline-data .timeline-block').eq(i).html();
				var block = $(block);

				block.append(blockHTML);
			});

			$('#timeline-data .date').each(function(i, elm){
				var date = $(elm).data('info-id');

				_this.dates.push(date.toString().slice(-2));
			});
		},

		setUpTimeLine: function(){
			var _this = this;

			var createInfoBox = function(dateInfo, container){
				var infoBox = $('<div class="info"></div>'),
					infoBoxInner = $('<div class="inner"></div>'),
					// infoBoxDate = $('<h5>'+ dateInfo.date +'</h5>').appendTo(infoBoxInner),
					infoBoxInfo = $('<p>'+ dateInfo.info +'</p>').appendTo(infoBoxInner);

				infoBoxInner.appendTo(infoBox);

				infoBox.attr('id', dateInfo.id);

				container.append(infoBox);
			}

			$('a[data-info-id]').each(function(i, elm){
				var $elm = $(elm),
					info = $('.info', $elm).html(),
					date = $elm.data('info-id'),
					container = $elm.parent();

				var dateInfo = {
					id: 'item-'+ date,
					date: date,
					info: info
				}	

				$('.num', $elm).text(date);
				createInfoBox(dateInfo, container);				
			});
		},		

		scrollTimeline: function($box){
			var currentLeft = $('#timeline2 .scrollWrapper').scrollLeft(),
				boxLeft = $box.offset().left,
				newLeft = currentLeft + boxLeft - 40;

			$('#timeline2 .scrollWrapper').animate({
				scrollLeft: newLeft
			});

			console.log(this.timelineScrollElm);
		},

		openTimelineVideo: function($link){
			var _this = this,
				videoUrl = $link.data('video-url');

			_this.timelineVideo.attr('src', videoUrl);

			_this.timeline.addClass('play-full-video');

			_this.timelineVideo[0].addEventListener('canplay', function(){
				console.log('can play it now!');
			});

			_this.timelineVideo.on('canplay', function(){
				$(this)[0].play();
				console.log('can play');
			});
		},

		stopTimelineVideo: function(){
			this.timeline.removeClass('play-full-video');

			this.timelineVideo[0].pause();
			this.timelineVideo.attr('src', '');
		},		
	}

	$(function(){
		ml.Timeline.init();

		$('.info .inner').addClass('noSwipe');

		var winWidth = $(window).width();

		// TODO RESIZE TIMELINE ON WINDOW RESIZE
		ml.elms.$win.on("resizeEnd", function() {
			// ml.Timeline.setSquareSideLength();
			// ml.Timeline.loopEvents();
		});

		$('#timeline2 .left-top').each(function(){ 
		});

		$("#timeline2 .timeline-wrap").smoothDivScroll({
			setupComplete: function(){
				var dateCount = ml.Timeline.dates.length-1;

				$('.scrollWrapper').perfectScrollbar({suppressScrollY:true});

				$('#timeline2 .scrollWrapper').scroll(function(e){
					var scrollPercentage=dateCount*this.scrollLeft/this.scrollWidth/(1-this.clientWidth/this.scrollWidth);
					
					$('.large-date').text(ml.Timeline.dates[Math.floor(scrollPercentage)]);
				});
			},

			scrollerRightLimitReached: function(eventObj, data) {
				// console.log("scroll left limit reached.");
			}				
		});		
	});
})(jQuery);