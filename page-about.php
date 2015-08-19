<?php get_header(); ?>
<?php 

$clientFiles = scandir(__DIR__ . '/assets/images/clients');
$clientFiles = array_diff($clientFiles, array('.', '..', '.DS_Store'));

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

	console.log(employees);

</script>
	<section id="about-landing">
		<div class="sqr"></div>
		<div class="cta alternate">
			<h2 class="tagline">
				<span>40 great years</span>
				<span>an ongoing success story</span>
			</h2>		
			<div class="nav-arrow-down animate-flicker">
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down.png" alt="Media Loft" />
				<img src="<?php echo MOBILE_IMG ?>/icons/nav-arrow-down.png" alt="Media Loft" />
			</div>			
		</div>

		<?php if(!wp_is_mobile()){ ?> 
			<div class="video-bg-container">
				<video id="landing-video" loop style="background-image:url(<?php echo VID_DIR ?>/about/posters/Roof_Timelapse_02_H264_10K.jpg);">
					<source src="<?php echo VID_DIR ?>/about/Roof_Timelapse_02_H264_10K.mp4">
				</video>
			</div>
		<?php } ?>
		<div class="blur-overlay show"></div>
	</section>
	<section id="timeline">
		<div class="timeline-container">
			<div class="timeline-block bottom">
				<a href="#" data-info-id="1974" data-bg-image="1974_Media_Loft_FirstLogo2.jpg" class="date left-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft founded; first project: a slide/tape series on great photographers for colleges and universities around the US.</span>
				</a>	
				<a href="#" data-info-id="1975" data-bg-image="1975_Media_Loft_FirstPromo_ScreenGrab.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">That’s a wrap: first promotional sales video for Media Loft.<span>
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
				<a href="#" data-info-id="1979" data-bg-image="1979_Media_Loft_FirstPromo_ScreenGrab.jpg" class="date left-top">
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
				<a href="#" data-info-id="1986" data-bg-image="1974_Media_Loft_FirstLogo2.jpg" class="date left-top">
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
			</div>	
			<div class="timeline-block bottom">		
				<a href="#" data-info-id="1993" data-bg-image="1993_Laser_Pointer.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Laser technology becomes affordable and ubiquitous, delighting corporate presenters and cats worldwide</span>
				</a>			
								
				<a href="#" data-info-id="1995" data-bg-image="BLANK" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Company converts to Employee Stock Option Plan (ESOP)</span>
				</a>		
			</div>	

			<!-- Start new part of timeline -->
			<div class="timeline-block bottom">
				<a href="#" data-info-id="1996" data-bg-image="1996_TVL.jpg" class="date left-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">TVL ShowStar 6 software unleashes hundreds of real-time effects such as dissolve, zoom, mosaic and pan on unsuspecting attendees everywhere</span>
				</a>	

				<a href="#" data-info-id="1998" data-bg-image="1998_ESOP_Card03.jpg" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft announces that company is now 100% employee-owned</span>
				</a>		

				<a href="#" data-info-id="1999" data-bg-image="BLANK" class="date right-bottom">
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
				<a href="#" data-info-id="2001" data-bg-image="BLANK" class="date right-bottom">
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
			</div>	
			<div class="timeline-block bottom">
				<a href="#" data-info-id="2005" data-bg-image="BLANK" class="date left-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Produce BMW event in South Miami Beach to introduce new 3 Series to North American and Latin American dealers</span>
				</a>			
				<a href="#" data-info-id="2006" data-bg-image="2006_Staples20th_ML_Logo.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft goes global with sales event for Staples 20th Anniversary</span>
				</a>										
			</div>	
			<div class="timeline-block bottom">
				<a href="#" data-info-id="2007" data-bg-image="BLANK" class="date left-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft launches proprietary software that allows DVD playback of video content from laptop’s internal drive, eliminating the need for outside playback device, switcher and technician to run…oh never mind. FYI, it saved our clients a boatload of money per show.</span>
				</a>
				<a href="#" data-info-id="2009" data-bg-image="2009_Target_Modelless_Show_1.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">World’s first 3-D holographic fashion show created by Media Loft for Target plays in NY’s Grand Central Terminal   </span>
				</a>															
			</div>
			<div class="timeline-block top">
				<a href="#" data-info-id="2011" data-bg-image="2011_CruiseShip.jpg" class="date left-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Ships ahoy: Media Loft by now has produced events in four of the seven seas.</span>
				</a>			
				<a href="#" data-info-id="2012" data-bg-image="2012_Target_Fifty.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Media Loft celebrates Target’s 50th Anniversary at the Spring National Meeting.</span>
				</a>
				<a href="#" data-info-id="2013" data-bg-image="2013_Polaris_HOF.jpg" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">Following 28-year partnership, Media Loft elected to Polaris Hall of Fame.</span>
				</a>								
			</div>			
			<div class="timeline-block bottom">
				<a href="#" data-info-id="2014" data-bg-image="2014_InternationalRevenue_option2.jpg" class="date right-bottom">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">16% of Media Loft’s revenue generated internationally.</span>
				</a>
				<a href="#" data-info-id="2015" data-bg-image="BLANK" class="date right-top">
					<span class="num"></span>
					<span class="close"></span>
					<span class="info">A new day, new branding for Media Loft.</span>
				</a>
			</div>
		</div>
		<div class="large-date"></div>	
		<div class="full-bleed" data-img-dir="<?php echo IMG_DIR ?>/about/timeline/desktop/">
			<img src="" style="display:none;">
			<div class="cover"></div>
		</div>
	</section>
	<section class="tile-container" id="clients">
		<div data-img="ally.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/ally.png" alt=""></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="best_buy.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/best_buy.png" alt=""></div>
		<div data-img="dell.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/dell.png" alt=""></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="google.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/google.png" alt=""></div>

		<div data-img="" class="tile blank"></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="optum.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/optum.png" alt=""></div>
		<div data-img="indian.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/indian.png" alt=""></div>
		<div data-img="" class="tile blank"></div>

		<div data-img="" class="tile blank"></div>
		<div data-img="pizza_hut.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/pizza_hut.png" alt=""></div>		
		<div data-img="" class="tile blank"></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="" class="tile blank"></div>
		<div data-img="staples.png" class="tile"><img src="<?php echo IMG_DIR ?>/clients/staples.png" alt=""></div>
		<div class="scaling-svg-container" style="padding-bottom: 124.6%;">
			<svg class="scaling-svg" version="1.1" id="shape-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 		width="473.25px" height="589.75px" viewBox="0 0 473.25 589.75" enable-background="new 0 0 473.25 589.75" xml:space="preserve">
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
		<!-- <img data-img="" class="svg-bg" id="services-landing-svg-bg" src="<?php bloginfo('template_directory'); ?>/assets/vectors/services/services-landing-bg-vector.svg">		 -->
	</section>
	<section class="tile-container" id="people">

		<div id="card"> 
			<div class="front"> 
				<img src="<?php echo IMG_DIR ?>/employees/camie_rest.jpg" alt="">
			</div> 
			<div class="back">
				<img src="<?php echo IMG_DIR ?>/employees/hover/camie_hover.jpg" alt="">
			</div> 
		</div>	
		<script>
		$(function(){
			$("#card").flip({
				// trigger: 'manual'
			});
		});
		</script>
		<style>
		#card {
		    width: 300px;
		    height: 300px;
		}

		#card img {
			width: 100%;
		}
		</style>
		<!-- <div data-img="camie" class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/camie_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/hover/camie_hover.jpg" alt="">
		</div>
		<div class="tile blank"></div>
		<div data-img="bill" class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/bill_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/hover/bill_hover.jpg" alt="">
		</div>
		<div data-img="brian" class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/brian_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/hover/brian_hover.jpg" alt="">
		</div>
		<div class="tile blank"></div>
		<div data-img="joe" class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/joe_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/hover/joe_hover.jpg" alt="">
		</div>

		<div class="tile blank"></div>
		<div class="tile blank"></div>
		<div class="tile blank"></div>
		<div data-img="justin" class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/justin_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/hover/justin_hover.jpg" alt="">
		</div>
		<div data-img="kim" class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/kim_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/hover/kim_hover.jpg" alt="">
		</div>
		<div class="tile blank"></div>

		<div class="tile blank"></div>
		<div data-img="kay" class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/kay_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/hover/kay_hover.jpg" alt="">
		</div>
		<div class="tile blank"></div>
		<div class="tile blank"></div>
		<div class="tile blank"></div>
		<div data-img="debbi" class="tile">
			<img src="<?php echo IMG_DIR ?>/employees/debbi_rest.jpg" alt="">
			<img src="<?php echo IMG_DIR ?>/employees/hover/debbi_hover.jpg" alt="">
		</div>	 -->
		<!-- <img class="svg-bg" id="services-landing-svg-bg" src="<?php bloginfo('template_directory'); ?>/assets/vectors/services/services-landing-bg-vector.svg">	 -->
	</section>
	<section id="culture">
		<div class="cta centered">
			<h2 class="tagline one-liner alternate-red">
				<span>Fun is always in the equation</span>
			</h2>		
			<a class="play-reel" href="#">
				<i class="ml-play black"></i>
				<span>Look Inside</span>
			</a>
		</div>		

		<?php if(!wp_is_mobile()){ ?> 
			<!-- <div class="video-cover" style="background-image:url(<?php echo IMG_DIR ?>/768up/backgrounds/about/Culture_Vid_Static_BG.jpg);"></div> -->
			<div class="video-bg-container">
				<video id="about-culture-video-full">
					<source src="https://player.vimeo.com/external/136641924.hd.mp4?s=bd657664d75006514d6ad9e03e56a317&profile_id=113">
				</video>			
				<video id="about-culture-video-loop" autoplay loop style="background-image:url(<?php echo VID_DIR ?>/about/posters/Who_We_Are_Clicked.jpg);">
					<source src="https://player.vimeo.com/external/136642425.sd.mp4?s=db0fe3877230369658d8e2e08a7796bc&profile_id=112">
				</video>

				<a href="" class="close-video"><i></i></a>				
			</div>
		<?php } ?>	
		<div class="blur-overlay show"></div>	
	</section>
	<section id="join-us">
		<div class="contact-us">
			<div class="cta">
				<h2 class="tagline one-liner alternate">
					<span>enough about us.</span>
					<span>tell us about you.</span>
				</h2>	
			</div>	
			<div class="email">
				<div>work</div> 
				<div class="choose">
					<span class="selected">at</span>
					<span class="choice" data-mailto="mailto:contact@medialoft.com"><i class="check"></i> with</span>
					<span class="choice active" data-mailto="mailto:careers@medialoft.com"><i class="check"></i> at</span>
				</div> 
				<div>media loft</div><div class="email-link"><a href="mailto:work@medialoft.com">talk to us <i class="fa fa-chevron-right"></i></a></div>
			</div>			
		</div>
		<div class="full-bleed" style="background-image:url(<?php echo IMG_DIR ?>/768up/backgrounds/about/Join_Us_BG_02.jpg);"></div>
	</section>
	<script>
		var imgDir = '<?php echo IMG_DIR; ?>';
	</script>
	<?php include('partials/about-menu.php'); ?>
<?php get_footer(); ?>