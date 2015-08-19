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
		console.log('hey from test');

		function randomNoRepeats(array) {
		  var copy = array.slice(0);
		  return function() {
		    if (copy.length < 1) { copy = array.slice(0); }
		    var index = Math.floor(Math.random() * copy.length);
		    var item = copy[index];
		    copy.splice(index, 1);
		    return item;
		  };
		}

		var chooser = randomNoRepeats([10,20,40,70,80,34,78]);
		console.log(chooser()); // => "Bar"
		console.log(chooser()); // => "Foo"
		console.log(chooser()); // => "Gah"
console.log('breal');
		console.log(chooser());
		console.log(chooser());
		console.log(chooser());
console.log('breal');
		console.log(chooser());
		console.log(chooser());		 // => "Foo" -- only repeats once all items are exhausted.		
		console.log(chooser());		 // => "Foo" -- only repeats once all items are exhausted.		
	});

})(jQuery);