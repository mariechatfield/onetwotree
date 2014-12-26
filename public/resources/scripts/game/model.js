define([
    'jquery',
    'config',
    'game/dataStructures/puzzle',
    'game/dataStructures/operation',
    'hbs!/centarithmetic/public/resources/templates/board'
],
function($, config, Puzzle, Operation, BoardTemplate) {

    'use strict';

    return function GameModel () {

    	this.html = "";

    	this.points = 0;

    	this.generatePuzzle = function () {

    		var initValues = [100, 0, 25, 15, 0, 0, 0, 7, 0, 0, 24, 3, 4, 2, 5];
	    	var initOps = [0, 0, 0, 0, 0, 0, 0, Operation.ADD, 0, 0];

			this.puzzle = new Puzzle(initValues, initOps);

			this.setHTML();
		};

		this.playTurn = function (index, turnData) {
			var isValid = this.puzzle.nodes[index].verify();

			if (isValid)
				this.points += 2;
			else
				this.points += 10;

			this.setHTML();
		};

		this.playTurnValue = function (index, value) {
			this.puzzle.nodes[index].value = value;

			this.playTurn(index, value);
		};

		this.playTurnOp = function (index, op) {
			this.puzzle.nodes[index].op = op;

			this.playTurn(index, op);
		};

		this.setHTML = function () {

	    	var boardData = {},
	    		i;

	    	for (i = 0; i < 15; i++) {
	    		var node = this.puzzle.nodes[i];
	    		boardData["node" + i] = {index: i, node: node};
	    	}

			this.html = BoardTemplate(boardData);
			$('#workspace').html(this.html);


			$("#points").html("Points: " + this.points);

	    };

    };

    

});