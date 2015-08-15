<?php get_header(); ?>
	<section id="contact-landing">
		<div class="hero">
			<p>say <em>hello.</em></p>
		</div>
		<div class="content">
			<div class="general-info">
				<?php if(!wp_is_mobile()){ ?>
					<div class="video-bg-container">
						<video id="contact-video" loop autoplay>
							<source src="<?php bloginfo('template_directory'); ?>/assets/videos/contact/Landing_Contact_BW.mp4">
						</video>
					</div>
					<div class="blur-overlay"></div>
				<?php } else { ?>			
					<div class="full-bleed" style="background-image:url(<?php echo IMG_DIR ?>/mobile/backgrounds/contact/contact-info-bg.jpg);"></div>
				<?php } ?>
				<div class="inner">
					<div class="name-abbrev">mpls</div>
					<div class="clock"><i class="hours"></i><i class="minutes"></i></div>
					<div class="weather"></div>
				</div>
			</div>
			<div class="contact-info">
				<div class="inner">
					<h3>General Inquires</h3>
					<a class="email" href="mailto:info@medialoft.com">info@medialoft.com</a>
					<a class="tel" href="tel:612-375-1086">612.375.1086</a>
					<p class="address">
						<span>615 First Ave NE, Suite 100</span>
						<span>Minneapolis, MN 55413</span>
						<span>55413</span>
					</p>
					<a target="_blank" href="https://www.google.com/maps/dir/''/media+loft/data=!4m5!4m4!1m0!1m2!1m1!1s0x52b32d9d5517721b:0x5654a778fb32a43e?sa=X&ved=0CIQBEPUXMA9qFQoTCPH50cLNqccCFUaaHgodrQkEPg" class="directions">Get Directions</a>

					<div class="social">
						<a href="https://www.facebook.com/TheMediaLoft"><i class="fa fa-facebook-official"></i></a>
						<a href="https://twitter.com/medialoft"><i class="fa fa-twitter"></i></a>
						<a href="https://instagram.com/medialoft/"><i class="fa fa-instagram"></i></a>
						<a href="https://www.linkedin.com/company/media-loft"><i class="fa fa-linkedin"></i></a>
					</div>					
				</div>
			</div>
		</div>			
	</section>	
	<script>
		// Show current temperature
		(function($){
			$.simpleWeather({
				location: 'Minneapolis, MN',
				woeid: '',
				unit: 'f',
				success: function(weather) {
					html = '<span>'+weather.temp+'<sup>&deg;</sup></span>';

					$(".weather").html(html);
				},
					error: function(error) {
					$(".weather").html('<p>'+error+'</p>');
				}
			});		
			<?php if(!wp_is_mobile()){ ?>
			$(function(){
				var contactVideo = $('#contact-video')[0];

				contactVideo.addEventListener('canplay', function(){
					$(contactVideo).css('opacity', 1);
				});
			});
			<?php } ?>
		})(jQuery);
	</script>
<?php get_footer(); ?>