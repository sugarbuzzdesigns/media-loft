<?php get_header(); ?>	
	<section id="home-landing">
		<div class="cta">
			<?php if(wp_is_mobile()){ ?>
				<h2 class="tagline">
					<span>bringing brand stories</span>
					<span>to life.</span>
				</h2>
			<?php } else { ?>
				<h2 class="tagline desktop">
					<span>bringing brand stories to life worldwide</span>
				</h2>
			<?php } ?>
			<a class="play-reel" href="#">
				<i class="ml-play"></i>
				<span>Play Reel</span>
			</a>
		</div>
		<?php if(!wp_is_mobile()){ ?>
			<div class="blur-overlay"></div>
			<div class="scaling-svg-container responsive-height-svg" style="padding-bottom: 93.6%;">	
			
				<svg class="scaling-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
					 width="1287.375px" height="1098.061px" viewBox="0 0 1287.375 1098.061" enable-background="new 0 0 1287.375 1098.061"
					 xml:space="preserve" preserveAspectRatio="xMinYMin meet">

			  <defs>
			    <filter id="MyFilter" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="120">
			      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
			      <feOffset in="blur" dx="4" dy="4" result="offsetBlur"/>
			      <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" 
			                          specularExponent="20" lighting-color="#bbbbbb"  
			                          result="specOut">
			        <fePointLight x="-5000" y="-10000" z="20000"/>
			      </feSpecularLighting>
			      <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
			      <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" 
			                   k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
			      <feMerge>
			        <feMergeNode in="offsetBlur"/>
			        <feMergeNode in="litPaint"/>
			      </feMerge>
			    </filter>
			  </defs>

				<g id="Layer_1_2_">
					<g id="Layer_2" display="none">
					</g>
					<g id="Layer_1_1_">
						<path fill="#F4F4F4" d="M599.327,736.117c-14.281-14.281-14.281-37.436,0-51.717L1283.727,0L0,0.004v1098.057h961.271
							L599.327,736.117z"/>
					</g>
				</g>
				<g id="Layer_2_1_home">
					<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M609.289,0l-90.402,90.404
						c-2.629,2.63-2.629,6.893,0,9.522l259.161,259.162"/>
					<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M609.289,0"/>
					<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M789.312,0.004"/>
					<line fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" x1="1036.515" y1="247.208" x2="789.312" y2="0.004"/>
					<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M508.679,618.896c2.629,2.629,6.893,2.629,9.522,0
						l358.177-358.18c2.63-2.628,2.63-6.892,0-9.521L700.729,75.546c-2.63-2.629-6.896-2.629-9.525,0L333.027,433.723
						c-2.629,2.63-2.629,6.893,0,9.523L508.679,618.896z"/>
					<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M822.636,763.11"/>
					<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M432.025,542.243l-98.392,98.392
						c-2.629,2.628-2.629,6.894,0,9.523l175.649,175.648c2.629,2.628,6.895,2.628,9.524,0l85.106-85.104"/>
					<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M954.453,329.274l-78.071-78.072"/>
					
						<line fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" x1="331.057" y1="438.484" x2="331.662" y2="645.396"/>
					<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M638.039,740.702"/>
				</g>
				</svg>

<!-- 			<svg class="scaling-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 viewBox="0 0 1287.375 1098.061" enable-background="new 0 0 1287.375 1098.061"
				 preserveAspectRatio="xMinYMin meet"
				 xml:space="preserve">
			<g id="Layer_1">
				<g id="Layer_2" display="none">
				</g>
				<g id="Layer_1_1_">
					<path fill="#F4F4F4" d="M296.975,736.117c-14.281-14.281-14.281-37.435,0-51.717L981.375,0H0v1098.061h658.919L296.975,736.117z"
						/>
				</g>
			</g>
			<g id="Layer_2_1_home">
				<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M306.938,0l-90.403,90.404
					c-2.629,2.63-2.629,6.893,0,9.522l259.161,259.162"/>
				<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M306.938,0"/>
				<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M486.96,0.004"/>
				<line fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" x1="734.163" y1="247.208" x2="486.96" y2="0.004"/>
				<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M206.327,618.896c2.629,2.629,6.893,2.629,9.522,0
					l358.177-358.179c2.63-2.628,2.63-6.892,0-9.521L398.378,75.546c-2.63-2.629-6.896-2.629-9.525,0L30.676,433.723
					c-2.629,2.63-2.629,6.892,0,9.523L206.327,618.896z"/>
				<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M520.284,763.11"/>
				<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M129.674,542.243l-98.392,98.392
					c-2.629,2.628-2.629,6.893,0,9.523l175.649,175.649c2.629,2.628,6.895,2.628,9.524,0l85.106-85.105"/>
				<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M652.102,329.274l-78.072-78.072"/>
				<line fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" x1="28.705" y1="438.484" x2="29.31" y2="645.396"/>
				<path fill="none" stroke="#4C4A4C" stroke-width="2" stroke-miterlimit="10" d="M335.688,740.702"/>
			</g>
			</svg> -->
			</div>	
			<!-- <img class="svg-bg home" id="home-landing-svg-bg" src="<?php bloginfo('template_directory'); ?>/assets/vectors/home-bg.svg"> -->
			<div class="video-bg-container">
				<video id="home-video-loop" autoplay loop style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/videos/home/posters/What_We_Do_loopBW.jpg);">
					<source src="https://player.vimeo.com/external/136553579.hd.mp4?s=fa481af6256bf87c0fb6764be81ea63e&profile_id=113">
				</video>
			</div>
		<?php } ?>
		<div class="video-overlay" id="home-video-overlay">
			<video id="home-video-full" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/videos/home/posters/What_We_Do_loopBW.jpg);">
				<source src="https://player.vimeo.com/external/136554053.hd.mp4?s=86967bad46f8197184041ddb02abda1a&profile_id=113">
			</video>	
			<a href="#" class="close-video"><i></i></a>			
		</div>					
	</section>	
<?php get_footer(); ?>