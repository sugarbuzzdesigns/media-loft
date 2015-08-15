<?php
/**
 * SET UP CONTANTS
 */
// Asset urls
define('BASE_URL', get_site_url());

define('VID_DIR', get_bloginfo('template_directory') . '/assets/videos');

define('IMG_DIR', get_bloginfo('template_directory') . '/assets/images');

define('MOBILE_IMG', get_bloginfo('template_directory') . '/assets/images/mobile');

/**
 * Media Loft functions and definitions
 */

if ( ! function_exists( 'medialoft_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 *
 * @since Media Loft 1.0
 */
function medialoft_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on medialoft, use a find and replace
	 * to change 'medialoft' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'medialoft', get_template_directory() . '/languages' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * See: https://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 825, 510, true );

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu',      'medialoft' ),
		'social'  => __( 'Social Links Menu', 'medialoft' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link', 'gallery', 'status', 'audio', 'chat'
	) );
}
endif; // medialoft_setup
add_action( 'after_setup_theme', 'medialoft_setup' );

/**
 * JavaScript Detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 *
 * @since Media Loft 1.0
 */
function medialoft_javascript_detection() {
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'medialoft_javascript_detection', 0 );

/**
 * Enqueue scripts and styles.
 *
 * @since Media Loft 1.0
 */
function medialoft_scripts() {
	// Load our main stylesheet.
	wp_enqueue_style( 'medialoft-style', get_stylesheet_uri() );
	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/assets/js/vendor/modernizr.js', array( 'jquery' ), true );
	wp_enqueue_script( 'jquery-ui-.js', get_template_directory_uri() . '/assets/js/vendor/jquery-ui.js', array( 'jquery' ), true );
	wp_enqueue_script( 'jquery-mousewheel', get_template_directory_uri() . '/assets/js/vendor/jquery-mousewheel.js', array( 'jquery' ), true );
	wp_enqueue_script( 'jquery-kinetic', get_template_directory_uri() . '/assets/js/vendor/jquery-kinetic.js', array( 'jquery' ), true );
	wp_enqueue_script( 'jquery-smoothscroll', get_template_directory_uri() . '/assets/js/vendor/jquery-smoothscroll.js', array( 'jquery' ), true );
	wp_enqueue_script( 'medialoft-script', get_template_directory_uri() . '/assets/js/ml.js', array( 'jquery' ), true );

	if(is_page('work')){
		wp_enqueue_script( 'work', get_template_directory_uri() . '/assets/js/modules/work.js', array( 'jquery' ), true );		
	}

	if(is_page('about')){
		wp_enqueue_script( 'about', get_template_directory_uri() . '/assets/js/modules/about.js', array( 'jquery' ), true );		
	}	

	if(is_page('contact')){
		wp_enqueue_script( 'contact', get_template_directory_uri() . '/assets/js/modules/contact.js', array( 'jquery' ), true );		
	}	
}
add_action( 'wp_enqueue_scripts', 'medialoft_scripts' );

/**
 * Remove WP admin bar
 */
add_action('get_header', 'remove_admin_login_header');
function remove_admin_login_header() {
	remove_action('wp_head', '_admin_bar_bump_cb');
}

//Page Slug Body Class
function add_slug_body_class( $classes ) {
	global $post;
	
	if ( isset( $post ) ) {
		$classes[] = $post->post_type . '-' . $post->post_name;
	}
	return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );

function replace_spaces($string) {
    $string = str_replace(" ", "-", $string);
    return $string;
}