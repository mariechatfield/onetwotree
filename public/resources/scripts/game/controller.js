define([
    'jquery',
    'game/model',
    'game/view'
],
function($, GameModel, GameView) {

    'use strict';

    function clickNode (event) {
        var index =  parseInt(event.toElement.id);
        console.log("clicked node " + index);

        // this.gameModel.playTurnValue(index, value);

        // setListeners();
    };

    function clickOp (event) {
        var index =  parseInt(event.toElement.id);
        console.log("clicked op " + index);

        // this.gameModel.playTurnOp(index, op);

        // setListeners();
    };

    function setListeners () {
        $('.node:not(.final)')
        .click(clickNode);

        $('.op:not(.final)')
        .click(clickOp);
    }

    return function GameController() {

        this.init = function () {
            this.gameModel = new GameModel();
            this.gameModel.generatePuzzle();

            setListeners();
        };

    };

   

    

});