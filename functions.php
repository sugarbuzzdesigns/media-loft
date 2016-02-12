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
 * Get the bootstrap!
 */
if ( file_exists(  __DIR__ . '/cmb2/init.php' ) ) {
  require_once  __DIR__ . '/cmb2/init.php';
} elseif ( file_exists(  __DIR__ . '/CMB2/init.php' ) ) {
  require_once  __DIR__ . '/CMB2/init.php';
}

if (is_admin()){
	function my_remove_meta_boxes() {
		// remove_meta_box('slugdiv', 'case_study', 'normal');
	}

	add_action( 'admin_menu', 'my_remove_meta_boxes' );

	require_once('includes/custom_post_types.php');
	require_once('includes/cmb2_boxes.php');
}


/**
 * Includes
 */
require_once('includes/Mobile_Detect.php');

$GLOBALS['detect'] = new Mobile_Detect;

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
	global $detect;

	// wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/assets/js/vendor/modernizr.js', array( 'jquery' ), true );
	// wp_enqueue_script( 'jquery-ui.js', get_template_directory_uri() . '/assets/js/vendor/jquery-ui.js', array( 'jquery' ), true );
	// wp_enqueue_script( 'jquery-mousewheel', get_template_directory_uri() . '/assets/js/vendor/jquery-mousewheel.js', array( 'jquery' ), true );
	// wp_enqueue_script( 'jquery-kinetic', get_template_directory_uri() . '/assets/js/vendor/jquery-kinetic.js', array( 'jquery' ), true );
	// wp_enqueue_script( 'jquery-smoothscroll', get_template_directory_uri() . '/assets/js/vendor/jquery-smoothscroll.js', array( 'jquery' ), true );
	wp_enqueue_script( 'ml-vendor', get_template_directory_uri() . '/assets/js/build/vendor/vendor.min.js', array( 'jquery' ), true );
	wp_enqueue_script( 'ml-libraries', get_template_directory_uri() . '/assets/js/src/libs/libs.min.js', array( 'jquery' ), true );
	wp_enqueue_script( 'medialoft-script', get_template_directory_uri() . '/assets/js/build/ml.min.js', array( 'jquery' ), true );

	if(is_front_page() || is_page('home')){
		wp_enqueue_script( 'home', get_template_directory_uri() . '/assets/js/build/modules/home.min.js', array( 'jquery' ), true );		
	}

	if(is_page('work')){
		wp_enqueue_script( 'work', get_template_directory_uri() . '/assets/js/src/modules/work.js', array( 'jquery' ), true );		
	}

	if(is_page('about')){
		wp_enqueue_script( 'about', get_template_directory_uri() . '/assets/js/src/modules/about.js', array( 'jquery' ), true );		
		wp_enqueue_script( 'timeline', get_template_directory_uri() . '/assets/js/src/modules/timeline.js', array( 'jquery' ), true );		
		wp_enqueue_script( 'tiles-clients', get_template_directory_uri() . '/assets/js/src/modules/about-tiles-clients.js', array( 'jquery' ), true );
		wp_enqueue_script( 'tiles-people', get_template_directory_uri() . '/assets/js/src/modules/about-tiles-people.js', array( 'jquery' ), true );		
	}	

	if(is_page('contact')){
		wp_enqueue_script( 'contact', get_template_directory_uri() . '/assets/js/src/modules/contact.js', array( 'jquery' ), true );		
	}	

	if(is_page('services')){
		wp_enqueue_script( 'services', get_template_directory_uri() . '/assets/js/src/modules/services.js', array( 'jquery' ), true );		
	}		

	if(is_home()){
		wp_enqueue_script( 'blog', get_template_directory_uri() . '/assets/js/src/modules/blog.js', array( 'jquery' ), true );		
	}

	if(is_page('test')){
		wp_enqueue_script( 'test', get_template_directory_uri() . '/assets/js/src/modules/test.js', array( 'jquery' ), true );		
	}	

	$dataToBePassed = array(
	    'home'      => get_stylesheet_directory_uri(),
	    'device'	=> getDevice(),
	    'isMobile' 	=> $detect->isMobile() == '1' ? true : false,
	    'isTablet'	=> $detect->isTablet() == '1' ? true : false,
	    'isTouch'	=> ($detect->isTablet() || $detect->isMobile()),
	    'isDesktop' => (!$detect->isTablet() && !$detect->isMobile())
	);	

	wp_localize_script( 'medialoft-script', 'ML_vars', $dataToBePassed );

}
add_action( 'wp_footer', 'medialoft_scripts' );

