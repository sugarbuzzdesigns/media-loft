<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div class="base-url" style="display: none;"><?php echo get_site_url(); ?></div>
	<div class="wrap m-all">
		<?php if(is_front_page()) { ?>
			<a id="main-logo" class="logo" href="/">
				<img src="<?php bloginfo('template_directory'); ?>/assets/images/mobile/logos/ML_Logo_@2x.png" alt="Media Loft" />
			</a>
		<?php } else { ?>
			<a id="main-logo" class="logo interior" href="/">
				<img src="<?php bloginfo('template_directory'); ?>/assets/images/mobile/logos/Logo_Red_@2x.png" alt="Media Loft" />
			</a>
		<?php } ?>