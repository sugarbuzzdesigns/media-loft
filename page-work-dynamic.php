<?php
/*
 Template Name: Work Page Dynamic
*/
?>

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
		
		<?php 

		$index = 0;
		$query = new WP_Query( array(
		    'post_type' => 'case_study',
		    'posts_per_page' => -1,
		));	

		if( $query->have_posts() ) {
			
			while ( $query->have_posts() ) : $query->the_post(); 

			$index++; 
			$companyName = get_the_title();
			$cats = get_the_category();

			// landing thumbs
			$thumb_resting = get_post_meta( get_the_ID(), 'case-study-cover-image', true );
			$thumb_hover = get_post_meta( get_the_ID(), 'case-study-cover-image-hover', true ); 

			// case study videos
			$loop_video = get_post_meta( get_the_ID(), 'case-study-loop-video', true ); 
			$full_video = get_post_meta( get_the_ID(), 'case-study-full-video-desktop', true ); 
			$full_video_mobile = get_post_meta( get_the_ID(), 'case-study-full-video-mobile', true ); 

			// case study copy
			$copy_title = get_post_meta( get_the_ID(), 'medialoft_desc-title-text', true);
			$copy_desc = get_post_meta( get_the_ID(), 'medialoft_desc-text', true);

			// Case Study SS Images
			$ss_images = get_post_meta( get_the_ID(), 'wiki_test_repeat_group', true );

			foreach ( (array) $entries as $key => $entry ) {

			    $img = $title = $desc = $caption = '';

			    if ( isset( $entry['title'] ) )
			        $title = esc_html( $entry['title'] );

			    if ( isset( $entry['description'] ) )
			        $desc = wpautop( $entry['description'] );

			    if ( isset( $entry['image_id'] ) ) {
			        $img = wp_get_attachment_image( $entry['image_id'], 'share-pick', null, array(
			            'class' => 'thumb',
			        ) );
			    }
			    $caption = isset( $entry['image_caption'] ) ? wpautop( $entry['image_caption'] ) : '';

			    // Do something with the data
			}			

			?>
			
			

			<div class="work-item" id="<?php echo replace_spaces(strtolower($companyName)); ?>" data-category="<?php echo $cats[0]->name; ?>">
				
				<div class="work-cover">
					<div class="work-item-bgs">
						<div class="work-item-bg" style="background-image:url(<?php echo $thumb_resting; ?>)"></div>
						<div class="work-item-bg-hover" style="background-image:url(<?php echo $thumb_hover; ?>)"></div>
					</div>		
					<article class="work-summary">
						<div class="work-cta">
							<h2 class="work-title">
								<span class="company"><?php echo $companyName; ?></span>
								<span class="category"><?php echo $cats[0]->name; ?></span>
							</h2>				
						</div>
					</article>		
				</div>

				<div class="work-details">
					<div class="work-carousel" data-work-item-id="<?php echo replace_spaces(strtolower($companyName)); ?>">
						<div class="carousel-items">
							<div class="carousel-item">
								<div class="work-copy">
									<div class="copy-wrap">
										<p class="category"><?php echo $cats[0]->name; ?></p>
										<p class="company"><?php echo $companyName; ?></p>
										<p class="title"><?php echo $copy_title; ?></p>
										<div class="description">
											<div class="desc-wrap">
												<?php echo $copy_desc; ?>
											</div>	
											<div class="textNav"></div>
										</div>
									</div>	
								</div>
								<div class="work-media">
									<div class="video-bg-container <?php if(wp_is_mobile()) { echo 'mobile'; } ?>">
										<!-- <?php if(wp_is_mobile()) { ?><div class="full-bleed" style="background-image: url(<?php bloginfo('template_directory'); ?>/assets/images/work/mobile-video-posters/<?php echo $slide['media'][3]; ?>);"></div><?php } ?> -->
										<?php if(wp_is_mobile()) { ?><div class="full-bleed"></div><?php } ?>
										<div class="video-start play-full-screen" data-video="<?php echo replace_spaces(strtolower($companyName)); ?>-video-<?php echo $index; ?>">
											<div></div>
											<div></div>
											<i></i>
										</div>
										
										<?php if(!$detect->isTablet() && !$detect->isMobile()) { ?>
										<video class="work-video work-full-video video-js vjs-default-skin" data-src="<?php echo $full_video; ?>">
										</video>	
										<?php } else { ?>	
										<video class="work-video work-full-video video-js vjs-default-skin" data-src="<?php echo $full_video_mobile; ?>">
										</video>											
										<?php } ?>			

										<!-- Only show loop if we are NOT in mobile -->
										<?php if(!$detect->isMobile()) { ?>
										<!-- first frame must match  -->
										<video loop class="work-video work-loop-video video-js vjs-default-skin" class="work-video" data-src="<?php echo $loop_video; ?>">
										</video>
										<?php } ?>
																					
										<a href="#" class="close-video"><i></i></a>
									</div>									
								</div>								
							</div>
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
			
			<?php endwhile; wp_reset_postdata(); 
		} ?>

    </div>					
	<?php include('partials/work-menu.php'); ?>
<?php get_footer(); ?>