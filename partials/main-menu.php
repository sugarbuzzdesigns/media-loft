<nav id="main-menu">
	<a href="#" class="menu-btn" id="main-menu-btn" data-menu-name="main-menu">
		<?php if(is_front_page()){ ?>
			<span class="open-menu">menu</span>
		<?php } else { ?>
			<?php if(is_home()){ ?>
				<span class="open-menu"><?php echo 'blog'; ?></span>
			<?php } else { ?>
			<span class="open-menu"><?php echo strtolower(get_the_title()); ?></span>
			<?php } ?>
		<?php } ?>
		<span class="close-menu"><i></i></span>			
	</a>
	<div id="menu-interior">
		<a class="logo" href="/">
			<img src="<?php bloginfo('template_directory'); ?>/assets/images/mobile/logos/ML_Logo_red_@2x.png" alt="Media Loft" />
		</a>
		<ul>
			<li class="<?php if(is_front_page()){echo 'active';} ?>"><a href="<?php echo get_site_url(); ?>/">Home</a></li>
			<li class="<?php if(is_page('work')){echo 'active';} ?>"><a href="<?php echo get_site_url(); ?>/work">Work</a></li>
			<li class="<?php if(is_page('services')){echo 'active';} ?>"><a href="<?php echo get_site_url(); ?>/services">Services</a></li>
			<li class="<?php if(is_home()){echo 'active';} ?>"><a href="<?php echo get_site_url(); ?>/blog">Blog</a></li>
			<li class="<?php if(is_page('about')){echo 'active';} ?>"><a href="<?php echo get_site_url(); ?>/about">About</a></li>
			<li class="<?php if(is_page('contact')){echo 'active';} ?>"><a href="<?php echo get_site_url(); ?>/contact">Contact</a></li>
		</ul>
	</div>	
</nav>
<div id="menu-overlay"></div>