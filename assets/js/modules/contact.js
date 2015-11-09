jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

ml.Contact = {
	init: function(){
		this.currentTime = this.getCurrentTime();
		this.hours = this.currentTime.getHours();
		this.minutes = this.currentTime.getMinutes();

		this.setClockHours();
		this.setClockMinutes();

		$('.get-directions-icon').addClass('animate');
	},

	getCurrentTime: function(){
		return new Date();
	},

	setClockHours: function(){
		var degrees = (this.hours - 12) * 30;

		$('.clock .hours').rotate(degrees);
	},

	setClockMinutes: function(){
		var degrees = (360/60) * this.minutes;

		$('.clock .minutes').rotate(degrees);
	}
}


$(function(){
	ml.Contact.init();

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
});