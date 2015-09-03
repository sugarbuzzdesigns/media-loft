<?php if(wp_is_mobile()){ ?>
	<a href="#" class="right-menu-btn mobile-menu-btn menu-btn" id="services-menu-btn" data-menu-name="services-menu">
		<span class="open-menu">all</span>
		<span class="close-menu"><i></i></span>			
	</a>	
<?php } else { ?>
	
<?php } ?>

<nav class="right-menu inactive" id="services-menu">
	<ul>
		<li data-menu-text="Staging"><a href="services-staging" class="active">Staging</a></li>
		<li data-menu-text="Video"><a href="services-video">Video</a></li>
		<li data-menu-text="Design"><a href="services-design">Design</a></li>
		<li data-menu-text="Motion Graphics"><a class="two-line" href="services-motion">Motion<br>Graphics</a></li>
		<li data-menu-text="Talent"><a href="services-talent">Talent</a></li>
		<li data-menu-text="Speaker Support"><a class="two-line" href="services-support">Speaker<br>Support</a></li>
		<li data-menu-text="Interactive"><a href="services-interactive">Interactive</a></li>
	</ul>
</nav>

