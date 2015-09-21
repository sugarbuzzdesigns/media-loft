$(function(){
	var video = $('#vid');

	var breakpoint = {};

	breakpoint.refreshValue = function () {
		this.value = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/['"]+/g, '');
	};

	$(window).resize(function () {
	  	breakpoint.refreshValue();  
	}).resize();

  if(breakpoint.value === 'desktop'){
    console.log('desktop');
    
    $('source', video).attr('src', vidpath + '/pre-launch/assets/media/videos/ML-Chalkboard-BW-1080p-final.mp4');

  } else if (breakpoint.value === 'mobile') {
    console.log('mobile');
  }   

	video.load();

	video.on('canplay', function(){
		video.fadeIn();
		video[0].play();
	});	


// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
 
var videoElement = document.getElementById("videoElement");

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document[hidden]) {
    video[0].pause();
  } else {
    video[0].play();
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || 
  typeof document[hidden] === "undefined") {
  alert("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  // Handle page visibility change   
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
    
  // // Revert to the existing favicon for the site when the page is closed;
  // // otherwise the favicon remains paused.png
  // window.addEventListener("unload", function(){
  //   favicon.change("/favicon.ico");
  // }, false);
    
  // // When the video pauses, set the favicon.
  // // This shows the paused.png image
  // videoElement.addEventListener("pause", function(){
  //   favicon.change("images/paused.png");
  // }, false);
    
  // // When the video plays, set the favicon.
  // videoElement.addEventListener("play", function(){
  //   favicon.change("images/playing.png");
  // }, false);
    
  // // set the document (tab) title from the current video time
  // videoElement.addEventListener("timeupdate", function(){
  //   document.title = Math.floor(videoElement.currentTime) + " second(s)";
  // }, false);
}	

});