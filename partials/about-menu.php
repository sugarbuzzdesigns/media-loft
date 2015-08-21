<?php if(wp_is_mobile()){ ?>
	<a href="#" class="right-menu-btn mobile-menu-btn menu-btn" id="about-menu-btn" data-menu-name="about-menu">
		<span class="open-menu">about</span>
		<span class="close-menu"><i></i></span>			
	</a>	
<?php } else { ?>
	
<?php } ?>

<nav class="right-menu" id="about-menu">
	<ul>
		<li data-section-name="#about-landing" class="active"><a href="#about-landing">About</a></li>
		<li data-section-name="#timeline"><a href="#timeline">History</a></li>
		<li data-section-name="#clients"><a href="#clients">Clients</a></li>
		<li data-section-name="#people"><a href="#people">People</a></li>
		<li data-section-name="#culture"><a href="#culture">Culture</a></li>
		<li data-section-name="#join-us"><a href="#join-us">Join Us</a></li>
	</ul>
</nav>

