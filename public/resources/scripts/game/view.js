define([
    'jquery',
    'config',
    'hbs!/centarithmetic/public/resources/templates/board',
    'hbs!/centarithmetic/public/resources/templates/gameOver'
],
function($, config, BoardTemplate, GameOverTemplate) {

    'use strict';

	return function GameView (el, model, controller) {

		/**
	     * Render the game view.
	     * @return {undefined}
	     */
	    this.render = function () {

	    	var boardData = {},
	    		i;

	    	for (i = 0; i < 15; i++) {
	    		var node = model.puzzle.nodes[i];
	    		boardData["node" + i] = {index: i, node: node};
	    	}

			$(el).html(BoardTemplate(boardData));

			this.renderPoints();

	    };

	    this.renderPoints = function () {
	    	$("#points").html("Points: " + model.points);

	    	if (model.gameOver) {
				$('.node').attr('disabled', 'disabled');
				$('.op').attr('disabled', 'disabled');

				$('#board').attr('class', 'gameOver');

				$('#alert').html(GameOverTemplate(model));

				$('#retry').click(function () {
					controller.reset()
				});

				$('#playNew').click(function ()  {
					controller.init()
				});
			}
	    }

	    

    };

});