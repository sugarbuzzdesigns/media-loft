(function($){

	ml.Timeline = {
		init: function(){
			this.timeline = $('#timeline2');
			this.timeLineImageDir = timeLineImageDir;

			this.squareSideLength = 282;
			this.squareLeft = 0;
			this.squareTop = 0;
			this.containerIndex = 10;

			this.loopEvents(0);
			this.loopEvents(1);
			this.loopEvents(2);
			this.loopEvents(3, 2);	

			this.addDates();
			this.setUpTimeLine();

			this.bindEvents();
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

			console.log($timelineBlock.offset());

			_this.scrollTimeline($timelineBlock);
		},	
		closeDateInfo: function(dateBtn){
			var _this = this;

			var $dateBtn = $(dateBtn),
				infoid = '#item-' + $dateBtn.data('info-id'),
				$timelineBgImage = $('#timeline2 .full-bleed');	
					
			$(infoid).removeClass('show-me');
			$dateBtn.removeClass('selected');
		},				
		loopEvents: function(containerIndex, numBoxes){
			var tl = $('#timeline2').css('overflow-x', 'scroll'),
				container = tl.find('article').eq(containerIndex);

			var aSqbSq = (this.squareSideLength * this.squareSideLength) + (this.squareSideLength * this.squareSideLength);
			var sqRoot = Math.floor(Math.sqrt(aSqbSq));	

			var cLeft = containerIndex * (sqRoot*3) + 40;

			numBoxes = numBoxes || 4;

			container.css({
				position: 'absolute',
				left: cLeft,
				top: '50%',
				transform: 'translate(0,-50%)',
				height: sqRoot*2 - sqRoot/2,
				width: sqRoot*3,
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
					infoBoxDate = $('<h5>'+ dateInfo.date +'</h5>').appendTo(infoBoxInner),
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
			var timeline = $('currentLeft')
				currentLeft = $('#timeline2').scrollLeft(),
				boxLeft = $box.offset().left,
				newLeft = currentLeft + boxLeft;

			this.timeline.animate({
				scrollLeft: newLeft
			});
		}
	}

	$(function(){
		ml.Timeline.init();
	});
})(jQuery);