var changeTiles,
    clients,
	usedLogos = [],
	unUsedLogos = [],
	emptyTiles = [],
	filledTiles = [];

(function($){
	ml.About = {
		init: function(){

		}
	}
	
	usedLogos = [
		'ally.png', 
		'best_buy.png',
		'dell.png',		
		'google.png',	
		'indian.png',
		'optum.png',
		'pizza_hut.png',	
		'staples.png'					
	];

	$(function(){

		var clientTiles = $('#clients .tile');

			clientTiles.each(function(i, elm){
				if($(elm).is('.blank')){
					emptyTiles.push($(elm));
				} else {
					filledTiles.push($(elm));
				}
			});

			$(clients).each(function(i, client){
				if($.inArray(client,usedLogos) === -1){
					unUsedLogos.push(client);	
				}
			});	

		changeTiles = function(){
			var numFilledTiles = filledTiles.length;
			var numEmptyTiles = emptyTiles.length;

			var randoFillNum = Math.floor(Math.random() * numFilledTiles);
			var randoEmptyNum = Math.floor(Math.random() * numEmptyTiles);

			var tileToEmpty = filledTiles[randoFillNum];
			var tileToFill = emptyTiles[randoEmptyNum];

			emptyTiles = [];
			filledTiles = [];

			var indexToRemove = $.inArray($(tileToEmpty).data('img'), usedLogos);

			usedLogos.splice(indexToRemove, 1);

			console.log(tileToEmpty, $(tileToEmpty).data('img'));

			unUsedLogos.push($(tileToEmpty).data('img'));
			var clientsImgNum = Math.floor(Math.random() * unUsedLogos.length);

			$(tileToEmpty).addClass('blank').find('img').remove();

			if($(tileToFill).find('img').length === 0){
				console.log(unUsedLogos[clientsImgNum]);
				$(tileToFill).data('img', unUsedLogos[clientsImgNum]);
				$('<img src="'+ imgDir +'/clients/'+ unUsedLogos[clientsImgNum] +'">').appendTo($(tileToFill));
				var i = $.inArray(unUsedLogos[clientsImgNum], unUsedLogos);

				usedLogos.push(unUsedLogos[clientsImgNum]);
				unUsedLogos.splice(i, 1);
			} else {
				$(tileToFill).find('img').attr('src', imgDir +'/clients/'+ unUsedLogos[clientsImgNum]);
				$(tileToFill).find('img').attr('data-img', unUsedLogos[clientsImgNum]);

				var i = $.inArray(unUsedLogos[clientsImgNum], unUsedLogos);
				unUsedLogos.splice(i, 1);
			}

			
			$(tileToFill).removeClass('blank');

			clientTiles.each(function(i, elm){
				if($(elm).is('.blank')){
					emptyTiles.push($(elm));
				} else {
					filledTiles.push($(elm));
				}
			});	
		};

		setInterval(function(){
			changeTiles();
		}, 2000);
	});
})(jQuery);