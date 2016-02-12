<?php
/**
 * Metabox for Children of Parent ID
 * @author Kenneth White (GitHub: sprclldr)
 * @link https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function be_metabox_show_on_child_of( $display, $meta_box ) {
    if ( ! isset( $meta_box['show_on']['key'], $meta_box['show_on']['value'] ) ) {
        return $display;
    }

    if ( 'child_of' !== $meta_box['show_on']['key'] ) {
        return $display;
    }

    $post_id = 0;

    // If we're showing it based on ID, get the current ID
    if ( isset( $_GET['post'] ) ) {
        $post_id = $_GET['post'];
    } elseif ( isset( $_POST['post_ID'] ) ) {
        $post_id = $_POST['post_ID'];
    }

    if ( ! $post_id ) {
        return $display;
    }

    $pageids = array();
    foreach( (array) $meta_box['show_on']['value'] as $parent_id ) {
        $pages = get_pages( array(
            'child_of'    => $parent_id,
            'post_status' => 'publish,draft,pending',
        ) );

        if ( $pages ) {
            foreach( $pages as $page ){
                $pageids[] = $page->ID;
            }
        }
    }
    $pageids_unique = array_unique( $pageids );

    echo '<p>made it here</p>';

    return in_array( $post_id, $pageids_unique );
}
add_filter( 'cmb2_show_on', 'be_metabox_show_on_child_of', 10, 2 );