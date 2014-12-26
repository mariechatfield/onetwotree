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

    };

    function clickOp (event) {
        var index =  parseInt(event.toElement.id);
        console.log("clicked op " + index);
    };

    return function GameController() {

        this.init = function () {
            this.gameModel = new GameModel();
            this.gameModel.generatePuzzle().done(
                function () {
                    $('.node').click(clickNode);
                    $('.op').click(clickOp);
                }
            );
            
        };

        this.playTurn = function (index, turn, isValue) {
            console.debug("Play turn!");

            if (isValue)
                this.gameModel.playTurnValue(index, turn);
            else
                this.gameModel.playTurnOp(index, turn);

            this.gameView.render();
        }

    };

   

    

});