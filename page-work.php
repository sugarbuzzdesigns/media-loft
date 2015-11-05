<?php get_header(); ?>
<!-- until we get WP backend, let's loop through the data -->
<?php include('data/work-data.php'); ?>
	<div id="work-item-stage"></div>
	<div class="scrollhotspot left"></div>
	<div class="scrollhotspot right"></div>
	
	<div id="work-items-window">

		<?php if($detect->isMobile() && !$detect->isTablet()) { ?>
		<div class="nav-arrow-down animate-flicker">
			<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down-dark.png" alt="Media Loft" />
			<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down-dark.png" alt="Media Loft" />
		</div>	
		<?php } ?>	
		<div id="work-items" class="work-items">		
			<?php foreach ($workItems as $workItem) { ?>
			<?php $companyName = $workItem['company name']; ?>
			<div class="work-item" id="<?php echo replace_spaces(strtolower($companyName)); ?>" data-category="<?php echo replace_spaces($workItem['category']); ?>">
				<div class="work-cover">
					<div class="work-item-bgs">
						<div class="work-item-bg" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/images/work/thumbs/<?php echo $workItem['thumb resting']; ?>)"></div>
						<div class="work-item-bg-hover" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/images/work/thumbs/<?php echo $workItem['thumb hover']; ?>)"></div>
					</div>		
					<article class="work-summary">
						<div class="work-cta">
							<h2 class="work-title">
								<span class="company"><?php echo $companyName; ?></span>
								<span class="category"><?php echo $workItem['category']; ?></span>
							</h2>				
						</div>
					</article>		
				</div>
				<div class="work-details">
					<div class="work-carousel" data-work-item-id="<?php echo replace_spaces(strtolower($companyName)); ?>">
						<div class="carousel-items">
							<?php $index = 0; ?>
							<?php foreach ($workItem['slides'] as $slide) { ?>
							<?php $index++; ?>
							<div class="carousel-item">
								<div class="work-copy">
									<div class="copy-wrap">
										<p class="category"><?php echo $workItem['category']; ?></p>
										<p class="company"><?php echo $companyName; ?></p>
										<p class="title"><?php echo $workItem['label']; ?></p>
										<div class="description">
											<div class="desc-wrap">
												<?php echo $slide['description']; ?>
											</div>	
											<div class="textNav"></div>
										</div>
									</div>	
								</div>
								<div class="work-media">
									<?php if($slide['media'][0] == 'image'){ ?>
										<?php if($detect->isMobile() && !$detect->isTablet()) { ?>
											<div class="carousel-image" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/images/work/mobile/<?php echo $slide['media'][1]; ?>)"></div>
										<?php } else { ?>
											<div class="carousel-image" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/images/work/<?php echo $slide['media'][1]; ?>)"></div>
										<?php } ?>
									<?php } else { ?>
										<div class="video-bg-container <?php if(wp_is_mobile()) { echo 'mobile'; } ?>">
											<?php if(wp_is_mobile()) { ?><div class="full-bleed" style="background-image: url(<?php bloginfo('template_directory'); ?>/assets/images/work/mobile-video-posters/<?php echo $slide['media'][3]; ?>);"></div><?php } ?>
											<div class="video-start play-full-screen" data-video="<?php echo replace_spaces(strtolower($companyName)); ?>-video-<?php echo $index; ?>">
												<div></div>
												<div></div>
												<i></i>
											</div>
											
											<?php if(!$detect->isTablet() && !$detect->isMobile()) { ?>
											<video preload="none" class="work-video work-full-video" class="work-video">
												<source data-src="<?php echo $slide['media'][2]; ?>">
											</video>	
											<?php } else { ?>	
											<video preload="none" class="work-video work-full-video" class="work-video">
												<source data-src="<?php echo $slide['media-mobile'][0]; ?>">
											</video>											
											<?php } ?>			

											<!-- Only show loop if we are NOT in mobile -->
											<?php if(!$detect->isMobile()) { ?>
											<!-- first frame must match  -->
											<video preload="none" loop class="work-video work-loop-video" class="work-video">
												<source src="<?php echo $slide['media'][1]; ?>">
											</video>
											<?php } ?>
																						
											<a href="#" class="close-video"><i></i></a>
										</div>
									<?php } ?>
								</div>
							</div>
							<?php } ?>
							<?php if (isset($workItem['related'][0])) { ?>
							<div class="carousel-item related-content">
								<div class="work-copy">
									<div class="related-slide">
										<p class="similar">similar projects</p>
									</div>									
								</div>
								<div class="related-works">
									<?php if (isset($workItem['related'][0])) { ?>
									<div data-href="<?php echo $workItem['related'][0]['url']; ?>" class="related-work">
										<div class="full-bleed hover" style="background-image: url(<?php bloginfo('template_directory'); ?>/assets/images/work/<?php echo $workItem['related'][0]['background']; ?>_Hover_Similar.jpg);"></div>
										<div class="full-bleed resting" style="background-image: url(<?php bloginfo('template_directory'); ?>/assets/images/work/<?php echo $workItem['related'][0]['background']; ?>_Active_Similar.jpg);"></div>
										
										<div class="info">
											<p class="company"><?php echo $workItem['related'][0]['company']; ?></p>
											<p class="category"><?php echo $workItem['related'][0]['category']; ?></p>
										</div>	
									</div>
									<?php } else { ?>
									<div class="related-work empty">
										<span>back to work</span>
									</div>
									<?php } ?>
									<?php if (isset($workItem['related'][1])) { ?>
									<div data-href="<?php echo $workItem['related'][1]['url']; ?>" class="related-work">
										<div class="full-bleed hover" style="background-image: url(<?php bloginfo('template_directory'); ?>/assets/images/work/<?php echo $workItem['related'][1]['background']; ?>_Hover_Similar.jpg);"></div>
										<div class="full-bleed resting" style="background-image: url(<?php bloginfo('template_directory'); ?>/assets/images/work/<?php echo $workItem['related'][1]['background']; ?>_Active_Similar.jpg);"></div>
										
										<div class="info">
											<p class="company"><?php echo $workItem['related'][1]['company']; ?></p>
											<p class="category"><?php echo $workItem['related'][1]['category']; ?></p>
										</div>	
									</div>
									<?php } else { ?>
									<div class="related-work empty">
										<span><img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down.png" alt="Media Loft" />back to work</span>
									</div>
									<?php } ?>
								</div>							
							</div>
							<?php } ?>							
						</div>	
						
						<div class="carousel-nav">
							<ul>
								<!-- set up to be dynamic -->
							</ul>
						</div>
						<nav class="carousel-arrow-nav">
							<a class="prev" href="#"><img src="<?php echo IMG_DIR ?>/icons/left-carousel-arrow.png" alt=""></a>
							<a class="next" href="#"><img src="<?php echo IMG_DIR ?>/icons/right-carousel-arrow.png" alt=""></a>
						</nav>						
						<a href="#" class="close"><i></i></a>
					</div>				
				</div>							
			</div>
			<?php } ?>
		</div>
    </div>					
	<?php include('partials/work-menu.php'); ?>
<?php get_footer(); ?>