<?php get_header(); ?>
<!-- until we get WP backend, let's loop through the data -->
<?php include('data/work-data.php'); ?>
	<div id="work-items-window">
		<div id="work-items" class="work-items">
			<?php foreach ($workItems as $workItem) { ?>
			<?php $companyName = $workItem['company name']; ?>
			<div class="work-item" id="<?php echo replace_spaces(strtolower($companyName)); ?>" data-category="<?php echo replace_spaces($workItem['category']); ?>">
				<div class="work-item-bg" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/images/work/thumbs/<?php echo $workItem['thumb resting']; ?>)"></div>
				<div class="work-item-bg-hover" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/images/work/thumbs/<?php echo $workItem['thumb hover']; ?>)"></div>
				<article class="work-summary">
					<div class="cta">
						<h2 class="tagline work-title">
							<span><?php echo $companyName; ?></span>
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
									<p class="label"><?php echo $slide['label']; ?></p>
									<p class="company"><?php echo $companyName; ?></p>
									<p class="description"><?php echo $slide['description']; ?></p>
								</div>
								<div class="work-media">
									<?php if($slide['media'][0] == 'image'){ ?>
										<div class="carousel-image" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/images/work/<?php echo $slide['media'][1]; ?>)"></div>
									<?php } else { ?>
									<?php if(!wp_is_mobile()){ ?>
										<div class="video-bg-container">
											<div class="video-start play-full-screen" data-video="<?php echo replace_spaces(strtolower($companyName)); ?>-video-<?php echo $index; ?>">
												<div></div>
												<div></div>
											</div>
											<video loop class="work-video work-full-video" id="<?php echo replace_spaces(strtolower($companyName)); ?>-video-<?php echo $index; ?>" class="work-video">
												<source data-src="<?php bloginfo('template_directory'); ?>/assets/videos/work/<?php echo $slide['media'][2]; ?>">
											</video>											

											<!-- first frame must match  -->
											<video loop class="work-video work-loop-video" id="<?php echo replace_spaces(strtolower($companyName)); ?>-video-loop-<?php echo $index; ?>" class="work-video">
												<source src="<?php bloginfo('template_directory'); ?>/assets/videos/work/<?php echo $slide['media'][1]; ?>">
											</video>
																						
											<a href="#" class="close-video"><i></i></a>
										</div>
									<?php } ?>	
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
						<a href="#" class="close"><i></i></a>
					</div>
				</article>							
			</div>
			<?php } ?>
		</div>		
	</div>						
	<?php include('partials/work-menu.php'); ?>
	<!-- style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/videos/work/posters/<?php echo $slide['media'][3]; ?>);" -->
<?php get_footer(); ?>