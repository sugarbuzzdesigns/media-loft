<?php

require_once('cmb2/show_on_child_metabox.php');

add_action( 'cmb2_admin_init', 'cmb2_case_study_metaboxes' );
add_action( 'cmb2_admin_init', 'cmb2_page_specific_metaboxes' );
add_action( 'cmb2_admin_init', 'cmb2_video_metaboxes' );
/**
 * Define the metabox and field configurations.
 */
function cmb2_case_study_metaboxes() {

    // Start with an underscore to hide fields from custom fields list
    $prefix = 'medialoft';

    /**
     * Initiate the Copy metabox
     */
    $cmb_copy = new_cmb2_box( array(
        'id'            => 'case_study_copy_metabox',
        'title'         => __( 'Copy', 'cmb2' ),
        'object_types'  => array( 'case_study', ), // Post type
        'context'       => 'normal',
        'priority'      => 'high',
        'show_names'    => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        'closed'     => true // Keep the metabox closed by default
    ) );

    // Regular text field
    $cmb_copy->add_field( array(
        'name'       => __( 'Category', 'cmb2' ),
        'desc'       => __( 'Video, Staging, Interactive, etc.', 'cmb2' ),
        'id'         => $prefix . 'category-text',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));

    $cmb_copy->add_field( array(
        'name'       => __( 'Description Title', 'cmb2' ),
        'desc'       => __( 'Title that shows below the company name when a case study is opened.', 'cmb2' ),
        'id'         => $prefix . 'desc-title-text',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));    

    $cmb_copy->add_field( array(
        'name'       => __( 'Full Description', 'cmb2' ),
        'desc'       => __( 'Full Description of the case study that shows when a case study is opened.', 'cmb2' ),
        'id'         => $prefix . 'desc-text',
        'type'       => 'textarea',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));


    /**
     * Initiate the Copy metabox
     */
    $cmb_cover_images = new_cmb2_box( array(
        'id'            => 'case_study_cover_images_metabox',
        'title'         => __( 'Cover Image', 'cmb2' ),
        'object_types'  => array( 'case_study', ), // Post type
        'context'       => 'normal',
        'priority'      => 'high',
        'show_names'    => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        'closed'     => true // Keep the metabox closed by default
    ) );   

	$cmb_cover_images->add_field( array(
	    'name'    => 'Cover Image Resting',
	    'desc'    => 'Upload the main cover image for the case study',
	    'id'      => 'case-study-cover-image',
	    'type'    => 'file',
	    // Optional:
	    'options' => array(
	        'url' => false, // Hide the text input for the url
	        'add_upload_file_text' => 'Add Cover Image (Resting State)' // Change upload button text. Default: "Add or Upload File"
	    ),
	) );     

	$cmb_cover_images->add_field( array(
	    'name'    => 'Cover Image Hover',
	    'desc'    => 'Upload the hover state for the main cover image',
	    'id'      => 'case-study-cover-image-hover',
	    'type'    => 'file',
	    // Optional:
	    'options' => array(
	        'url' => false, // Hide the text input for the url
	        'add_upload_file_text' => 'Add Cover Image (Hover State)' // Change upload button text. Default: "Add or Upload File"
	    ),
	) ); 		






	/**
     * Initiate the Copy metabox
     */
    $cmb_videos = new_cmb2_box( array(
        'id'            => 'case_study_videos_metabox',
        'title'         => __( 'Videos', 'cmb2' ),
        'object_types'  => array( 'case_study', ), // Post type
        'context'       => 'normal',
        'priority'      => 'high',
        'show_names'    => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        'closed'     => true // Keep the metabox closed by default
    ) );   

	$cmb_videos->add_field( array(
	    'name'    => 'Loop Video',
	    'desc'    => 'Upload the loop video that plays on desktop when a case study is opened.',
	    'id'      => 'case-study-loop-video',
	    'type'    => 'text_url'
	));     

	$cmb_videos->add_field( array(
	    'name'    => 'Main Video (Desktop)',
	    'desc'    => 'Upload the main video that plays on desktop when you click play on a loop video.',
	    'id'      => 'case-study-full-video-desktop',
	    'type'    => 'text_url'
	)); 

	$cmb_videos->add_field( array(
	    'name'    => 'Main Video (Mobile)',
	    'desc'    => 'Upload the main video that plays on mobile.',
	    'id'      => 'case-study-full-video-mobile',
	    'type'    => 'text_url'
	)); 	



	/**
     * Initiate the SS metabox
     */
    $cmb_ss_images = new_cmb2_box( array(
        'id'            => 'case_study_ss_images_metabox',
        'title'         => __( 'Slideshow Images', 'cmb2' ),
        'object_types'  => array( 'case_study', ), // Post type
        'context'       => 'normal',
        'priority'      => 'high',
        'show_names'    => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        'closed'     => true // Keep the metabox closed by default
    ) );   

    $group_field_id = $cmb_ss_images->add_field( array(
        'id'          => 'wiki_test_repeat_group',
        'type'        => 'group',
        'description' => __( 'Generates reusable form entries', 'cmb2' ),
        // 'repeatable'  => false, // use false if you want non-repeatable group
        'options'     => array(
            'group_title'   => __( 'Image {#}', 'cmb2' ), // since version 1.1.4, {#} gets replaced by row number
            'add_button'    => __( 'Add Another Image', 'cmb2' ),
            'remove_button' => __( 'Remove Image', 'cmb2' ),
            'sortable'      => true, // beta
            // 'closed'     => true, // true to have the groups closed by default
        ),
    ) );    

    $cmb_ss_images->add_group_field( $group_field_id, array(
        'name' => 'Entry Title',
        'id'   => 'title',
        'type' => 'text',
        // 'repeatable' => true, // Repeatable fields are supported w/in repeatable groups (for most types)
    ) );    

	$cmb_ss_images->add_field( array(
	    'name'    => 'Image 1',
	    'desc'    => 'Upload an image that will be added to the case study slideshow.',
	    'id'      => 'case-study-ss-image-1',
	    'type'    => 'file',
	    // Optional:
	    'options' => array(
	        'url' => false, // Hide the text input for the url
	        'add_upload_file_text' => 'Add Slideshow Image' // Change upload button text. Default: "Add or Upload File"
	    ),
	));		

	$cmb_ss_images->add_field( array(
	    'name'    => 'Image 2',
	    'desc'    => 'Upload an image that will be added to the case study slideshow.',
	    'id'      => 'case-study-ss-image-2',
	    'type'    => 'file',
	    // Optional:
	    'options' => array(
	        'url' => false, // Hide the text input for the url
	        'add_upload_file_text' => 'Add Slideshow Image' // Change upload button text. Default: "Add or Upload File"
	    ),
	));		

	$cmb_ss_images->add_field( array(
	    'name'    => 'Image 3',
	    'desc'    => 'Upload an image that will be added to the case study slideshow.',
	    'id'      => 'case-study-ss-image-3',
	    'type'    => 'file',
	    // Optional:
	    'options' => array(
	        'url' => false, // Hide the text input for the url
	        'add_upload_file_text' => 'Add Slideshow Image' // Change upload button text. Default: "Add or Upload File"
	    ),
	));			
}

