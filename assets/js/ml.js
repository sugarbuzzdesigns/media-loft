/*! simpleWeather v3.0.2 - http://simpleweatherjs.com */
!function(e){"use strict";function t(e,t){return Math.round("f"===e?5/9*(t-32):1.8*t+32)}e.extend({simpleWeather:function(i){i=e.extend({location:"",woeid:"",unit:"f",success:function(){},error:function(){}},i);var o=new Date,n="https://query.yahooapis.com/v1/public/yql?format=json&rnd="+o.getFullYear()+o.getMonth()+o.getDay()+o.getHours()+"&diagnostics=true&callback=?&q=";if(""!==i.location)n+='select * from weather.forecast where woeid in (select woeid from geo.placefinder where text="'+i.location+'" and gflags="R" limit 1) and u="'+i.unit+'"';else{if(""===i.woeid)return i.error({message:"Could not retrieve weather due to an invalid location."}),!1;n+="select * from weather.forecast where woeid="+i.woeid+' and u="'+i.unit+'"'}return e.getJSON(encodeURI(n),function(e){if(null!==e&&null!==e.query&&null!==e.query.results&&"Yahoo! Weather Error"!==e.query.results.channel.description){var o,n=e.query.results.channel,r={},s=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"],a="https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png";r.title=n.item.title,r.temp=n.item.condition.temp,r.code=n.item.condition.code,r.todayCode=n.item.forecast[0].code,r.currently=n.item.condition.text,r.high=n.item.forecast[0].high,r.low=n.item.forecast[0].low,r.text=n.item.forecast[0].text,r.humidity=n.atmosphere.humidity,r.pressure=n.atmosphere.pressure,r.rising=n.atmosphere.rising,r.visibility=n.atmosphere.visibility,r.sunrise=n.astronomy.sunrise,r.sunset=n.astronomy.sunset,r.description=n.item.description,r.city=n.location.city,r.country=n.location.country,r.region=n.location.region,r.updated=n.item.pubDate,r.link=n.item.link,r.units={temp:n.units.temperature,distance:n.units.distance,pressure:n.units.pressure,speed:n.units.speed},r.wind={chill:n.wind.chill,direction:s[Math.round(n.wind.direction/22.5)],speed:n.wind.speed},r.heatindex=n.item.condition.temp<80&&n.atmosphere.humidity<40?-42.379+2.04901523*n.item.condition.temp+10.14333127*n.atmosphere.humidity-.22475541*n.item.condition.temp*n.atmosphere.humidity-6.83783*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)-5.481717*Math.pow(10,-2)*Math.pow(n.atmosphere.humidity,2)+1.22874*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)*n.atmosphere.humidity+8.5282*Math.pow(10,-4)*n.item.condition.temp*Math.pow(n.atmosphere.humidity,2)-1.99*Math.pow(10,-6)*Math.pow(n.item.condition.temp,2)*Math.pow(n.atmosphere.humidity,2):n.item.condition.temp,"3200"==n.item.condition.code?(r.thumbnail=a,r.image=a):(r.thumbnail="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.condition.code+"ds.png",r.image="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.condition.code+"d.png"),r.alt={temp:t(i.unit,n.item.condition.temp),high:t(i.unit,n.item.forecast[0].high),low:t(i.unit,n.item.forecast[0].low)},r.alt.unit="f"===i.unit?"c":"f",r.forecast=[];for(var m=0;m<n.item.forecast.length;m++)o=n.item.forecast[m],o.alt={high:t(i.unit,n.item.forecast[m].high),low:t(i.unit,n.item.forecast[m].low)},"3200"==n.item.forecast[m].code?(o.thumbnail=a,o.image=a):(o.thumbnail="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.forecast[m].code+"ds.png",o.image="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.forecast[m].code+"d.png"),r.forecast.push(o);i.success(r)}else i.error({message:"There was an error retrieving the latest weather information. Please try again.",error:e.query.results.channel.item.title})}),this}})}(jQuery);

var $ = jQuery;

/**
 * Start Media Loft Object
 */
(function($){

	ml = {

		init: function(){
			this.bindEvents();

			// Cache some often used elements
			this.$win = $(window);
			this.$body = $('body');

			this.setupWorkPage();
		},
		bindEvents: function() {
			var self = this;

			$('.menu-btn').on('click', function(e){
				e.preventDefault();
				self.openNavMenu($(this));
			});

			// WORK PAGE - work items click handler
			$('.work-item').on('click', function(){
				$(this).css('width', '100%').addClass('show-details');
				$('.work-items').css('width', '100%');
				$(this).siblings('.work-item').css('opacity', 0).css('width', 0);

				self.hideRightNav();
			});

			$('.work-carousel .close').on('click', function(e){
				e.stopPropagation();
				$('.work-item.show-details').css('width', '25%').removeClass('show-details');
				$('.work-items').css('width', self.workItemsContainerWidth);
				$('.work-item').css('opacity', 1).css('width', self.workItemWidth);
			});

			// $('.work-item').on('mouseover', function(){
			// 	var $this = $(this)


			// });			

			$('#services-menu li').on('mouseover', function(e){
				var $this = $(this);

				$('.blur-overlay.show').removeClass('show');

				e.preventDefault();
				e.stopPropagation();

				self.activateMenuItem($this);
				self.loadService($this);
			});

			$('#services-menu li').on('click', function(e){
				var $this = $(this);

				console.log('clicked');

				if(self.activeVideo){
					self.pauseActiveVideo();
				}				

				self.showServiceContent($this);				
			});

			$('#culture .play-reel').on('click', function(e){
				e.preventDefault();

				self.playCultureVideo();
			});

			$('.home .play-reel').on('click', function(e){
				e.preventDefault();

				self.playHomeVideo();
			});			

			this.startLandingVideo();

			$('.carousel-nav li').on('click', function(){
				var $this = $(this),
					index = $this.index(),
					$items = $(this).closest('.carousel-nav').siblings('.carousel-items'),
					slideToShow = $('.carousel-item', $items)[index];

					$this.addClass('active').siblings().removeClass('active')

					$(slideToShow).show().siblings().hide();
			});

			$('#blog .header').on('click', function(e){
				e.preventDefault();
				
				self.showBlogArticle($(this).parent());
			});

			$('.related-articles').on('click', function(){
				self.showRelatedBlogArticle();
			});

			$('.date').on('mouseover', function(){
				var year = $(this).data('year'),
					yearAbrev = $(this).data('year-abrev');

					$('.large-date').text(yearAbrev);
			});

			$('.date').on('click', function(e){
				e.preventDefault();
				var infoid = '#' + $(this).data('info-id'),
					bgImg = $(this).data('bg-image'),
					imgDir = $('#timeline .full-bleed').data('img-dir');

				$('#timeline .full-bleed').attr('style', 'background-image:url(' + imgDir + bgImg + ');');
						
				$(infoid).addClass('show-me');
				$('.info').not(infoid).removeClass('show-me');			
				
				$('.date').addClass('selected');
				$('.date').not(this).removeClass('selected');
			});		
		},
		openNavMenu: function($menuBtn){
			if($menuBtn.is('#main-menu-btn')){
				this.toggleMainMenu();
			} else {
				this.toggleSideMenu();
			}
		},	
		toggleMainMenu: function(){
			this.$body.toggleClass('main-menu-open');
			if(this.$body.hasClass('right-menu-open')){
				this.$body.removeClass('right-menu-open');
			}			
		},
		toggleSideMenu: function(){
			this.$body.toggleClass('right-menu-open');
			if(this.$body.hasClass('main-menu-open')){
				this.$body.removeClass('main-menu-open');
			}
		},
		activateMenuItem: function($menuItem){
			$menuItem.addClass('active');
			$menuItem.siblings().removeClass('active');
		},
		hideRightNav: function(){
			$('.right-menu').addClass('go-away');
		},
		loadService: function($menuItem){
			var $serviceSections = $('.service-section');
				$link = $('a', $menuItem),
				$sectionToLoad = $($link.attr('href')),
				$servicesContainer = $('#services-container'),
				containerTop = $servicesContainer.offset().top,
				$video = $('video', $sectionToLoad),
				hasVideo = $video.length > 0 ? true : false;

				if(hasVideo){
					if(this.activeVideo){
						this.pauseActiveVideo();
					}
					
					this.playVideo($video[0]);

				}

			// hide current section if showing
			$serviceSections.removeClass('active show-summary');
			// show the section chosen
			$sectionToLoad.addClass('active');
			// go to the section
			$("html, body").animate({ scrollTop: containerTop });
			// hide menu
			this.$body.removeClass('right-menu-open');
		},
		showServiceContent: function($menuItem){
			var $link = $('a', $menuItem),
				$sectionToLoad = $($link.attr('href'));

			$('.blur-overlay', $sectionToLoad).addClass('show');

			$sectionToLoad.addClass('show-summary');	
		},
		playCultureVideo: function(){
			$('#culture .cta, #culture .video-cover').remove();
			$('#about-culture-video')[0].play();
		},
		playHomeVideo: function(){
			$('#culture .cta, #culture .video-cover').remove();
			$('#about-culture-video')[0].play();
		},		
		startLandingVideo: function(){

			var $vid = $('#landing-video');
				vid = $vid[0];

			$vid.on('canplay', function(){
				vid.play();
			});
		},
		pauseActiveVideo: function(){
			this.activeVideo.pause();
		},
		playVideo: function(video){
			video.play();

			this.activeVideo = video;
		},
		showBlogArticle: function($article){
			var group = $article.parent(),
				groupSiblings = group.siblings('.group');

			groupSiblings.hide();
			$article.siblings().hide();

			$article.addClass('show-article');

			// console.log($('article').not('.show-article').addClass('hide-me'));
			// console.log($(entry).parent().find('.article-content'));
		},
		showRelatedBlogArticle: function($article){
			var group = $article.parent(),
				groupSiblings = group.siblings('.group');

			groupSiblings.hide();
			$article.siblings().hide();

			$article.addClass('show-article');

			// console.log($('article').not('.show-article').addClass('hide-me'));
			// console.log($(entry).parent().find('.article-content'));
		},
		setupWorkPage: function(){
			var $workItem = $('.work-item'),
				workItemWidth = $workItem.outerWidth(),
				numWorkItems = $workItem.length,
				$workItemsContainer = $('.work-items'),
				workItemsContainerWidth = workItemWidth*numWorkItems;

				this.workItemsContainerWidth = workItemsContainerWidth;
				this.workItemWidth = workItemWidth;

			$workItem.css('width', workItemWidth);
			$workItemsContainer.css('width', workItemsContainerWidth);
		}		
	};



	$(function(){
		ml.init();
	});

})(jQuery)