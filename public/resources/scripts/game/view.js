define([
    'jquery',
    'config'
],
function($, config) {

    'use strict';

	return function GameView (el, model) {

		/**
	     * Render the game view.
	     * @return {undefined}
	     */
		this.render = function () {
	        $(el).html(model.html);
	    };

	    

    };

});