define([
    'jquery',
    'game/dataStructures/puzzle'
], function ($, Puzzle) {

    'use strict';

    var MAX_POINTS = 50000;

    return function GameModel(el, puzzleSpecs) {

        this.puzzleSpecs = puzzleSpecs;

        this.puzzle = new Puzzle(this.puzzleSpecs);

        this.points = MAX_POINTS;

        this.gameOver = false;

        this.isWin = false;

        this.playTurn = function (index) {
            var isValid = this.puzzle.nodes[index].verify();

            if (isValid) {
                this.points -= 100;
            } else {
                this.points -= 500;
            }

            this.isWin = this.puzzle.isWin();
            this.gameOver = this.isWin || this.points <= 0;
        };

        this.playTurnValue = function (index, value) {
            this.puzzle.nodes[index].value = value;

            this.playTurn(index);
        };

        this.playTurnOp = function (index, op) {
            this.puzzle.nodes[index].op = op;

            this.playTurn(index);
        };

        this.reset = function () {
            this.puzzle = new Puzzle(this.puzzleSpecs);
            this.points = MAX_POINTS;
            this.gameOver = false;
            this.isWin = false;
        };

    };

});