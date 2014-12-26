define([
    'jquery',
    'config',
    'game/dataStructures/puzzle',
    'game/dataStructures/operation'
],
function($, config, Puzzle, Operation) {

    'use strict';

    return function GameModel () {

    	this.html = "";

    	this.points = 0;

    	this.generatePuzzle = function () {

    		var initValues = [100, 0, 25, 15, 0, 0, 0, 7, 0, 0, 24, 3, 4, 2, 5];
	    	var initOps = [0, 0, 0, 0, 0, 0, 0, Operation.ADD, 0, 0];

			this.puzzle = new Puzzle(initValues, initOps);

			return this.setHTML();
		};

		this.playTurn = function (index, turnData) {
			var isValid = this.puzzle.nodes[index].verify();

			if (isValid)
				this.points += 2;
			else
				this.points += 10;

			console.debug("Set {0} to {1} --> {2}  \t Points: {3}".format(index, turnData, isValid, this.points));

			return this.setHTML();
			
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

	    	var that = this,
	    		defer = new $.Deferred();

	        $.ajax({
	            url: "/public/resources/partials/board.html",
	            success: function (results) {
	            	that.html = results;
	            },
	            error: function (xhr, status, response) {
	                that.html = '<h2>' + xhr.status + ': ' + response + '</h2>';
	            },
	            // Trigger change when complete so View can render.
                complete: function () {
                    $('#workspace').html(that.html);
                    defer.resolve();
                }
	        });

	     	return defer.promise();

	    };

    };

    

});