function cmb2_page_specific_metaboxes(){
    // Start with an underscore to hide fields from custom fields list
    $prefix = 'medialoft_';

    $pageId = get_id_by_slug('contact');

    /**
     * Initiate the Copy metabox
     */
    $cmb = new_cmb2_box( array(
        'id'            => 'page_metabox',
        'title'         => __( 'Contact Details', 'cmb2' ),
        'object_types'  => array( 'page', ), // Post type
        'context'       => 'normal',
        'priority'      => 'high',
        'show_on' => array( 'key' => 'id', 'value' => array( $pageId ) ),
        'show_names'    => true, // Show field names on the left
        'open'     => true // Keep the metabox closed by default
    ) );    

    // Regular text field
    $cmb->add_field( array(
        'name'       => __( 'Email', 'cmb2' ),
        'desc'       => __( 'Please enter full email address. EX. info@medialoft.com', 'cmb2' ),
        'id'         => $prefix . 'email-address',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));    

    // Regular text field
    $cmb->add_field( array(
        'name'       => __( 'Phone', 'cmb2' ),
        'desc'       => __( 'Please enter a formatted phone number, EX. 612.375.1086', 'cmb2' ),
        'id'         => $prefix . 'phone-number',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));    

    // Regular text field
    $cmb->add_field( array(
        'name'       => __( 'Address 1', 'cmb2' ),
        'desc'       => __( 'Please enter the first line of your address, EX. 615 First Ave NE, Suite 100', 'cmb2' ),
        'id'         => $prefix . 'address-1',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));       

    // Regular text field
    $cmb->add_field( array(
        'name'       => __( 'Address 2', 'cmb2' ),
        'desc'       => __( 'Please enter the second line of your address, EX. Minneapolis, MN 55413', 'cmb2' ),
        'id'         => $prefix . 'address-2',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));       

    // Regular text field
    $cmb->add_field( array(
        'name'       => __( 'Directions Link', 'cmb2' ),
        'desc'       => __( 'Please enter a link to get directions. EX. Google Maps Directions', 'cmb2' ),
        'id'         => $prefix . 'directions',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));     
}


