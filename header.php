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
</head>

<body <?php body_class(); ?>>
	<?php include('partials/loader.php'); ?>
	<div class="wrap">
		<?php if(is_front_page()) { ?>
			<a id="main-logo" class="logo" href="<?php echo get_site_url(); ?>/">
				<img src="<?php bloginfo('template_directory'); ?>/assets/images/mobile/logos/ML_Logo_@2x.png" alt="Media Loft" />
			</a>
		<?php } else { ?>
			<a id="main-logo" class="logo interior" href="<?php echo get_site_url(); ?>/">
				<img src="<?php bloginfo('template_directory'); ?>/assets/images/mobile/logos/Logo_Red_@2x.png" alt="Media Loft" />
			</a>
		<?php } ?>