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

			this.bindEvents();

			this.startSwapping();
		},

		bindEvents: function(){
			var _this = this;

			$('#people .tile').click(function(){
				// hide this tile and show another

				_this.swapTiles($(this).data('employee-img'));
			});

			$('#people .tile').mouseover(function(){
				
			});			
		},

		createStartTiles: function(){
			var tiles = this.container.find('.tile.employee');

			if(ML_vars.device === 'desktop'){
				$('.tile.mobile-empty', $('#people')).removeClass('mobile-empty').addClass('employee');
			}

			tiles.addClass('blank');
			tiles.append('<div class="front"></div><div class="back"></div><div class="hover-state"></div>');

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

		hideEmployee: function(employeeToSwap){
			if(this.availableEmployees.length === 0){
				return;
			}

			var employee = employeeToSwap || this.fetchEmployee(this.visibleEmployees);
			var i = $.inArray(employee, this.visibleEmployees);

			this.visibleEmployees.splice(i, 1);
			this.hiddenEmployees.push(employee);

			$('[data-employee-img="'+ employee +'"]')
				.addClass('blank')
				.attr('data-client-img', '')
				.find('.front div, .back div, .hover-state div')
				.remove();
		},

		showEmployee: function(){
			var client = this.fetchEmployee(this.availableEmployees);
			var i = $.inArray(client, this.availableEmployees);

			var tileToFill = this.container.find('.blank')[this.getRanNum(this.container.find('.blank').length)];

			this.addImage(tileToFill, client);
			$(tileToFill).removeClass('blank');

			// $(tileToFill).flip(false);
			
			this.availableEmployees.splice(i, 1);
			this.hiddenEmployees.splice(i, 1);

			this.usedEmployees.push(client);
			this.visibleEmployees.push(client);	

			if(this.availableEmployees.length === 0){
				this.reset();
			}					
		},

		swapTiles: function(employeeToSwap){
			this.hideEmployee(employeeToSwap);
			this.showEmployee(employeeToSwap);
		},

		addImage: function(tile, employee){
			// $(tile).find('.front').append('<img src="'+ imgDir + '/' + this.imageFolder + '/' + employee + '_rest.jpg"/>');
			// $(tile).find('.back').append('<img src="'+ imgDir + '/' + this.imageFolder + '/hover/' + employee + '_hover.jpg"/>');
			$(tile).find('.front').append('<div style="height: 100%; width: 100%; background-size: cover; background-position: center; background-image: url(' + imgDir + '/' + this.imageFolder + '/hover/' + employee + '_hover.jpg)"></div>');
			$(tile).find('.back').append('<div style="height: 100%; width: 100%; background-size: cover; background-position: center; background-image: url(' + imgDir + '/' + this.imageFolder + '/' + employee + '_rest.jpg)"></div>');
			$(tile).find('.hover-state').append('<div style="height: 100%; width: 100%; background-size: cover; background-position: center; background-image: url(' + imgDir + '/' + this.imageFolder + '/hover/' + employee + '_hover.jpg)"></div>');
			
			$(tile).attr('data-employee-img', employee);
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
			swapSpeed: 2000
		});	
	});

})(jQuery);