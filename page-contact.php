<?php get_header(); ?>
	<section id="contact-landing">
		<div class="hero">
			<p>say <em>hello.</em></p>
		</div>
		<div class="content">
			<div class="general-info">
				<svg version="1.1" class="svg-bg" id="contact-vector-shape" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
					 width="500px" height="500px" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve">
				<g>
					<path fill="none" stroke-width="1.4" stroke-miterlimit="10" d="M247.864,203.712L55.686,394.584
						c-1.448,1.445-1.448,3.804,0,5.258l93.329,93.326c1.451,1.448,3.803,1.448,5.261,0l194.806-193.507l-95.956-95.949
						C251.67,202.256,249.318,202.256,247.864,203.712z"/>
					<path fill="none" stroke-width="1.4" stroke-miterlimit="10" d="M151.166,299.664l95.957-95.95
						c1.454-1.458,3.806-1.458,5.26,0l192.183,190.87c1.445,1.445,1.445,3.796,0,5.261l-93.333,93.323c-1.45,1.448-3.806,1.448-5.26,0
						l-96.049-95.407"/>
					<path fill="none" stroke-width="1.4" stroke-miterlimit="10" d="M252.383,93.354l192.18,190.87
						c1.448,1.446,1.448,3.804,0,5.262l-93.33,93.322c-1.45,1.452-3.803,1.452-5.26,0L151.166,189.302l95.957-95.948
						C248.577,91.896,250.929,91.896,252.383,93.354z"/>
					
						<line fill="none" stroke-width="1.4" stroke-miterlimit="10" x1="348.409" y1="382.808" x2="348.409" y2="493.32"/>
					
						<line fill="none" stroke-width="1.4" stroke-miterlimit="10" x1="54.304" y1="202.613" x2="54.304" y2="397.196"/>
					
						<line fill="none" stroke-width="1.4" stroke-miterlimit="10" x1="445.696" y1="286.772" x2="445.696" y2="397.287"/>
					<path fill="none" stroke-width="1.4" stroke-miterlimit="10" d="M186.866,263.917l162.218-161.128l-95.959-95.95
						c-1.455-1.457-3.807-1.457-5.261,0L55.682,197.712c-1.444,1.443-1.444,3.799,0,5.255l93.329,93.325
						c1.458,1.451,3.807,1.451,5.265,0L186.866,263.917"/>
				</g>
				</svg>	
				<div class="inner">
					<div class="name-abbrev">mpls</div>
					<div class="clock"><i></i></div>
					<div class="weather"></div>
				</div>	
			</div>
			<div class="contact-info">
				<div class="inner">
					<h3>General Inquires</h3>
					<a class="email" href="mailto:info@medialoft.com">info@medialoft.com</a>
					<a class="tel" href="tel:612-375-1086">612.375.1086</a>
					<p class="address">
						<span>615 1st Avenue Northeast</span>
						<span>#100, Minneapolis, MN</span>
						<span>55413</span>
					</p>
					<a href="#" class="directions">Get Directions</a>

					<div class="social">
						<a href=""><i class="fa fa-facebook-official"></i></a>
						<a href=""><i class="fa fa-twitter"></i></a>
						<a href=""><i class="fa fa-instagram"></i></a>
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
		})(jQuery);
	</script>
<?php get_footer(); ?>