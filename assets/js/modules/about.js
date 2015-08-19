(function($){
	ml.About = {
		init: function(){
			this.timeLineImageDir = $('#timeline .full-bleed').data('img-dir');

			this.setUpTimeLine();
			this.bindEvents();
		},
		bindEvents: function(){
			var _this = this;

			$('#about-menu li').on('click', function(e){
				e.stopPropagation();
				e.preventDefault();

				_this.scrollToSection(this);
			});

			$('.date').on('mouseover', function(){
				_this.expandDateBtn(this);
			});

			$('.date').on('click', function(e){
				e.preventDefault();

				_this.toggleDateInfo(this);
			});	

			$('#culture .play-reel').on('click', function(e){
				e.preventDefault();

				_this.playCultureVideo();
			});	

			$('.nav-arrow-down').on('click', function(){
				_this.scrollToSection($('#about-menu li').eq(1));
			});

			$('.email .choice').on('click', function(){
				$('.email .active').removeClass('active');
				$(this).addClass('active');

				$('.email .selected').text($(this).text());
				$('.email-link a').attr('href', $(this).data('mailto'));
			});

			// $(".timeline-container").mousewheel(function(event, delta) {
			// 	if (event.deltaX != 0){
			// 	    // Anything that makes vertical wheelscroll keeps normal
			// 	} else {
			// 	    // Only prevent if scroll is not vertical
			// 	    event.preventDefault();
			// 	}
			// });				

			// $(window).on("scrollstop", function() {
			// 	console.log('scroll stop');

			// 	var offsetTop = $('#timeline').offset().top;
			// 	var winHeight = $(window).height();
			// 	var scrollTop = $(window).scrollTop();

			// 	if(offsetTop - winHeight/2 > scrollTop){
			// 		console.log('dont go anywhere');
			// 	} else {
			// 		setTimeout(function(){
			// 			$("html, body").animate({ scrollTop: offsetTop + "px" });
			// 		}, 100)	;
			// 	}
			// });			

			// $('#people .tile').waypoint(function() {
			// 	console.log('in people');
			// });										
		},
		setUpTimeLine: function(){
			var _this = this;

			var createInfoBox = function(dateInfo, container){
				// <div id="1975" class="info">
				// 	<div class="inner">
				// 		<h5>1975</h5>
				// 		<p>That’s a wrap: first promotional sales video for Media Loft.</p>
				// 	</div>
				// </div>
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
				infoid = $dateBtn.data('info-id'),
				bgImg = $dateBtn.data('bg-image'),
				$timelineBgImage = $('#timeline .full-bleed'),
				$imgPlaceholder = $('img', $timelineBgImage),
				$infoItem = $('#item-' + infoid);

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
		},
		closeDateInfo: function(dateBtn){
			var _this = this;

			var $dateBtn = $(dateBtn),
				infoid = '#item-' + $dateBtn.data('info-id'),
				$timelineBgImage = $('#timeline .full-bleed');	
					
			$(infoid).removeClass('show-me');
			$dateBtn.removeClass('selected');
		},
		scrollToSection: function(menuItem){
			var $menuItem = $(menuItem),
				dataSection = $menuItem.data('section-name');

				$.scrollify.move(dataSection);
		},
		checkUrl: function(event){
			var _this = this,
				workId = '';

			if(_this.currentPath === '/'){
				if (_this.currentWorkItem != '') {
					// reset the work page
					_this.closeWorkItem(_this.currentWorkItem);
				};

				return;
			} else {
				workId = _this.currentPath.replace('/', '');
				_this.openWorkItem(workId);
			}
		},
		updateUrl: function(workItemId){
			window.location.hash = '#!/' + workItemId;
		},	
		playCultureVideo: function(){
			$('#culture').addClass('play-full-video');
			$('#about-culture-video-loop').fadeOut();
			$('#about-culture-video-full').css('opacity', 1);
			$('#culture .blur-overlay').css('opacity', 0);
			$('#about-culture-video-full')[0].play();
		},			
	};

	ml.About.clientTileSwap = {
		init: function(){
			var changeTiles,clients,usedLogos=[],unUsedLogos=[],emptyTiles=[],filledTiles=[];usedLogos=["ally.png","best_buy.png","dell.png","google.png","indian.png","optum.png","pizza_hut.png","staples.png"];var clientTiles=$("#clients .tile");clientTiles.each(function(s,e){$(e).is(".blank")?emptyTiles.push($(e)):filledTiles.push($(e))}),$(clients).each(function(s,e){-1===$.inArray(e,usedLogos)&&unUsedLogos.push(e)}),changeTiles=function(){var s=filledTiles.length,e=emptyTiles.length,i=Math.floor(Math.random()*s),n=Math.floor(Math.random()*e),l=filledTiles[i],o=emptyTiles[n];emptyTiles=[],filledTiles=[];var a=$.inArray($(l).data("img"),usedLogos);usedLogos.splice(a,1),unUsedLogos.push($(l).data("img"));var g=Math.floor(Math.random()*unUsedLogos.length);if($(l).addClass("blank").find("img").remove(),0===$(o).find("img").length){$(o).data("img",unUsedLogos[g]),$('<img src="'+imgDir+"/clients/"+unUsedLogos[g]+'">').appendTo($(o));var t=$.inArray(unUsedLogos[g],unUsedLogos);usedLogos.push(unUsedLogos[g]),unUsedLogos.splice(t,1)}else{$(o).find("img").attr("src",imgDir+"/clients/"+unUsedLogos[g]),$(o).find("img").attr("data-img",unUsedLogos[g]);var t=$.inArray(unUsedLogos[g],unUsedLogos);unUsedLogos.splice(t,1)}$(o).removeClass("blank"),clientTiles.each(function(s,e){$(e).is(".blank")?emptyTiles.push($(e)):filledTiles.push($(e))})},setInterval(function(){changeTiles()},2e3);
		}
	}	

	ml.About.empTileSwap = {
		init: function(){

		}
	}
	
	$(function(){
		ml.About.init();
		ml.About.clientTileSwap.init();

	var changeEmpTiles,
		usedEmployees = [],
		unUsedEmployees = [],
		emptyEmpTiles = [],
		filledEmpTiles = [];

		usedEmployees = [
			'camie',
			'bill',
			'brian',
			'joe',
			'jusint',
			'kim',
			'kay',
			'debbie'
		];

	var employeeTiles = $('#people .tile');

		employeeTiles.each(function(i, elm){
			if($(elm).is('.blank')){
				emptyEmpTiles.push($(elm));
			} else {
				filledEmpTiles.push($(elm));
			}
		});

		$(employees).each(function(i, employee){
			if($.inArray(employee,usedEmployees) === -1){
				unUsedEmployees.push(employee);	
			}
		});	

	changeEmpTiles = function(){
		var numFilledTiles = filledEmpTiles.length;
		var numEmptyTiles = emptyEmpTiles.length;

		var randoFillNum = Math.floor(Math.random() * numFilledTiles);
		var randoEmptyNum = Math.floor(Math.random() * numEmptyTiles);

		var tileToEmpty = filledEmpTiles[randoFillNum];
		var tileToFill = emptyEmpTiles[randoEmptyNum];

		emptyEmpTiles = [];
		filledEmpTiles = [];

		var indexToRemove = $.inArray($(tileToEmpty).data('img'), usedEmployees);

		usedEmployees.splice(indexToRemove, 1);

		unUsedEmployees.push($(tileToEmpty).data('img'));
		var empImgNum = Math.floor(Math.random() * unUsedEmployees.length);

		$(tileToEmpty).addClass('blank').find('img').remove();

		if($(tileToFill).find('img').length === 0){
			// console.log(unUsedEmployees[empImgNum]);
			$(tileToFill).data('img', unUsedEmployees[empImgNum]);
			$('<img src="'+ imgDir +'/employees/'+ unUsedEmployees[empImgNum] +'_rest.jpg">').appendTo($(tileToFill));
			$('<img src="'+ imgDir +'/employees/hover/'+ unUsedEmployees[empImgNum] +'_hover.jpg">').appendTo($(tileToFill));
			
			var i = $.inArray(unUsedEmployees[empImgNum], unUsedEmployees);

			usedEmployees.push(unUsedEmployees[empImgNum]);
			unUsedEmployees.splice(i, 1);
		} else {
			$(tileToFill).find('img').attr('src', imgDir +'/clients/'+ unUsedEmployees[empImgNum]);
			$(tileToFill).find('img').attr('data-img', unUsedEmployees[empImgNum]);

			var i = $.inArray(unUsedEmployees[empImgNum], unUsedEmployees);
			unUsedEmployees.splice(i, 1);
		}

		
		$(tileToFill).removeClass('blank');

		employeeTiles.each(function(i, elm){
			if($(elm).is('.blank')){
				emptyEmpTiles.push($(elm));
			} else {
				filledEmpTiles.push($(elm));
			}
		});	
	};

	setInterval(function(){
		// changeEmpTiles();
	}, 2000);		
	});


})(jQuery);