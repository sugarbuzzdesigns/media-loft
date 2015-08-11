(function(){

	ml.Work = {

		init: function(){
			// cache some often used elements
			this.$workItems = $('#work-items');
			this.$workItem = $('.work-item');
			// check for #! to go straight work
			this.setupWorkPage();
			this.checkUrl();
			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;
			// WORK PAGE - work items click handler
			_this.$workItem.on('click', function(){
				var workItemId = $(this).attr('id');

				if($(this).not('.show-details')){
					_this.openWorkItem(workItemId);
				}
			});

			$('.work-carousel .close').on('click', function(e){
				e.stopPropagation();

				var workItemId = $(this).closest('.work-item').attr('id');

				_this.closeWorkItem(workItemId);
			});
		},

		setupWorkPage: function(){
			console.log('setupWorkPage');
			var workItemWidth = this.$workItem.outerWidth(),
				numWorkItems = this.$workItem.length,
				workItemsContainerWidth = workItemWidth*numWorkItems;

			this.workItemWidth = workItemWidth;
			this.workItemsContainerWidth = workItemsContainerWidth;

			this.$workItem.css('width', workItemWidth);
			this.$workItems.css('width', workItemsContainerWidth);

			CursorDivScroll('work-items-window', 40).noVertical();
		},

		checkUrl: function(){
			var _this = this,
				hashBang = ml.Utils.getHasbang(),
				hashBangUrl = hashBang.length === 0 ? null : hashBang[0].name,
				hashBangId;

				if(hashBangUrl === null){ return; }

				 hashBangId = hashBangUrl.replace('/', '');
				_this.openWorkItem(hashBangId);
		},

		openWorkItem: function(workItemId){
			$thisWorkItem = $('#' + workItemId);

			this.$workItems.css('width', '100%');

			$thisWorkItem
				.css('width', '100%')
				.addClass('show-details');

			this.$workItem.not('.show-details').css('display', 'none');
		},

		closeWorkItem: function(workItemId){
			$thisWorkItem = $('#' + workItemId);

			console.log(workItemId);

			$thisWorkItem
				.css('width', this.workItemWidth)
				.removeClass('show-details');

			this.$workItem.css('display', 'block');
			this.$workItems.css('width', this.workItemsContainerWidth);
		}
	}	

	$(function(){
		ml.Work.init();
	});
})(jQuery);