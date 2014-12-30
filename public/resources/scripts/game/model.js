define([
    'jquery',
    'game/dataStructures/puzzle'
], function ($, Puzzle) {

    'use strict';

    /* The amount of points with which each game starts. */
    var MAX_POINTS = 50000;

    /**
     * Constructor for the model of the game MVC.
     * @param {{initValues: number[],
     *              initOps: AOperation[]}}
     *        puzzleSpecs - the initial state of this game's puzzle
     */
    return function GameModel(puzzleSpecs) {

        /** @type {{initValues: number[],
         *              initOps: AOperation[]}}
         *        puzzleSpecs - the initial state of this game's puzzle
         */
        this.puzzleSpecs = puzzleSpecs;

        /** @type {Puzzle} puzzle - this game's puzzle */
        this.puzzle = new Puzzle(this.puzzleSpecs);

        /** @type {number} points - the current number of points remaining */
        this.points = MAX_POINTS;

        /** @type {Boolean} gameOver - true if game is over, false otherwise */
        this.gameOver = false;

        /** @type {Boolean} isWin - true if winning state, false otherwise */
        this.isWin = false;

        /**
         * Updates the model's state after a turn is played.
         * @param  {number} index - the index of the node which was changed
         */
        this.updateState = function (index) {
            var isValid = this.puzzle.nodes[index].verify();

            if (isValid) {
                this.points -= 100;
            } else {
                this.points -= 500;
            }

            this.isWin = this.puzzle.isWin();
            this.gameOver = this.isWin || this.points <= 0;
        };

        /**
         * Play a turn in which a given node's value is set.
         * @param  {number} index - the index of the node
         * @param  {number} value - the value to assign the node
         */
        this.playTurnNode = function (index, value) {
            this.puzzle.nodes[index].value = value;

            this.updateState(index);
        };

        /**
         * Play a turn in which a given node's operation is set.
         * @param  {number} index - the index of the node
         * @param  {AOperation} op - the operation to assign the node
         */
        this.playTurnOp = function (index, op) {
            this.puzzle.nodes[index].op = op;

            this.updateState(index);
        };

        /**
         * Reset the game to its initial state.
         */
        this.reset = function () {
            this.puzzle = new Puzzle(this.puzzleSpecs);
            this.points = MAX_POINTS;
            this.gameOver = false;
            this.isWin = false;
        };

    };

});