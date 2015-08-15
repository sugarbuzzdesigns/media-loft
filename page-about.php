<?php get_header(); ?>
<?php 

$clientFiles = scandir(__DIR__ . '/assets/images/clients');
$clientFiles = array_diff($clientFiles, array('.', '..', '.DS_Store'));

$employeeFiles = scandir(__DIR__ . '/assets/images/employees');
$employeeFiles = array_diff($employeeFiles, array('.', '..', '.DS_Store'));

?>

<script>
	var clients = [];
	var employee = [];

	<?php foreach ($clientFiles as $file) { ?>
		clients.push('<?php echo $file; ?>');
	<?php } ?>

	<?php foreach ($employeeFiles as $employeeFile) { ?>
		<?php $arr = explode('_', $employeeFile); ?>
		console.log('<?php echo $arr[0]; ?>');
	<?php } ?>	

</script>
	<section id="about-landing">
	<div class="sqr"></div>
		<div class="cta alternate">
			<h2 class="tagline">
				<span>40 great years</span>
				<span>an ongoing success story</span>
			</h2>		
			<div class="nav-arrow-down animate-flicker">
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down.png" alt="Media Loft" />
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down.png" alt="Media Loft" />
			</div>			
		</div>

		<?php if(!wp_is_mobile()){ ?> 
			<div class="video-bg-container">
				<video id="landing-video" loop style="background-image:url(<?php echo VID_DIR ?>/about/posters/Landing_About_BW.jpg);">
					<source src="<?php echo VID_DIR ?>/about/Landing_About_BW.mp4">
				</video>
			</div>
		<?php } ?>
		<div class="blur-overlay show"></div>
	</section>
	<section id="timeline">
		<div class="timeline-container">
			<div class="timeline-block bottom">
				<a href="#" data-info-id="info-1" data-bg-image="1979_R_Smith_Shuneman.jpg" data-year="1999" data-year-abrev="99" class="date right-top">
					<span class="num">1999</span>
					<span class="close"></span>
				</a>	
				<div id="info-1" class="info">
					<div class="inner">
						<h5>1999</h5>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur provident nihil</p>
					</div>
				</div>								
			</div>
			<div class="timeline-block bottom">
				<a href="#" data-info-id="info-2" data-bg-image="1974_Media_Loft_FirstLogo.jpg" data-year="1999" data-year-abrev="99" class="date left-top">
					<span class="num">1999</span>
					<span class="close"></span>
				</a>
				<a href="#" data-info-id="info-3" data-bg-image="2004_ML_30th_Invite03.jpg" data-year="1999" data-year-abrev="99" class="date right-top">
					<span class="num">1999</span>
					<span class="close"></span>
				</a>
				<a href="#" data-info-id="info-4" data-bg-image="1991_JohnDenver.jpg" data-year="1999" data-year-abrev="99" class="date right-bottom">
					<span class="num">1999</span>
					<span class="close"></span>
				</a>

				<div id="info-4" class="info">
					<div class="inner">
						<h5>1999</h5>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur provident nihil.</p>
					</div>
				</div>			
			</div>
			<div class="timeline-block top">
				<div id="info-3" class="info">
					<div class="inner">
						<h5>1999</h5>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur provident nihil.</p>
					</div>
				</div>	
				<div id="info-2" class="info">
					<div class="inner">
						<h5>1999</h5>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur provident nihil.</p>
					</div>
				</div>									
			</div>	
			<div class="timeline-block bottom"></div>

			<!-- Start new part of timeline -->
			<div class="timeline-block bottom"></div>
			<!-- <div class="timeline-block bottom"></div> -->
<!-- 			<div class="timeline-block top"></div>	
			<div class="timeline-block bottom"></div> -->			
		</div>
		<div class="large-date"></div>	
		<div class="full-bleed" data-img-dir="<?php echo IMG_DIR ?>/about/timeline/desktop/"><div class="cover"></div></div>
	</section>
	<script>
		var imgDir = '<?php echo IMG_DIR; ?>';
	</script>
	<section class="tile-container" id="clients">
		<div data-img="ally.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/ally.png" alt=""></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="best_buy.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/best_buy.png" alt=""></div>
		<div data-img="dell.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/dell.png" alt=""></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="google.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/google.png" alt=""></div>

		<div data-img="" class="tile blank"></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="optum.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/optum.png" alt=""></div>
		<div data-img="indian.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/indian.png" alt=""></div>
		<div data-img="" class="tile blank"></div>

		<div data-img="" class="tile blank"></div>
		<div data-img="pizza_hut.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/pizza_hut.png" alt=""></div>		
		<div data-img="" class="tile blank"></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="staples.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/staples.png" alt=""></div>
		<img data-img="" class="svg-bg" id="services-landing-svg-bg" src="<?php bloginfo('template_directory'); ?>/assets/vectors/services/services-landing-bg-vector.svg">		
	</section>
	<section class="tile-container" id="people">
		<div class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/camie_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/camie_hover.jpg" alt="">
		</div>
		<div class="tile blank"></div>
		<div class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/bill_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/bill_hover.jpg" alt="">
		</div>
		<div class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/brian_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/brian_hover.jpg" alt="">
		</div>
		<div class="tile blank"></div>
		<div class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/joe_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/joe_hover.jpg" alt="">
		</div>

		<div class="tile blank"></div>
		<div class="tile blank"></div>
		<div class="tile blank"></div>
		<div class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/justin_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/justin_hover.jpg" alt="">
		</div>
		<div class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/kim_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/kim_hover.jpg" alt="">
		</div>
		<div class="tile blank"></div>

		<div class="tile blank"></div>
		<div class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/kay_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/kay_hover.jpg" alt="">
		</div>
		<div class="tile blank"></div>
		<div class="tile blank"></div>
		<div class="tile blank"></div>
		<div class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/debbi_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/debbi_hover.jpg" alt="">
		</div>	
		<img class="svg-bg" id="services-landing-svg-bg" src="<?php bloginfo('template_directory'); ?>/assets/vectors/services/services-landing-bg-vector.svg">	
	</section>
	<section id="culture">
		<div class="cta centered">
			<h2 class="tagline one-liner alternate-red">
				<span>40 great years</span>
				<span>an ongoing success story</span>
			</h2>		
			<a class="play-reel" href="#">
				<i class="ml-play black"></i>
				<span>Look Inside</span>
			</a>
		</div>		

		<?php if(!wp_is_mobile()){ ?> 
			<div class="video-cover" style="background-image:url(<?php echo IMG_DIR ?>/768up/backgrounds/about/Culture_Vid_Static_BG.jpg);"></div>
			<div class="video-bg-container">
				<video id="about-culture-video" loop style="background-image:url(<?php echo VID_DIR ?>/about/posters/Who_We_Are_Clicked.jpg);">
					<source src="<?php echo VID_DIR ?>/about/Who_We_Are.mp4">
				</video>
			</div>
		<?php } ?>		
	</section>
	<section id="join-us">
		<div class="contact-us">
			<div class="cta">
				<h2 class="tagline one-liner alternate">
					<span>enough about us.</span>
					<span>tell us about you.</span>
				</h2>	
			</div>	
		</div>
		<div class="full-bleed" style="background-image:url(<?php echo IMG_DIR ?>/768up/backgrounds/about/Join_Us_BG_02.jpg);"></div>
	</section>
	<?php include('partials/about-menu.php'); ?>
<?php get_footer(); ?>