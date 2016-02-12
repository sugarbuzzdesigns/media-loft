	</div>

	<?php
	   /* Always have wp_footer() just before the closing </body>
	    * tag of your theme, or you will break many plugins, which
	    * generally use this hook to reference JavaScript files.
	    */
	    wp_footer();
	?>

	<script type="text/javascript" async src="<?php bloginfo('template_directory'); ?>/assets/js/src/modules/video-gallery.js"></script>
</body>