var test;

(function($){

	test = {
		init: function(){
			this.items = [10,20,40,70,80,34,78];
			this.usedItems = [];
			tihs.availableItems = [];
		}
	}

	$(function(){

		$('#bottom').lazylinepainter({
		    'svgData': svgData,
		    'responsive': true,
		    'strokeWidth': 7,
		    'strokeColor': '#b5287b'
		}).lazylinepainter('paint');
			
	});

})(jQuery);