function medialoft_styles(){
	wp_enqueue_style( 'medialoft-style', get_stylesheet_uri() );				
}

add_action( 'wp_enqueue_scripts', 'medialoft_styles' );

function load_admin_styles() {
	wp_enqueue_style( 'admin_css', get_template_directory_uri() . '/assets/css/ml-admin-style.css', '1.0.0' );
} 

add_action( 'admin_print_styles', 'load_admin_styles' );

/**
 * Detct device
 */

function getDevice(){
	global $detect;
	
	$device;

	if ( $detect->isMobile() ) {
		$device = 'mobile';
	}

	if( $detect->isTablet() ){
		$device = 'tablet';
	}

	if(!$detect->isTablet() && !$detect->isMobile()){
		$device = 'desktop';
	}	

	return $device;
}

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


// Add specific CSS class by filter
add_filter( 'body_class', 'my_class_names' );
function my_class_names( $classes ) {
	// add 'class-name' to the $classes array
	if(is_page('home')){
		$classes[] = 'home';
	}

	// return the $classes array
	return $classes;
}


show_admin_bar( false );


function replace_howdy($wp_admin_bar){
	$my_account = $wp_admin_bar->get_node('my-account');
	$newtitle = str_replace('Howdy,', 'Welcome,', $my_account->title);
	$wp_admin_bar->add_node(array(
		'id' => 'my-account',
		'title' => $newtitle,
	));
	}

add_filter('admin_bar_menu', 'replace_howdy', 25);

add_action( 'admin_bar_menu', 'remove_wp_logo', 999 );

function remove_wp_logo( $wp_admin_bar ) {
	$wp_admin_bar->remove_node( 'wp-logo' );
	$wp_admin_bar->remove_node( 'comments' );	
}

function edit_admin_menus() {
    global $menu;
     
    $menu[5][0] = 'Blog Posts'; // Change Posts to Recipes
}

function remove_page_fields() {
	remove_meta_box( 'categorydiv' , 'case_study' , 'normal' ); //removes comments status
	remove_meta_box( 'tagsdiv-post_tag' , 'case_study' , 'normal' ); //removes comments

	// remove_meta_box( 'pageparentdiv' , 'page' , 'normal' ); //removes comments	
	remove_meta_box( 'postimagediv' , 'page' , 'normal' ); //removes comments status

	remove_submenu_page( 'edit.php?post_type=case_study', 'edit-tags.php?taxonomy=category&amp;post_type=case_study' );	
	remove_submenu_page( 'edit.php?post_type=case_study', 'edit-tags.php?taxonomy=post_tag&amp;post_type=case_study' );
}
// add_action( 'admin_menu' , 'remove_page_fields' );
add_action( 'admin_menu', 'edit_admin_menus' );

function custom_menu_page_removing() {
    remove_menu_page( 'themes.php' );
    remove_menu_page( 'upload.php' );
	// remove_menu_page( 'edit.php?post_type=page' ); 
	remove_menu_page( 'edit-comments.php' ); 
	// remove_menu_page( 'plugins.php' );                //Plugins
  	remove_menu_page( 'users.php' );                  //Users
  	remove_menu_page( 'tools.php' );                  //Tools
  	remove_menu_page( 'options-general.php' );        //Settings	
}
add_action( 'admin_menu', 'custom_menu_page_removing' );

// disable content editor for page template
function wpcs_disable_content_editor() {
	$contactId = get_id_by_slug('contact');

	if(isset($_GET['post'])){
    	$post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] || null;

	    // if( !isset( $post_id ) || $post_id != $contactId ) return;		
	}
