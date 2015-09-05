<?php if(wp_is_mobile()){ ?>
	<a class="right-menu-btn mobile-menu-btn menu-btn" id="work-menu-btn" href="#" data-menu-name="work-menu">
		<span class="open-menu">all</span>
		<span class="close-menu"><i></i></span>			
	</a>	
<?php } else { ?>
	
<?php } ?>

<nav class="right-menu" id="work-menu">
	<ul>
		<li class="active"><a href="#" data-filter-cat="all">All</a></li>
		<li><a href="#" data-filter-cat="staging">Staging</a></li>
		<li><a href="#" data-filter-cat="video">Video</a></li>
		<li><a class="two-line" href="#" data-filter-cat="motion-graphics"><span>Motion</span><span>Graphics</span></a></li>
		<li><a class="two-line" href="#" data-filter-cat="speaker-support"><span>Speaker</span><span>Support</span></a></li>
		<li><a href="#" data-filter-cat="interactive">Interactive</a></li>
	</ul>
</nav>

