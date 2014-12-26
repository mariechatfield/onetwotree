define([
    'jquery',
    'game/model',
    'game/view',
    'game/dataStructures/operation',
    'hbs!/centarithmetic/public/resources/templates/inputValue',
    'hbs!/centarithmetic/public/resources/templates/inputOp'
],
function($, GameModel, GameView, Operation, InputValueTemplate, InputOpTemplate) {

    'use strict';

    var gameModel;

    function clickNode (event) {
        var index =  parseInt(event.toElement.id),
            node = gameModel.puzzle.nodes[index];
        console.log("clicked node " + index);

        $('#input').html(InputValueTemplate(node));

        $('#inputValue').focus();

        $('#inputForm').keydown(function(event){
            var value = parseInt($('#inputValue').val()),
                valid = false;
            
            if (!Number.isInteger(value) || (value < 0) || (value > 100)) {
                $('#inputForm').attr('class', 'form-group has-error');
            } else if (value == 0) {
                $('#inputForm').attr('class', 'form-group');   
            } else {
                valid = true;
                $('#inputForm').attr('class', 'form-group has-success');
            }

            if(event.keyCode == 13) {
                event.preventDefault();
                if (valid)
                    playValue(index, value);
            }
        });

    };

    function clickOp (event) {
        var index =  parseInt(event.toElement.id),
            node = gameModel.puzzle.nodes[index];
        
        $('#input').html(InputOpTemplate(node));

        $('#addBtn').click(function () {
            playOp(index, Operation.ADD);
        });

        $('#subBtn').click(function () {
            playOp(index, Operation.SUB);
        });

        $('#multBtn').click(function () {
            playOp(index, Operation.MULT);
        });

        $('#divBtn').click(function () {
            playOp(index, Operation.DIV);
        });

    };

    function playValue(index, value) {
        gameModel.playTurnValue(index, value);
        setListeners();
        $('#input').empty();   
    };

    function playOp(index, op) {
        gameModel.playTurnOp(index, op);
        setListeners();
        $('#input').empty();
    };

    function setListeners () {
        $('.node:not(.final)')
        .click(clickNode);

        $('.op:not(.final)')
        .click(clickOp);


    }

    return function GameController() {

        this.init = function () {
            gameModel = new GameModel();
            gameModel.generatePuzzle();

            setListeners();
        };

        // this.playTurn = function (index, turn, isValue) {
        //     console.debug("Play turn!");

        //     if (isValue)
        //         this.gameModel.playTurnValue(index, turn);
        //     else
        //         this.gameModel.playTurnOp(index, turn);

        //     setListeners();
        // }

    };

   

    

});