function cmb2_video_metaboxes() {
    // Start with an underscore to hide fields from custom fields list
    $prefix = 'medialoft_';

    $galleriesPageId = get_id_by_slug('video-galleries');

    /**
     * Initiate the Copy metabox
     */
    $cmb_gallery = new_cmb2_box( array(
        'id'            => 'gallery_video_ids',
        'title'         => __( 'Gallery Videos', 'cmb2' ),
        'object_types'  => array( 'page', ), // Post type
        'context'       => 'normal',
        'priority'      => 'high',
        'show_on' => array( 'key' => 'child_of', 'value' => array( $galleriesPageId ) ),
        'show_names'    => true, // Show field names on the left
        'open'     => true // Keep the metabox closed by default
    ) );      

    // Regular text field
    $cmb_gallery->add_field( array(
        'name'       => __( 'Ids', 'cmb2' ),
        'desc'       => __( 'Please enter a comma separated list of IDs', 'cmb2' ),
        'id'         => $prefix . 'video_ids',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    )); 

    /**
     * Initiate the Copy metabox
     */
    $cmb = new_cmb2_box( array(
        'id'            => 'video_metabox',
        'title'         => __( 'Video Urls', 'cmb2' ),
        'object_types'  => array( 'video' ), // Post type
        'context'       => 'normal',
        'priority'      => 'high',
        'show_names'    => true, // Show field names on the left
        'open'     => true // Keep the metabox closed by default
    )); 

    // Regular text field
    $cmb->add_field( array(
        'name'       => __( 'Desktop URL', 'cmb2' ),
        'desc'       => __( 'Please enter desktop video url', 'cmb2' ),
        'id'         => $prefix . 'desktop_url',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));     

    // Regular text field
    $cmb->add_field( array(
        'name'       => __( 'Mobile URL', 'cmb2' ),
        'desc'       => __( 'Please enter mobile video url', 'cmb2' ),
        'id'         => $prefix . 'mobile_url',
        'type'       => 'text',
        'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
        // 'on_front'        => false, // Optionally designate a field to wp-admin only
        // 'repeatable'      => true,
    ));    

    $cmb2 = new_cmb2_box( array(
        'id'            => 'video_poster_metabox',
        'title'         => __( 'Poster Image', 'cmb2' ),
        'object_types'  => array( 'video' ), // Post type
        'context'       => 'normal',
        'priority'      => 'high',
        'show_names'    => true, // Show field names on the left
        'open'     => true // Keep the metabox closed by default
    ));    

    $cmb2->add_field( array(
        'name'    => 'Poster Image',
        'desc'    => 'Upload an image that will show as the video poster.',
        'id'      => $prefix . 'video_poster',
        'type'    => 'file',
        // Optional:
        'options' => array(
            'url' => false, // Hide the text input for the url
            'add_upload_file_text' => 'Add Poster Image' // Change upload button text. Default: "Add or Upload File"
        ),
    ));           
}