?>
	<script>
		console.log('<?php echo $post_id; ?>');
	</script>
<?php 
    remove_post_type_support( 'page', 'editor' );
}
// add_action( 'admin_init', 'wpcs_disable_content_editor' );
function show_post_id_in_edit(){
	if(isset($_GET['post'])){
    	$post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] || null;
    }

	
}

add_action( 'admin_menu', 'show_post_id_in_edit' );

// remove unwanted dashboard widgets for relevant users
function wptutsplus_remove_dashboard_widgets() {
    $user = wp_get_current_user();
    
	remove_action('welcome_panel', 'wp_welcome_panel');

    remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_secondary', 'dashboard', 'side' );
}
add_action( 'wp_dashboard_setup', 'wptutsplus_remove_dashboard_widgets' );

// add new dashboard widgets
function wptutsplus_add_dashboard_widgets() {
	$user = wp_get_current_user();

	$user_name = $user->user_nicename;

    wp_add_dashboard_widget( 'wptutsplus_dashboard_welcome', 'Welcome ' . $user_name, 'wptutsplus_add_welcome_widget' );
}
function wptutsplus_add_welcome_widget(){ ?> <?php }
 
add_action( 'wp_dashboard_setup', 'wptutsplus_add_dashboard_widgets' );




// Usage:
// get_id_by_slug('any-page-slug');

function get_id_by_slug($page_slug) {
	$page = get_page_by_path($page_slug);
	if ($page) {
		return $page->ID;
	} else {
		return null;
	}
}


function jp_exclude_pages_from_admin($query) {

$pagesToExclude = array(
	get_id_by_slug('blog'),
	get_id_by_slug('about'),
	get_id_by_slug('home'),
	get_id_by_slug('services'),
	get_id_by_slug('work')
);

?>

<?php 
 
	if ( ! is_admin() )
		return $query;
 
	global $pagenow, $post_type;
 
	if ( !current_user_can( 'administrator' ) && $pagenow == 'edit.php' && $post_type == 'page' )
		$query->query_vars['post__not_in'] = $pagesToExclude; // Enter your page IDs here
}

// add_filter( 'parse_query', 'jp_exclude_pages_from_admin' );



add_action('login_head', 'ml_custom_login_logo');
function ml_custom_login_logo() {
    echo '<style type="text/css">
    h1 a { background-image:url('.get_stylesheet_directory_uri().'/assets/images/mobile/logos/ML_Logo_@2x.png) !important; background-size: 100% !important;height: 100px !important; width: 311px !important; margin-bottom: 0 !important; padding-bottom: 0 !important; }
    .login form { margin-top: 10px !important; }
	.wp-core-ui .button.button-primary {
	    background: #DC4034;
	    border-color: #D23B2F;
	    text-shadow:none;
	}    
	.wp-core-ui .button.button-primary:hover {
		background: #CA3024;
		border-color: #D23B2F;
	}
    </style>';
}


// Add Shortcode
function add_videos( $atts ) {

	// Attributes
	extract( shortcode_atts(
		array(
			'ids' => '',
		), $atts )
	);

	ob_start();
	$query = new WP_Query( array(
        'post_type' => 'video',
        'posts_per_page' => -1,
        'order' => 'ASC',
        'orderby' => 'title',
        'post__in' => explode(',', $ids)
    ));
    if ( $query->have_posts() ) { ?>
        <?php while ( $query->have_posts() ) : $query->the_post(); ?>
			<?php get_template_part('partials/content/loop-video-gallery'); ?> 
        <?php endwhile; wp_reset_postdata(); ?>
    <?php $myvariable = ob_get_clean();
    
    return $myvariable;	
	}

}
add_shortcode( 'gallery_videos', 'add_videos' );

function seoUrl($string) {
    //Lower case everything
    $string = strtolower($string);
    //Make alphanumeric (removes all other characters)
    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
    //Clean up multiple dashes or whitespaces
    $string = preg_replace("/[\s-]+/", " ", $string);
    //Convert whitespaces and underscore to dash
    $string = preg_replace("/[\s_]/", "-", $string);
    return $string;
}