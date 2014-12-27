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

    var gameModel, gameView;

    function clickNode (event) {
        var index =  parseInt(event.target.id),
            node = gameModel.puzzle.nodes[index];

        $('#' + index + 'node').html(InputValueTemplate(node));

        $('#inputValue').focus();

        $('#inputValue').keypress(function(event){
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
        var index =  parseInt(event.target.id),
            node = gameModel.puzzle.nodes[index];
        
        $('#' + index + 'op').html(InputOpTemplate(node));

        $('#inputOp').focus();

        $('#inputOp').change(function (event) {
            var op;

            switch ($('#inputOp').val()) {
                case 'add': op = Operation.ADD(); break;
                case 'sub': op = Operation.SUB(); break;
                case 'mult': op = Operation.MULT(); break;
                case 'div': op = Operation.DIV(); break;
                default: op = Operation.NULL;
            }

            if (index >= 0 && index < gameModel.puzzle.nodes.length)
                playOp(index, op);
        });

    };

    function playValue(index, value) {
        gameModel.playTurnValue(index, value);
        gameView.render();

        setListeners();
        $('#input').empty();   
    };

    function playOp(index, op) {
        gameModel.playTurnOp(index, op);
        gameView.render();

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
            gameModel = new GameModel('#workspace');
            gameView = new GameView('#workspace', gameModel, this);

            gameModel.generatePuzzle();
            
            this.startGame();
        };

        this.reset = function () {
            gameModel.reset();
            this.startGame();
        };

        this.startGame = function () {
            gameView.render();

            setListeners();

            // Decrement points on a timer
            var pointsTimer = setInterval(function () { 

                gameModel.points -= 1;
                if (gameModel.points <= 0) {
                    gameModel.gameOver = true;
                }

                if (gameModel.gameOver)
                    clearInterval(pointsTimer);

                gameView.renderPoints();

            }, 400);
        };

    };
});