<?php get_header(); ?>
<!-- until we get WP backend, let's loop through the data -->
<?php include('data/work-data.php'); ?>
	<div id="work-items-window">
		<div id="work-items" class="work-items">
			<?php foreach ($workItems as $workItem) { ?>
			<?php $companyName = $workItem['company name']; ?>
			<div class="work-item" id="<?php echo replace_spaces(strtolower($companyName)); ?>" data-category="<?php echo $workItem['category']; ?>">
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
							<?php foreach ($workItem['slides'] as $slide) { ?>
							<div class="carousel-item">
								<div class="work-copy">
									<p class="label"><?php echo $slide['label']; ?></p>
									<p class="company"><?php echo $companyName; ?></p>
									<p class="description"><?php echo $slide['description']; ?></p>
								</div>
								<div class="work-media">
									<?php if($slide['media'][0] == 'image'){ ?>
										<div class="carousel-image" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/images/work/Dell_01_Saturated.jpg)"></div>
									<?php } else { ?>
										<!-- video here -->
									<?php } ?>
								</div>
							</div>
							<?php } ?>
						</div>	
						
						<div class="carousel-nav">
							<ul>
								<!-- set up to be dynamic -->
								<li class="active"></li>
								<li></li>
								<li></li>
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