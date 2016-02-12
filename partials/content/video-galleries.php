<div class="grid">
	<div class="galleries col-1-1">
		<ul>
		    <?php wp_list_pages( array(
		        'title_li'    => '<h2>All Video Galleries</h2>',
		        'child_of'    => $post->ID
		    )); ?>
		</ul>
	</div>	
</div>	