<?php
/* Bones Custom Post Type Example
This page walks you through creating 
a custom post type and taxonomies. You
can edit this one or copy the following code 
to create another one. 

I put this in a separate file so as to 
keep it organized. I find it easier to edit
and change things if they are concentrated
in their own file.

Developed by: Eddie Machado
URL: http://themble.com/bones/
*/

// Flush rewrite rules for custom post types
add_action( 'after_switch_theme', 'bones_flush_rewrite_rules' );

// Flush your rewrite rules
function bones_flush_rewrite_rules() {
	flush_rewrite_rules();
}

// let's create the function for the custom type
function custom_post_case_study() { 
	// creating (registering) the custom type 
	register_post_type( 'case_study', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Case Studies', 'bonestheme' ), /* This is the Title of the Group */
			'singular_name' => __( 'Case Study', 'bonestheme' ), /* This is the individual type */
			'all_items' => __( 'All Case Studies', 'bonestheme' ), /* the all items menu item */
			'add_new' => __( 'Add New', 'bonestheme' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Case Study', 'bonestheme' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'bonestheme' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Case Study', 'bonestheme' ), /* Edit Display Title */
			'new_item' => __( 'New Case Study', 'bonestheme' ), /* New Display Title */
			'view_item' => __( 'View Case Study', 'bonestheme' ), /* View Display Title */
			'search_items' => __( 'Search Case Study', 'bonestheme' ), /* Search Custom Type Title */ 
			'not_found' =>  __( 'Nothing found in the Database.', 'bonestheme' ), /* This displays if there are no entries yet */ 
			'not_found_in_trash' => __( 'Nothing found in Trash', 'bonestheme' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Case Studies will populate the Work page.', 'bonestheme' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 8, /* this is what order you want it to appear in on the left hand side menu */ 
			'menu_icon' => 'dashicons-format-aside', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'case_study', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'case_study', /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title' )
		) /* end of options */
	); /* end of register post type */
	
	/* this adds your post categories to your custom post type */
	register_taxonomy_for_object_type( 'category', 'case_study' );
	/* this adds your post tags to your custom post type */
	register_taxonomy_for_object_type( 'post_tag', 'case_study' );
	
}

// adding the function to the Wordpress init
add_action( 'init', 'custom_post_case_study');
	
// let's create the function for the custom type
function custom_post_video() { 
	// creating (registering) the custom type 
	register_post_type( 'video', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Videos', 'bonestheme' ), /* This is the Title of the Group */
			'singular_name' => __( 'Video', 'bonestheme' ), /* This is the individual type */
			'all_items' => __( 'All Videos', 'bonestheme' ), /* the all items menu item */
			'add_new' => __( 'Add New Video', 'bonestheme' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Video', 'bonestheme' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'bonestheme' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Video', 'bonestheme' ), /* Edit Display Title */
			'new_item' => __( 'New Video', 'bonestheme' ), /* New Display Title */
			'view_item' => __( 'View Video', 'bonestheme' ), /* View Display Title */
			'search_items' => __( 'Search Videos', 'bonestheme' ), /* Search Custom Type Title */ 
			'not_found' =>  __( 'Nothing found in the Database.', 'bonestheme' ), /* This displays if there are no entries yet */ 
			'not_found_in_trash' => __( 'Nothing found in Trash', 'bonestheme' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Videos can be pulled into other posts or pages.', 'bonestheme' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 8, /* this is what order you want it to appear in on the left hand side menu */ 
			'menu_icon' => 'dashicons-video-alt2', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'video', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'video', /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'editor' )
		) /* end of options */
	); /* end of register post type */
	
	/* this adds your post categories to your custom post type */
	register_taxonomy_for_object_type( 'category', 'video' );
	/* this adds your post tags to your custom post type */
	register_taxonomy_for_object_type( 'post_tag', 'video' );
	
}

// adding the function to the Wordpress init
add_action( 'init', 'custom_post_video');
	
