<?php get_header(); ?>
<?php 

$clientFiles = scandir(__DIR__ . '/assets/images/clients');
$clientFiles = array_diff($clientFiles, array('.', '..', '.DS_Store', 'hover'));

$employeeFiles = scandir(__DIR__ . '/assets/images/employees');
$employeeFiles = array_diff($employeeFiles, array('.', '..', '.DS_Store', 'hover'));

?>

<script>
	var clients = [];
	var employees = [];

	<?php foreach ($clientFiles as $file) { ?>
		clients.push('<?php echo $file; ?>');
	<?php } ?>

	<?php foreach ($employeeFiles as $employeeFile) { ?>
		<?php $arr = explode('_', $employeeFile); ?>
		
		employees.push('<?php echo $arr[0]; ?>');
	<?php } ?>	
</script>
	<section data-section-name="section-about-landing" id="about-landing">
		<div class="sqr"></div>
		<div class="cta">
			<h2 class="tagline single-line">
				<span class="grey">40 great years</span>
				<span>an ongoing success story</span>
			</h2>		
			<?php if(!wp_is_mobile()){ ?> 
				<p>Media Loft is a 100% employee-owned company that produces corporate<br>events across the globe, with account, technical, creative, design, video<br>production and interactive technology services all under one roof.</p>
			<?php } else { ?>
				<p>Media Loft is a 100% employee-owned company that produces corporate events across the globe, with account, technical, creative, design, video production and interactive technology services all under one roof.</p>
			<?php } ?>
			<div class="nav-arrow-down animate-flicker">
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down.png" alt="Media Loft" />
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down.png" alt="Media Loft" />
			</div>			
		</div>

		<?php if(!wp_is_mobile()){ ?> 
			<div class="video-bg-container">
				<video id="landing-video" loop style="background-image:url(<?php echo VID_DIR ?>/about/posters/Landing_About_BW.jpg);">
					<source src="https://player.vimeo.com/external/136884073.hd.mp4?s=d28c568b4bdd7b30fc2e1e9693c34fa7&profile_id=113">
				</video>
			</div>
		<?php } ?>
		<div class="blur-overlay show"></div>
	</section>
	<section data-section-name="section-timeline2" id="timeline2">
		<div class="large-date-wrap">
			<span class="large-date">74</span>
		</div>
		<div id="explore-timeline">
			<span>explore our history</span>
			<div class="nav-arrow-right animate-flicker">
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down.png" alt="Media Loft" />
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down.png" alt="Media Loft" />
			</div>	
		</div>	

		<div class="timeline-wrap">
			<article></article>
			<article></article>
			<article></article>
			<article></article>		
		</div>	
		<div class="full-bleed">
			<img src="" style="display:none;">
			<div class="cover"></div>
		</div>	

		<div class="video-overlay">
			<video id="about-timeline-video-full">
				<source src="">
			</video>
			<a href="#" class="close-video"><i></i></a>				
		</div>				
	</section>
	<section data-section-name="section-clients" class="tile-container" id="clients">
		<div class="cta alternate">
			<h2 class="tagline">
				<?php if(!wp_is_mobile()){ ?> 
					<span>relationships measured in decades,</span>	
					<span>not years</span>
				<?php } else { ?>	
					<span>relationships measured</span>	
					<span>in decades, not years</span>	
				<?php } ?>
			</h2>
		</div>	
		<div data-img="" class="tile empty"></div>
		<div data-img="" class="tile client dark"></div>
		<div data-img="" class="tile client"></div>
		<div data-img="" class="tile client dark"></div>
		<div data-img="" class="tile client"></div>
		<div data-img="" class="tile client dark"></div>

		<div data-img="" class="tile empty"></div>
		<div data-img="" class="tile empty"></div>
		<div data-img="" class="tile empty"></div>
		<div data-img="" class="tile client"></div>
		<div data-img="" class="tile client"></div>
		<div data-img="" class="tile client dark"></div>

		<div data-img="" class="tile client"></div>
		<div data-img="" class="tile client dark"></div>		
		<div data-img="" class="tile client"></div>
		<div data-img="" class="tile client dark"></div>
		<div data-img="" class="tile client"></div>
		<div data-img="" class="tile client dark"></div>

		<div class="svg-container animated-svg">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 		preserveAspectRatio="xMidYMid slice" viewBox="0 0 473.25 589.75" enable-background="new 0 0 473.25 589.75" xml:space="preserve">
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M420.667,288.398l49.592-49.592
				c1.687-1.687,1.687-4.422,0-6.109L240.479,2.916c-1.688-1.687-4.424-1.687-6.11,0L121.684,115.601c-1.687,1.687-1.687,4.422,0,6.109
				l166.259,166.26"/>
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M115.135,454.645c1.687,1.687,4.422,1.687,6.109,0
				l229.781-229.782c1.688-1.687,1.688-4.422,0-6.109L238.342,106.069c-1.688-1.687-4.424-1.687-6.11,0L2.45,335.85
				c-1.687,1.688-1.687,4.422,0,6.109L115.135,454.645z"/>
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M65.96,405.469L2.839,468.59
				c-1.687,1.687-1.687,4.422,0,6.109l112.684,112.685c1.687,1.687,4.423,1.687,6.11,0l299.01-299.01"/>
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M301.849,407.168l47.451,47.451
				c1.687,1.687,4.423,1.687,6.11,0l112.684-112.685c1.688-1.687,1.688-4.423,0-6.11L351.027,218.758"/>
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M235.699,473.316l114.066,114.067
				c1.688,1.688,4.422,1.688,6.109,0l109.818-109.761c1.687-1.688,3.277-4.213,2.865-9.033l0.8-129.685"/>
			<line fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" x1="1.186" y1="338.904" x2="1.573" y2="471.645"/>
			</svg>
		</div>	
	</section>
	<section data-section-name="section-people" class="tile-container" id="people">
		<div class="cta alternate">
			<h2 class="tagline">
				<span>our people make</span><span>it all possible</span>
			</h2>
		</div>	
		<div class="tile empty"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>

		<div class="tile employee mobile-empty"></div>
		<div class="tile employee mobile-empty"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>

		<div class="tile employee"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>
		<div class="tile employee"></div>				

		<div class="svg-container animated-svg">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 		preserveAspectRatio="xMidYMid slice" viewBox="0 0 473.25 589.75" enable-background="new 0 0 473.25 589.75" xml:space="preserve">
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M420.667,288.398l49.592-49.592
				c1.687-1.687,1.687-4.422,0-6.109L240.479,2.916c-1.688-1.687-4.424-1.687-6.11,0L121.684,115.601c-1.687,1.687-1.687,4.422,0,6.109
				l166.259,166.26"/>
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M115.135,454.645c1.687,1.687,4.422,1.687,6.109,0
				l229.781-229.782c1.688-1.687,1.688-4.422,0-6.109L238.342,106.069c-1.688-1.687-4.424-1.687-6.11,0L2.45,335.85
				c-1.687,1.688-1.687,4.422,0,6.109L115.135,454.645z"/>
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M65.96,405.469L2.839,468.59
				c-1.687,1.687-1.687,4.422,0,6.109l112.684,112.685c1.687,1.687,4.423,1.687,6.11,0l299.01-299.01"/>
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M301.849,407.168l47.451,47.451
				c1.687,1.687,4.423,1.687,6.11,0l112.684-112.685c1.688-1.687,1.688-4.423,0-6.11L351.027,218.758"/>
			<path fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" d="M235.699,473.316l114.066,114.067
				c1.688,1.688,4.422,1.688,6.109,0l109.818-109.761c1.687-1.688,3.277-4.213,2.865-9.033l0.8-129.685"/>
			<line fill="none" stroke="#4C4B4C" stroke-width="0.5" stroke-miterlimit="10" x1="1.186" y1="338.904" x2="1.573" y2="471.645"/>
			</svg>
		</div>		
	</section>
	<section data-section-name="section-culture" id="culture">
		<div class="cta centered">
			<?php if(!wp_is_mobile()){ ?> 
			<h2 class="tagline one-liner alternate-red">
				<span>fun is <em>always</em> in the equation</span>
			</h2>	
			<?php } else { ?>
			<h2 class="tagline alternate-red">
				<span>fun is <em>always</em> in</span>
				<span>the equation</span>	
			</h2>
			<?php } ?>

			<a class="play-reel" href="#">
				<i class="ml-play white"></i>
				<span>Play Reel</span>
			</a>
		</div>		

		<?php if(!wp_is_mobile()){ ?> 
			<!-- <div class="video-cover" style="background-image:url(<?php echo IMG_DIR ?>/768up/backgrounds/about/Culture_Vid_Static_BG.jpg);"></div> -->
			<div class="video-bg-container">			
				<video id="about-culture-video-loop" autoplay loop style="background-image:url(<?php echo VID_DIR ?>/about/posters/Who_We_Are_Clicked.jpg);">
					<source src="https://player.vimeo.com/external/136642425.sd.mp4?s=db0fe3877230369658d8e2e08a7796bc&profile_id=112">
				</video>
			</div>
			<div class="blur-overlay show"></div>	
		<?php } ?>	
		<div class="video-overlay">
			<video id="about-culture-video-full" style="background-image:url(<?php bloginfo('template_directory'); ?>/assets/videos/home/posters/What_We_Do_loopBW.jpg);">
				<source src="https://player.vimeo.com/external/136641924.hd.mp4?s=bd657664d75006514d6ad9e03e56a317&profile_id=113">
			</video>
			<a href="#" class="close-video"><i></i></a>				
		</div>	
		<div class="full-bleed" style="background-image:url(<?php echo IMG_DIR ?>/mobile/backgrounds/about/Culture_Vid_Static_BG.jpg);"></div>
	</section>
	<section data-section-name="section-join-us" id="join-us">
		<div class="contact-us">
			<div class="cta">
				<h2 class="tagline single-line alternate">
					<span>enough about us</span>
					<span>tell us about you</span>
				</h2>	
			</div>	
			<div class="email">
				<div>work</div> 
				<div class="choose">
					<span class="selected">with</span>
					<span class="choice active" data-mailto="mailto:contact@medialoft.com"><i class="check"></i> with</span>
					<span class="choice" data-mailto="mailto:careers@medialoft.com"><i class="check"></i> at</span>
				</div> 
				<div>media loft</div>
				<div class="right-col">
					<div class="email-link"><a href="mailto:contact@medialoft.com">talk to us</a></div>
					<div class="visit-contact"><span>or </span><a href="<?php echo get_site_url(); ?>/contact">visit contact page <i class="fa fa-chevron-right"></i></a></div>
				</div>	
			</div>			
		</div>
		<div class="full-bleed" style="background-image:url(<?php echo IMG_DIR ?>/768up/backgrounds/about/Join_Us_BG_02.jpg);"></div>
	</section>
	<script>
		var imgDir = '<?php echo IMG_DIR; ?>';
	</script>

	<div style="display: none;" id="timeline-data">
		<span class="large-date">99</span>
		<div class="timeline-container nano-content">
			<div class="timeline-block bottom">
				<a href="#" data-info-id="1974" data-bg-image="1974_Media_Loft_FirstLogo2.jpg" class="date left-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft founded; first project: a slide/tape series on great photographers for colleges and universities around the US.</span>
				</a>	
				<a href="#" data-info-id="1975" data-bg-image="1975_Media_Loft_FirstPromo_ScreenGrab.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">
						That’s a wrap: first promotional sales video for Media Loft.
						<span class="play-reel" href="#" data-video-url="https://player.vimeo.com/external/138561152.sd.mp4?s=5509e6eea91e5a1bf370741fb4314028&profile_id=112">
							<i class="icon-play-btn"></i>
							<span>Watch Video</span>
						</span>	
					<span>
				</a>		
				<a href="#" data-info-id="1976" data-bg-image="1976_Munsingwear_blk.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">First corporate event production: 6-projector, computer-controlled widescreen show in Arizona for Munsingwear Clothing.<span>
				</a>		
				<a href="#" data-info-id="1977" data-bg-image="1977_7200France_Ave_S_edited.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Company moves to bigger HQ, adds video editing, video graphics, video studio, animation camera room, wet lab for processing 35mm film.<span>
				</a>												
			</div>
			<div class="timeline-block bottom">	
				<a href="#" data-info-id="1978" data-bg-image="1978_ML_Logo1.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">New digs inspires first branding refresh</span>
				</a>	
				<a href="#" data-info-id="1979" data-bg-image="1979_R_Smith_Shuneman.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft founder R. Smith Schuneman with Show Pro 5, a (then) state-of-the-art multi-image computer system<span>
				</a>		
				<a href="#" data-info-id="1980" data-bg-image="1980_PacMan.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Who knew gobbling dots could be this fun?<span>
				</a>
			</div>
			<div class="timeline-block top">	
				<a href="#" data-info-id="1982" data-bg-image="1982_CD_Billy_Joel.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Digital for the masses: compact disc introduced.</span>
				</a>	

				<a href="#" data-info-id="1983" data-bg-image="1983_Film_Festival_Award_DSC_0079.JPG.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Celebrating Grand Award win at NY Film & TV Festival.</span>
				</a>						
			</div>	
			<div class="timeline-block bottom">											
				<a href="#" data-info-id="1984" data-bg-image="1984_Film_Festival_Award_2nd.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Grand Award win #2 at NY Film & TV Festival.</span>
				</a>	
				<a href="#" data-info-id="1985" data-bg-image="1985_Polaris_First_ATV_2.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Polaris unveils their first ATV, the Trail Boss 250. We begin a 30+ year partnership with Polaris.</span>
				</a>						
			</div>

			<!-- Start new part of timeline -->
			<div class="timeline-block bottom">
				<a href="#" data-info-id="1986" data-bg-image="1986_Union_Plaza01.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Company moves to larger space in Union Plaza Building, and produces first Target event (29+ year partnership)</span>
				</a>		
				<a href="#" data-info-id="1987" data-bg-image="1987_First_Promotional_Ad.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft promotional ad (to pay for larger space in downtown Minneapolis)</span>
				</a>		
				<a href="#" data-info-id="1988" data-bg-image="1988_FaxMachine.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Denver-based client Coast-to-Coast Hardware prompts purchase of company fax machine.</span>
				</a>													
			</div>
			<div class="timeline-block bottom">
				<a href="#" data-info-id="1989" data-bg-image="1989_Computer.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Speaker support slides now largely computer-generated.</span>
				</a>
				<a href="#" data-info-id="1990" data-bg-image="1990_Polaris_Watercraft.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Polaris watercraft shoot on the windy waters of Lake Traverse</span>
				</a>	
				<a href="#" data-info-id="1991" data-bg-image="1991_JohnDenver.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">John Denver performs Media Loft-created song for Target’s World Earth Day event for the United Nations</span>
				</a>									
			</div>
			<div class="timeline-block top">
				<a href="#" data-info-id="1992" data-bg-image="1992_ML_Logo3.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft branding reboot: logo 3.0</span>
				</a>
				<a href="#" data-info-id="1993" data-bg-image="1993_Laser_Pointer.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Laser technology becomes affordable and ubiquitous, delighting corporate presenters and cats worldwide</span>
				</a>						
			</div>	
			<div class="timeline-block bottom">				
				<a href="#" data-info-id="1995" data-bg-image="1995_ESOP.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Company converts to Employee Stock Option Plan (ESOP)</span>
				</a>		
				<a href="#" data-info-id="1996" data-bg-image="1996_TVL.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">TVL ShowStar 6 software unleashes hundreds of real-time effects such as dissolve, zoom, mosaic and pan on unsuspecting attendees everywhere</span>
				</a>				
			</div>	

			<!-- Start new part of timeline -->
			<div class="timeline-block bottom">	
				<a href="#" data-info-id="1998" data-bg-image="1998_ESOP_Card03.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft announces that company is now 100% employee-owned</span>
				</a>		

				<a href="#" data-info-id="1999" data-bg-image="1999_ML_Logo.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Company logo refresh</span>
				</a>	

				<a href="#" data-info-id="2000" data-bg-image="2000_BanksBuilding_Interior.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Company moves to current location in Bank’s Building, NE Mpls</span>
				</a>															
			</div>
			<div class="timeline-block bottom">
				<a href="#" data-info-id="2001" data-bg-image="2001_BestBuyEvent.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">First production in an annual series of Best Buy gala events that continue to the present day, with 3,000 attendees entertained by the likes of Elton John, Beyoncé, Aerosmith and Sheryl Crow</span>
				</a>	
				<a href="#" data-info-id="2002" data-bg-image="2002_PowerPoint.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">PowerPoint 2002 launched, marking the demise of the TVL show graphics system</span>
				</a>	
				<a href="#" data-info-id="2003" data-bg-image="2003_Target_Vendor_Award01.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft named Target vendor of the year for the second time (first award in 1998).</span>
				</a>									
			</div>
			<div class="timeline-block top">
				<a href="#" data-info-id="2004" data-bg-image="2004_ML_30th_Invite03.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">8-track party invite marks Media Loft’s 30th year</span>
				</a>
				<a href="#" data-info-id="2005" data-bg-image="2005_BMWEvent.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Produce BMW event in South Miami Beach to introduce new 3 Series to North American and Latin American dealers</span>
				</a>																
			</div>	
			<div class="timeline-block bottom">
				<a href="#" data-info-id="2006" data-bg-image="2006_Staples20th_ML_Logo.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft goes global with sales event for Staples 20th Anniversary</span>
				</a>							
				<a href="#" data-info-id="2007" data-bg-image="2007_showcue.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft launches proprietary software that allows DVD playback of video content from laptop’s internal drive, eliminating the need for outside playback device, switcher and technician to run. FYI, it saved our clients a boatload of money.</span>
				</a>							
			</div>	
			<div class="timeline-block bottom">
				<a href="#" data-info-id="2009" data-bg-image="2009_Target_Modelless_Show_1.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">
						World’s first 3-D holographic fashion show created by Media Loft for Target plays in NY’s Grand Central Terminal   
						<span class="play-reel" href="#" data-video-url="https://player.vimeo.com/external/138561153.sd.mp4?s=a7ab17fd51605e70d77f2dad44c1a7fa&profile_id=112">
							<i class="icon-play-btn"></i>
							<span>Watch Video</span>
						</span>						
					</span>
				</a>	
				<a href="#" data-info-id="2011" data-bg-image="2011_CruiseShip.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Ships ahoy: Media Loft by now has produced events in four of the seven seas.</span>
				</a>	
				<a href="#" data-info-id="2012" data-bg-image="2012_Target_Fifty.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft celebrates Target’s 50th Anniversary at the Spring National Meeting.</span>
				</a>	
																								
			</div>
			<div class="timeline-block bottom">
				<a href="#" data-info-id="2013" data-bg-image="2013_Polaris_HOF.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">
						Following 28-year partnership, Media Loft elected to Polaris Hall of Fame.
						<span class="play-reel" href="#" data-video-url="https://player.vimeo.com/external/138561154.sd.mp4?s=fc8bd393106548fca01e4c63fe9227e0&profile_id=112">
							<i class="icon-play-btn"></i>
							<span>Watch Video</span>
						</span>
					</span>
				</a>	
				<a href="#" data-info-id="2014" data-bg-image="2014_InternationalRevenue_option2.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">16% of Media Loft’s revenue generated internationally.</span>
				</a>
				<a href="#" data-info-id="2015" data-bg-image="2015.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">A new day, new branding for Media Loft.</span>
				</a>								
			</div>
		</div>
		<div class="large-date"></div>	
		<script>
			var timeLineImageDir = "<?php echo IMG_DIR ?>/about/timeline/desktop/";
		</script>
		<div class="full-bleed">
			<img src="" style="display:none;">
			<div class="cover"></div>
		</div>
	</div>

	<?php include('partials/about-menu.php'); ?>
<?php get_footer(); ?>