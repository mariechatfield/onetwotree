define([
    'jquery',
    'config',
    'hbs!/centarithmetic/public/resources/templates/board',
    'hbs!/centarithmetic/public/resources/templates/gameOver'
],
function($, config, BoardTemplate, GameOverTemplate) {

    'use strict';

    function setNodeBoxSize () {
    	var maxWidth = Math.floor($('#workspace').width() / 7),
            maxHeight = Math.floor(maxWidth * 1.4);

        $('.nodeBox').css({'width': maxWidth + 'px', 'height': maxHeight + 'px'});
    }

	return function GameView (el, model) {

		/**
	     * Render the game view.
	     * @return {undefined}
	     */
	    this.render = function () {

	    	var boardData = {},
	    		i;

	    	for (i = 0; i < model.puzzle.numNodes; i++) {
	    		var node = model.puzzle.nodes[i];
	    		boardData["node" + i] = {index: i, node: node};
	    	}

	    	boardData.easy = model.puzzle.numNodes == 10;
	    	boardData.medium = model.puzzle.numNodes == 15;
	    	boardData.hard = model.puzzle.numNodes == 21;

			$(el).html(BoardTemplate(boardData));

			this.renderPoints();

			setNodeBoxSize();
			$(window).resize(setNodeBoxSize);

	    };

	    this.renderPoints = function () {
	    	$("#points").html("Points: " + model.points);

	    	if (model.gameOver) {
	    		$('.node').attr('disabled', 'disabled');
				$('.op').attr('disabled', 'disabled');

				$('#board').attr('class', 'gameOver');

				$('#alert').html(GameOverTemplate(model));
			}
	    }

	    

    };

});