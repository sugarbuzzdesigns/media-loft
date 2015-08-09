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
			<img class="svg-bg home" id="home-landing-svg-bg" src="<?php bloginfo('template_directory'); ?>/assets/vectors/home-bg.svg">
			<div class="blur-overlay"></div>
			<div class="video-bg-container">
				<video id="staging-video" autoplay loop style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/videos/home/posters/What_We_Do_loopBW.jpg);">
					<source src="<?php bloginfo('template_directory'); ?>/assets/videos/home/What_We_Do_loopBW.mp4">
				</video>
			</div>
		<?php } ?>			
	</section>	
<?php get_footer(); ?>