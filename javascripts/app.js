// APP.js

var s;

var APP = {

	settings: {
		$processArea 	: $('#process-area'),
		$stepGraph 		: $('#step-graph'),

		$apps 			: $('#apps'),

		navigation 		: {
			initialClass: 'right-aligned'
		}
	},

	filterPath: function(string) {
		return string
		    .replace(/^\//,'')
		    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
		    .replace(/\/$/,'');
	},

	// use the first element that is "scrollable"
  	scrollableElement: function(els) {
	    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
	    	var el = arguments[i],
	        	$scrollElement = $(el);
	      	if ($scrollElement.scrollTop()> 0) {
	        	return el;
	      	} else {
	        	$scrollElement.scrollTop(1);
	        	var isScrollable = $scrollElement.scrollTop()> 0;
	        	$scrollElement.scrollTop(0);
		        if (isScrollable) {
		        	return el;
		        }
		    }
	    }
	    return [];
  	},

	init: function() {

		var self = this;

		s = this.settings;

		$(document).foundation();

		self.bindingMachine();


		var locationPath = self.filterPath(location.pathname);
		var scrollElem = self.scrollableElement('html', 'body');
		 
		$('a[href*=#]').each(function() {
			var thisPath = self.filterPath(this.pathname) || locationPath;
			if (  locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/,'') ) {
				var $target = $(this.hash), target = this.hash;
				if (target) {
					var targetOffset = $target.offset().top;
					$(this).click(function(event) {
						event.preventDefault();
						$(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
							location.hash = target;
						});
					});
				}
			}
		});
		 
		  
		 
	},

	bindingMachine: function() {
		var self = this;
		
		s.$processArea.waypoint(function() {
			s.$stepGraph.removeClass( s.navigation.initialClass );
		}, { offset: 500 });

		s.$apps.waypoint(function() {
			s.$apps.find('.panel-app').each(function(index) {
				$(this).animate( { "opacity": 1 }, 500*(index+1) );
			});
		}, { offset: 200 });
	}
}

$(document).ready(function($) {
	// Stuff to do as soon as the DOM is ready;
	APP.init();
});