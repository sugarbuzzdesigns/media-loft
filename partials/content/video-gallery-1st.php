<?php 
// The Query
$the_query = new WP_Query( array( 'post_type' => 'video' ) );

if ( $the_query->have_posts() ) {
	while ( $the_query->have_posts() ) {
		$the_query->the_post();

		the_content();

?>

<div class="gallery">
	<?php 
	$post = get_post(89); 
	echo $post->post_title;
	?>
	<div class="gallery-inner grid grid-pad">
		<div class="gallery-item col-1-3">
			<div class="content">
				<div class="video-wrap">
				<video id="example_video_1" class="video-js vjs-default-skin"
					controls width="auto" height="auto">

					<source src="https://player.vimeo.com/external/137640251.hd.mp4?s=d687eac0921c6ac5b1773c8733d811a2&profile_id=113" type='video/mp4' />
					<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
				</video>
				</div>
				<p class="title"><?php echo get_the_title(); ?></p>
				<p class="category">Staging</p>
			</div>
		</div>								
	</div>
</div>


<?php 

		}

} else { ?>
	<h2>Please Ad Some Videos</h2>
<?php  } 
/* Restore original Post Data */
wp_reset_postdata();