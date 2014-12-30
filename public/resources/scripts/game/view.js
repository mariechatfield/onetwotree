define([
    'jquery',
    'config',
    'hbs!/onetwotree/public/resources/templates/board',
    'hbs!/onetwotree/public/resources/templates/gameOver'
],
function($, config, BoardTemplate, GameOverTemplate) {

    'use strict';

    var maxNodesPerRow;

    function setNodeBoxSize () {
    	var maxNodes, maxWidth, maxHeight;

    	maxWidth = Math.floor($('#workspace').width() / (maxNodesPerRow + 1));
       	maxHeight = Math.floor(maxWidth * 1.4);

        $('.nodeBox').css({'width': maxWidth + 'px', 'height': maxHeight + 'px'});
    }

    /* Make sure handler is only attached once. */
	$(window).off('resize').on('resize', setNodeBoxSize);

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

			if (model.puzzle.numNodes === 10)
				maxNodesPerRow = 4;
			else if (model.puzzle.numNodes === 15)
				maxNodesPerRow = 5;
			else if (model.puzzle.numNodes === 21)
				maxNodesPerRow = 6;

			setNodeBoxSize();
	    };

	    this.renderPoints = function () {
	    	$("#points").html("Points: " + model.points);

	    	if (model.gameOver) {
	    		$('.nodeBox.node').attr('disabled', 'disabled');
				$('.nodeBox.op').attr('disabled', 'disabled');

				$('#board').attr('class', 'gameOver');

				$('#alert').html(GameOverTemplate(model));
			}
	    }

	    

    };

});