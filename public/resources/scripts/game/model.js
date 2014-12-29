define([
    'jquery',
    'config',
    'game/dataStructures/puzzle',
    'game/dataStructures/operation'
],
function($, config, Puzzle, Operation) {

    'use strict';

    var MAX_POINTS = 100000;

    return function GameModel (el, puzzleSpecs) {

    	this.puzzleSpecs = puzzleSpecs;

    	this.puzzle = new Puzzle(this.puzzleSpecs);

    	this.points = MAX_POINTS;

    	this.gameOver = false;

    	this.isWin = false;

		this.playTurn = function (index, turnData) {
			var isValid = this.puzzle.nodes[index].verify();

			if (isValid)
				this.points -= 10;
			else 
				this.points -= 200;

			this.isWin = this.puzzle.isWin();
			this.gameOver = this.isWin || this.points <= 0;
		};

		this.playTurnValue = function (index, value) {
			this.puzzle.nodes[index].value = value;

			this.playTurn(index, value);
		};

		this.playTurnOp = function (index, op) {
			this.puzzle.nodes[index].op = op;

			this.playTurn(index, op);
		};

		this.reset = function () {
			this.puzzle = new Puzzle(this.puzzleSpecs);
			this.points = MAX_POINTS;
			this.gameOver = false;
			this.isWin = false;
		}

    };

});