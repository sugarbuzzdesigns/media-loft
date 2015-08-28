(function($){

	ml.Timeline = {
		init: function(){
			this.timeline = $('#timeline2');
			this.timelineScrollElm = $('#timeline2 .timeline-wrap');
			this.timeLineImageDir = timeLineImageDir;

			this.windowHeight = $(window).height();
			this.maxTimelineHeight = 700;

			this.setSquareSideLength();
			
			this.squareLeft = 0;
			this.squareTop = 0;
			this.containerIndex = 10;

			this.loopEvents(0);
			this.loopEvents(1);
			this.loopEvents(2);
			this.loopEvents(3, 2);	

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

			this.squareSideLength = length > 325 ? 325 : length - 40;

			console.log(this.squareSideLength);

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
				e.preventDefault();

				_this.toggleDateInfo(this);
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
		loopEvents: function(containerIndex, numBoxes){
			var tl = $('#timeline2').css('overflow', 'hidden'),
				container = tl.find('article').eq(containerIndex);

			var aSqbSq = (this.squareSideLength * this.squareSideLength) + (this.squareSideLength * this.squareSideLength);
			var sqRoot = Math.floor(Math.sqrt(aSqbSq));	

			var cLeft = containerIndex * (sqRoot*3) + 40;
			var containerWidth = sqRoot*3;

			numBoxes = numBoxes || 4;

			if(numBoxes === 2){
				containerWidth = sqRoot*2;
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
					left = left - sqRoot;
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
			}		
		},

		addDates: function(){
			$('#timeline2 .timeline-block').each(function(i, block){
				var blockHTML = $('#timeline-data .timeline-block').eq(i).html();
				var block = $(block);

				block.append(blockHTML);
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
					info = $('.info', $elm).text(),
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
			var currentLeft = $('#timeline2 .timeline-wrap').scrollLeft(),
				boxLeft = $box.offset().left,
				newLeft = currentLeft + boxLeft - 40;

			this.timelineScrollElm.animate({
				scrollLeft: newLeft
			});
		}
	}

	$(function(){
		ml.Timeline.init();

		var winWidth = $(window).width();

		// TODO RESIZE TIMELINE ON WINDOW RESIZE
		ml.selections.$win.on("resizeEnd", function() {
			// ml.Timeline.setSquareSideLength();
			// ml.Timeline.loopEvents();

			console.log('resize ended');
		});

		$('#timeline2 .left-top').each(function(){ 
			// console.log($(this).offset().left);
		});

		if(ML_vars.device === 'desktop'){
			$("#timeline2 .timeline-wrap").smoothDivScroll({
				setupComplete: function(){
					$('#timeline2 .scrollWrapper').scroll(function(e){
						console.log('scrollling');
						$('#timeline2 .right-top').each(function(){ 
							if($(this).offset().left > 10 && $(this).offset().left < 100){
								var date = $(this).find('.num').text();

								$('.large-date').text(date.slice(-2));
							}
						});
					});
				}
			});		
		}
	});
})(jQuery);