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

	init: function() {

		var self = this;

		s = this.settings;

		$(document).foundation();

		self.bindingMachine();
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
		}, { offset: 200 })
	}
}

$(document).ready(function($) {
	// Stuff to do as soon as the DOM is ready;
	APP.init();
});