(function($){

	ml.About.tileSwap = {
		init: function(){
			var clients = ["ally.png", "best_buy.png", "boston_scientific.png", "cargill.png", "dell.png", "dockers.png", "google.png", "indian.png", "mayo_clinic.png", "nike.png", "optum.png", "pizza_hut.png", "porsche.png", "staples.png", "target.png", "united_health.png"];
			
			this.container = $('#clients');
			this.tileLimit = 8;
			this.swapSpeed = 2000;

			this.swapInterval = null;

			this.allClients = clients.slice(0);
			this.visibleClients = [];
			this.hiddenClients = [];
			this.availableClients = clients.slice(0);
			this.usedClients = [];

			this.$startTiles = this.createStartTiles();

			this.setupTiles();
			this.startSwapping();
		},

		createStartTiles: function(){
			var tiles = $('#clients .tile.client');
			
			tiles.addClass('blank');

			for (var i = 0; i < this.tileLimit; i++) {
				var blankTiles = $('#clients .client.blank');

				var random = this.getRanNum(blankTiles.length);

				$(blankTiles[random]).removeClass('blank');
			}
			return $('#clients .tile.client').not('.blank');
		},

		setupTiles: function(){
			for (var i = 0; i < this.tileLimit; i++) {
				this.visibleClients.push(this.allClients[i]);
				this.usedClients.push(this.allClients[i]);

				var ci = $.inArray(this.allClients[i], this.availableClients);

				this.availableClients.splice(ci, 1);

				this.addImage(this.$startTiles[i], this.allClients[i]);
			}

			this.hiddenClients = this.availableClients.slice(0);
		},

		getRanNum: function(max){
			return Math.floor(Math.random() * (max));
		},

		fetchClient: function(array){
			var clientIndex = this.getRanNum(array.length);
			var client = array[clientIndex];

			return client;
		},

		hideClient: function(){
			if(this.availableClients.length === 0){
				return;
			}

			var client = this.fetchClient(this.visibleClients);
			var i = $.inArray(client, this.visibleClients);

			this.visibleClients.splice(i, 1);
			this.hiddenClients.push(client);

			$('[data-client-img="'+ client +'"]')
				.addClass('blank')
				.attr('data-client-img', '')
				.empty();
		},

		showClient: function(){
			var client = this.fetchClient(this.availableClients);
			var i = $.inArray(client, this.availableClients);

			var tileToFill = $('.client.blank')[this.getRanNum($('.client.blank').length)];

			this.addImage(tileToFill, client);
			$(tileToFill).removeClass('blank');
			
			this.availableClients.splice(i, 1);
			this.hiddenClients.splice(i, 1);

			this.usedClients.push(client);
			this.visibleClients.push(client);	

			if(this.availableClients.length === 0){
				this.reset();
			}					
		},

		swapTiles: function(){
			this.hideClient();
			this.showClient();
		},

		addImage: function(tile, client){
			$(tile).append('<img src="'+ imgDir + '/clients/' + client + '"/>');
			$(tile).append('<div class="hover"><img src="'+ imgDir + '/clients/hover/' + client.substring(0, client.length - 3) + 'jpg"/></div>');
			$(tile).attr('data-client-img', client);
		},

		reset: function(){
			this.availableClients = this.hiddenClients.slice(0);
			this.usedClients = [];
		},

		startSwapping: function(){
			var _this = this;
			
			_this.swapInterval = setInterval(function(){
				_this.swapTiles();
			}, _this.swapSpeed);
		}
	};

	$(function(){
		ml.About.tileSwap.init();
	});

})(jQuery);