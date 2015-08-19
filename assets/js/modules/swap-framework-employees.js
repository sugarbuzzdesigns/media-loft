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
		var clientsImgNum = Math.floor(Math.random() * unUsedEmployees.length);

		$(tileToEmpty).addClass('blank').find('img').remove();

		if($(tileToFill).find('img').length === 0){
			// console.log(unUsedEmployees[clientsImgNum]);
			$(tileToFill).data('img', unUsedEmployees[clientsImgNum]);
			$('<img src="'+ imgDir +'/clients/'+ unUsedEmployees[clientsImgNum] +'">').appendTo($(tileToFill));
			var i = $.inArray(unUsedEmployees[clientsImgNum], unUsedEmployees);

			usedEmployees.push(unUsedEmployees[clientsImgNum]);
			unUsedEmployees.splice(i, 1);
		} else {
			$(tileToFill).find('img').attr('src', imgDir +'/clients/'+ unUsedEmployees[clientsImgNum]);
			$(tileToFill).find('img').attr('data-img', unUsedEmployees[clientsImgNum]);

			var i = $.inArray(unUsedEmployees[clientsImgNum], unUsedEmployees);
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