(function($){

	ml.About.tileSwapEmployees = {
		init: function(settings){
			var e = settings.tileArray;
			
			this.container = settings.container;
			this.tileLimit = settings.tileLimit;
			this.swapSpeed = settings.swapSpeed;
			this.imageFolder = settings.imageFolder;

			this.swapInterval = null;

			this.allEmployees = e.slice(0);
			this.visibleEmployees = [];
			this.hiddenEmployees = [];
			this.availableEmployees = e.slice(0);
			this.usedEmployees = [];

			this.$startTiles = this.createStartTiles();

			this.setupTiles();
			this.startSwapping();
		},

		createStartTiles: function(){
			var tiles = this.container.find('.tile.employee');

			tiles.addClass('blank');
			tiles.append('<div class="front"></div><div class="back"></div>');

			tiles.flip();

			for (var i = 0; i < this.tileLimit; i++) {
				var blankTiles =  this.container.find('.tile.blank');
				
				var random = this.getRanNum(blankTiles.length);

				$(blankTiles[random]).removeClass('blank');
			}
			return this.container.find('.tile.employee').not('.blank');
		},

		setupTiles: function(){
			for (var i = 0; i < 8; i++) {
				this.visibleEmployees.push(this.allEmployees[i]);
				this.usedEmployees.push(this.allEmployees[i]);

				var ci = $.inArray(this.allEmployees[i], this.availableEmployees);

				this.availableEmployees.splice(ci, 1);

				this.addImage(this.$startTiles[i], this.allEmployees[i]);
			}

			this.hiddenEmployees = this.availableEmployees.slice(0);
		},

		getRanNum: function(max){
			return Math.floor(Math.random() * (max));
		},

		fetchEmployee: function(array){
			var clientIndex = this.getRanNum(array.length);
			var client = array[clientIndex];

			return client;
		},

		hideEmployee: function(){
			if(this.availableEmployees.length === 0){
				return;
			}

			var client = this.fetchEmployee(this.visibleEmployees);
			var i = $.inArray(client, this.visibleEmployees);

			this.visibleEmployees.splice(i, 1);
			this.hiddenEmployees.push(client);

			$('[data-client-img="'+ client +'"]')
				.addClass('blank')
				.attr('data-client-img', '')
				.find('.front img, .back img')
				.remove();
		},

		showEmployee: function(){
			var client = this.fetchEmployee(this.availableEmployees);
			var i = $.inArray(client, this.availableEmployees);

			var tileToFill = this.container.find('.blank')[this.getRanNum(this.container.find('.blank').length)];

			this.addImage(tileToFill, client);
			$(tileToFill).removeClass('blank');
			
			this.availableEmployees.splice(i, 1);
			this.hiddenEmployees.splice(i, 1);

			this.usedEmployees.push(client);
			this.visibleEmployees.push(client);	

			if(this.availableEmployees.length === 0){
				this.reset();
			}					
		},

		swapTiles: function(){
			this.hideEmployee();
			this.showEmployee();
		},

		addImage: function(tile, employee){
			$(tile).find('.front').append('<img src="'+ imgDir + '/' + this.imageFolder + '/' + employee + '_rest.jpg"/>');
			$(tile).find('.back').append('<img src="'+ imgDir + '/' + this.imageFolder + '/hover/' + employee + '_hover.jpg"/>');
			$(tile).attr('data-client-img', employee);
		},

		reset: function(){
			this.availableEmployees = this.hiddenEmployees.slice(0);
			this.usedEmployees = [];
		},

		startSwapping: function(){
			var _this = this;
			
			_this.swapInterval = setInterval(function(){
				_this.swapTiles(); 
			}, _this.swapSpeed);
		}
	};

	$(function(){
		ml.About.tileSwapEmployees.init({
			imageFolder: 'employees',
			tileArray: employees,
			container: $('#people'),
			tileLimit: 8,
			swapSpeed: 5000
		});	
	});

})(jQuery);