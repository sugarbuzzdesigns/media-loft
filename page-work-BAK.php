<?php get_header(); ?>
<!-- until we get WP backend, let's loop through the data -->
<?php include('data/work-data.php'); ?>
	<div id="work-items-window">
<!-- 		<div id="explore-work">
			<span>explore our work</span>
			<div class="nav-arrow-right animate-flicker">
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down-dark.png" alt="Media Loft" />
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down-dark.png" alt="Media Loft" />
			</div>	
		</div>		 -->
		<div id="work-items" class="work-items">		
			<?php foreach ($workItems as $workItem) { ?>
			<?php $companyName = $workItem['company name']; ?>
			<div class="work-item" id="<?php echo replace_spaces(strtolower($companyName)); ?>" data-category="<?php echo replace_spaces($workItem['category']); ?>">
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
				<article class="work-details">
					<div class="work-carousel">
						<div class="carousel-items">
							<?php $index = 0; ?>
							<?php foreach ($workItem['slides'] as $slide) { ?>
							<?php $index++; ?>
							<div class="carousel-item">
								<div class="work-copy">
									<p class="category"><?php echo $workItem['category']; ?></p>
									<p class="company"><?php echo $companyName; ?></p>
									<p class="title"><?php echo $workItem['label']; ?></p>
									<div class="description">
										<?php echo $slide['description']; ?>
										<div class="textNav"></div>
									</div>

									<nav class="carousel-arrow-nav">
										<a class="prev disabled" href="#"><img src="<?php echo IMG_DIR ?>/icons/left-carousel-arrow.png" alt=""></a>
										<a class="next" href="#"><img src="<?php echo IMG_DIR ?>/icons/right-carousel-arrow.png" alt=""></a>
									</nav>
								</div>
								<div class="work-media">
									<?php if($slide['media'][0] == 'image'){ ?>
										<div class="carousel-image" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/images/work/<?php echo $slide['media'][1]; ?>)"></div>
									<?php } else { ?>
										<div class="video-bg-container <?php if(wp_is_mobile()) { echo 'mobile'; } ?>">
											<div class="full-bleed" style="background-image: url(<?php bloginfo('template_directory'); ?>/assets/images/work/mobile-video-posters/<?php echo $slide['media'][3]; ?>);"></div>
											<div class="video-start play-full-screen" data-video="<?php echo replace_spaces(strtolower($companyName)); ?>-video-<?php echo $index; ?>">
												<div></div>
												<div></div>
											</div>
											
											<video preload="none" class="work-video work-full-video" id="<?php echo replace_spaces(strtolower($companyName)); ?>-video-<?php echo $index; ?>" class="work-video">
												<source data-src="<?php bloginfo('template_directory'); ?>/assets/videos/work/<?php echo $slide['media'][2]; ?>">
											</video>					


											<!-- first frame must match  -->
											<?php if(!wp_is_mobile()) { ?>
											<video loop preload="none" class="work-video work-loop-video" id="<?php echo replace_spaces(strtolower($companyName)); ?>-video-loop-<?php echo $index; ?>" class="work-video">
												<source src="<?php bloginfo('template_directory'); ?>/assets/videos/work/<?php echo $slide['media'][1]; ?>">
											</video>
											<?php } ?>	
																						
											<a href="#" class="close-video"><i></i></a>
										</div>
									<?php } ?>
								</div>
							</div>
							<?php } ?>
							<div class="carousel-item related-content">
								<div class="work-copy">
									<div class="related-slide">
										<p class="similar">similar projects</p>
										<nav class="carousel-arrow-nav">
											<a class="prev disabled" href="#"><img src="<?php echo IMG_DIR ?>/icons/left-carousel-arrow.png" alt=""></a>
											<a class="next" href="#"><img src="<?php echo IMG_DIR ?>/icons/right-carousel-arrow.png" alt=""></a>
										</nav>
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
									<?php } ?>
								</div>							
							</div>							
						</div>	
						
						<div class="carousel-nav">
							<ul>
								<!-- set up to be dynamic -->
							</ul>
						</div>
						<a href="#" class="close"><i></i></a>
					</div>
				</article>							
			</div>
			<?php } ?>
		</div>		
	</div>						
	<?php include('partials/work-menu.php'); ?>
<?php get_footer(); ?>