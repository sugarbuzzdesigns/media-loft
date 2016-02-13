<?php 
	global $detect; 
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js <?php if(wp_is_mobile()){ echo 'mobile'; } ?>">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<link rel="icon" type="image/png" href="<?php bloginfo('template_directory'); ?>/favicon.png">
	<script type="text/javascript" async src="//platform.twitter.com/widgets.js"></script>
	<?php wp_head(); ?>

	<style>
		#content {
			width: 80%;
			margin: 0 auto;
			padding: 150px 0 0;
		}

		.logo {
			position: static;
		}
	</style>
</head>

<body <?php body_class(); ?>>
	<div class="wrap">
		