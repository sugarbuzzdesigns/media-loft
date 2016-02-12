<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

<?php $page_title = get_the_title(); ?>

<?php endwhile; endif; wp_reset_postdata(); ?>

<div class="gallery">
	<h1 class="gallery-header"><span><?php echo $page_title; ?></span></h1>
	<div class="gallery-inner grid grid-pad">
		<?php get_template_part('partials/content/loop-video-gallery'); ?>
	</div>
</div>

<div class="gallery-overlay">
	<a href="#" class="close-video"><i></i></a>
	<div class="gallery-overlay-item">
		<div class="video-wrap">
			<div class="video-start play-full-screen">
				<div></div>
				<div></div>
				<i></i>
			</div>			
		</div>
		<div class="copy grid grid-pad">
			<div class="col col-5-12">
				<div class="content">
					<p class="title">Video Number Four</p>
					<p class="category">staging</p><a href="#" class="share-link" target="_blank"><i></i>Share Link</a>
				</div>
			</div>
			<div class="col col-7-12">
				<div class="content">
					<p class="description"></p>			
				</div>
			</div>
		</div>
	</div>
	<nav>
		<a href="#" class="prev"></a>
		<a href="#" class="next"></a>
	</nav>	
</div>

<!-- <div class="gallery-overlay-transition"></div> -->