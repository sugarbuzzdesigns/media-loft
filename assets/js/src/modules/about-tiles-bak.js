(function($){

	ml.About.clientTileSwap = {
		init: function(){
			var changeTiles,clients,usedLogos=[],unUsedLogos=[],emptyTiles=[],filledTiles=[];usedLogos=["ally.png","best_buy.png","dell.png","google.png","indian.png","optum.png","pizza_hut.png","staples.png"];var clientTiles=$("#clients .tile");clientTiles.each(function(s,e){$(e).is(".blank")?emptyTiles.push($(e)):filledTiles.push($(e))}),$(clients).each(function(s,e){-1===$.inArray(e,usedLogos)&&unUsedLogos.push(e)}),changeTiles=function(){var s=filledTiles.length,e=emptyTiles.length,i=Math.floor(Math.random()*s),n=Math.floor(Math.random()*e),l=filledTiles[i],o=emptyTiles[n];emptyTiles=[],filledTiles=[];var a=$.inArray($(l).data("img"),usedLogos);usedLogos.splice(a,1),unUsedLogos.push($(l).data("img"));var g=Math.floor(Math.random()*unUsedLogos.length);if($(l).addClass("blank").find("img").remove(),0===$(o).find("img").length){$(o).data("img",unUsedLogos[g]),$('<img src="'+imgDir+"/clients/"+unUsedLogos[g]+'">').appendTo($(o));var t=$.inArray(unUsedLogos[g],unUsedLogos);usedLogos.push(unUsedLogos[g]),unUsedLogos.splice(t,1)}else{$(o).find("img").attr("src",imgDir+"/clients/"+unUsedLogos[g]),$(o).find("img").attr("data-img",unUsedLogos[g]);var t=$.inArray(unUsedLogos[g],unUsedLogos);unUsedLogos.splice(t,1)}$(o).removeClass("blank"),clientTiles.each(function(s,e){$(e).is(".blank")?emptyTiles.push($(e)):filledTiles.push($(e))})},setInterval(function(){changeTiles()},2e3);
		}
	}	

	ml.About.empTileSwap = {
		init: function(){

		}
	}
	
	// DOC READY
	$(function(){
		ml.About.Global.init();
		ml.About.Timeline.init();
		ml.About.clientTileSwap.init();

	var changeEmpTiles,
		usedEmployees = [],
		unUsedEmployees = [],
		emptyEmpTiles = [],
		filledEmpTiles = [];

		usedEmployees = [
			'camie',
			'bill',
			'brian',
			'joe',
			'jusint',
			'kim',
			'kay',
			'debbie'
		];

	var employeeTiles = $('#people .tile');

		employeeTiles.each(function(i, elm){
			if($(elm).is('.blank')){
				emptyEmpTiles.push($(elm));
			} else {
				filledEmpTiles.push($(elm));
			}
		});

		$(employees).each(function(i, employee){
			if($.inArray(employee,usedEmployees) === -1){
				unUsedEmployees.push(employee);	
			}
		});	

	changeEmpTiles = function(){
		var numFilledTiles = filledEmpTiles.length;
		var numEmptyTiles = emptyEmpTiles.length;

		var randoFillNum = Math.floor(Math.random() * numFilledTiles);
		var randoEmptyNum = Math.floor(Math.random() * numEmptyTiles);

		var tileToEmpty = filledEmpTiles[randoFillNum];
		var tileToFill = emptyEmpTiles[randoEmptyNum];

		emptyEmpTiles = [];
		filledEmpTiles = [];

		var indexToRemove = $.inArray($(tileToEmpty).data('img'), usedEmployees);

		usedEmployees.splice(indexToRemove, 1);

		unUsedEmployees.push($(tileToEmpty).data('img'));
		var empImgNum = Math.floor(Math.random() * unUsedEmployees.length);

		$(tileToEmpty).addClass('blank').find('img').remove();

		if($(tileToFill).find('img').length === 0){
			// console.log(unUsedEmployees[empImgNum]);
			$(tileToFill).data('img', unUsedEmployees[empImgNum]);
			$('<img src="'+ imgDir +'/employees/'+ unUsedEmployees[empImgNum] +'_rest.jpg">').appendTo($(tileToFill));
			$('<img src="'+ imgDir +'/employees/hover/'+ unUsedEmployees[empImgNum] +'_hover.jpg">').appendTo($(tileToFill));
			
			var i = $.inArray(unUsedEmployees[empImgNum], unUsedEmployees);

			usedEmployees.push(unUsedEmployees[empImgNum]);
			unUsedEmployees.splice(i, 1);
		} else {
			$(tileToFill).find('img').attr('src', imgDir +'/clients/'+ unUsedEmployees[empImgNum]);
			$(tileToFill).find('img').attr('data-img', unUsedEmployees[empImgNum]);

			var i = $.inArray(unUsedEmployees[empImgNum], unUsedEmployees);
			unUsedEmployees.splice(i, 1);
		}

		
		$(tileToFill).removeClass('blank');

		employeeTiles.each(function(i, elm){
			if($(elm).is('.blank')){
				emptyEmpTiles.push($(elm));
			} else {
				filledEmpTiles.push($(elm));
			}
		});	
	};

	setInterval(function(){
		// changeEmpTiles();
	}, 2000);		

})(jQuery);