<?php
/*
 Template Name: Video Galleries Template
*/
?>

<?php get_header('video-gallery'); ?>

<?php if(!$post->post_parent){ ?>		
	<?php get_template_part( 'partials/content/video', 'galleries' ); ?>
<?php } else { ?>
	<?php get_template_part( 'partials/content/video', 'gallery' ); ?>
<?php } ?>

<?php get_footer('video-gallery'); ?>
