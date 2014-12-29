define([
    'jquery',
    'game/model',
    'game/view',
    'game/dataStructures/operation',
    'game/puzzleGenerator',
    'hbs!/centarithmetic/public/resources/templates/inputValue',
    'hbs!/centarithmetic/public/resources/templates/inputOp'
],
function($, GameModel, GameView, Operation, PuzzleGenerator, InputValueTemplate, InputOpTemplate) {

    'use strict';

    var gameModel, gameView, setAppListeners;

    function clickNode (event) {
        var index =  parseInt(event.target.id),
            node = gameModel.puzzle.nodes[index];

        $('#' + index + 'node').html(InputValueTemplate(node));

        $('#inputValue').focus();

        $('#inputValue').keypress(function(event){
            var value = parseInt($('#inputValue').val()),
                valid = false;
            
            if ((value < 0) || (value > 100)) {
                $('#inputForm').attr('class', 'form-group has-error');
            } else if (value == 0) {
                $('#inputForm').attr('class', 'form-group');   
            } else {
                valid = true;
                $('#inputForm').attr('class', 'form-group has-success');
            }
            
        });

        $('#inputValue').change(function(event) {
            var value = parseInt($('#inputValue').val());

            if ((value > 0) && (value <= 100))
                playValue(index, value);        
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
        $('.nodeBox .node:not(.final)')
        .click(clickNode);

        $('.nodeBox .op:not(.final)')
        .click(clickOp);

        setAppListeners();
    }

    return function GameController(settings) {

        this.settings = settings;

        setAppListeners = settings.setAppListeners;

        this.init = function () {

           var puzzleSpecs;

           switch (this.settings.difficulty) {
                case 'Easy': puzzleSpecs = PuzzleGenerator.Easy(); break;
                case 'Medium': puzzleSpecs = PuzzleGenerator.Medium(); break;
                case 'Hard': puzzleSpecs = PuzzleGenerator.Hard(); break;
           }

            gameModel = new GameModel('#workspace', puzzleSpecs);
            gameView = new GameView('#workspace', gameModel, this);

            this.startGame();
        };

        this.reset = function () {
            this.cancel();
            gameModel.reset();
            this.startGame();
        };

        this.cancel = function () {
            clearInterval(this.pointsTimer);
            gameModel.points = 0;
        }

        this.startGame = function () {
            var that = this;

            gameView.render();

            setListeners();

            this.pointsTimer;

            if (settings.timer) {

                // Decrement points on a timer
                this.pointsTimer = setInterval(function () { 

                    gameModel.points -= 5;
                    if (gameModel.points <= 0) {
                        gameModel.gameOver = true;
                    }

                    if (gameModel.gameOver)
                        clearInterval(that.pointsTimer);

                    gameView.renderPoints();

                }, 400);

            }
        };

    };
});