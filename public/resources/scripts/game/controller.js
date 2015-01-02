define([
    'jquery',
    'game/model',
    'game/view',
    'game/dataStructures/operation',
    'game/puzzleGenerator',
    'hbs!/onetwotree/public/resources/templates/inputValue',
    'app.config'
], function ($, GameModel, GameView, Operation, PuzzleGenerator,
    _InputValueTemplate, Config) {

    'use strict';

    var model, /* The model for the game. */
        view, /* The view for the game. */
        setAppListeners; /* Function to set any application-wide listeners. */

    function setListeners() {

        /* Set listener on nodes. */
        $('.nodeBox .node').click(function (event) {
            var index = parseInt(event.target.id),
                node = model.puzzle.nodes[index],
                nodeStr = '#' + index + 'node';

            /* Remove any exisiting forms. */
            $('#inputForm').remove();

            /* Inject HTML for this form into node. */
            $(nodeStr).html(_InputValueTemplate(node));
            $('#inputValue').focus();

            /* Display validation feedback as user types input. */
            $('#inputValue').keypress(function () {
                var value,
                    valid = false;

                value = parseInt($('#inputValue').val());

                if ((value < 0) || (value > 100)) {
                    $('#inputForm').attr('class',
                        'form-group has-error');
                } else if (value === 0) {
                    $('#inputForm').attr('class',
                        'form-group');
                } else {
                    valid = true;
                    $('#inputForm').attr('class',
                        'form-group has-success'
                    );
                }

            });

            /* Parse input and process if valid. */
            $('#inputValue').change(function () {
                var value;

                value = parseInt($('#inputValue').val());

                if (value > 0) {
                    model.playTurnNode(index, value);
                    view.render();
                    setListeners();
                }
            });

        });

        /* Set listener on operations. */
        $('.nodeBox .op').click(function (event) {
            /* Remove any existing forms. */
            $('#inputForm').remove();
        });

        $('.nodeBox .op').change(function (event) {
            var index = parseInt(event.target.id),
                allNodes = model.puzzle.nodes,
                opStr = '#' + index + 'op',
                op;

            switch ($(opStr).val()) {
                case Config.addSymbol:
                    op = Operation.ADD();
                    break;
                case Config.subSymbol:
                    op = Operation.SUB();
                    break;
                case Config.multSymbol:
                    op = Operation.MULT();
                    break;
                case Config.divSymbol:
                    op = Operation.DIV();
                    break;
                default:
                    op = Operation.NULL;
            }

            if (index >= 0 && index < allNodes.length) {
                model.playTurnOp(index, op);
                view.render();
                setListeners();
            }

        }); 

        setAppListeners();
    }

    /**
     * Constructor for the controller for the game MVC.
     * @param {{timer: boolean,
                    difficulty: string,
                    setAppListeners: function}} 
                settings - the user-selected settings for the game
     */
    return function GameController(settings) {

        this.settings = settings;

        setAppListeners = settings.setAppListeners;

        /**
         * Initialize the game controller with a new puzzle, model, and view.
         */
        this.init = function () {

            var puzzleSpecs;

            switch (this.settings.difficulty) {
                case 'Easy':
                    puzzleSpecs = PuzzleGenerator.Easy();
                    break;
                case 'Medium':
                    puzzleSpecs = PuzzleGenerator.Medium();
                    break;
                case 'Hard':
                    puzzleSpecs = PuzzleGenerator.Hard();
                    break;
            }

            model = new GameModel(puzzleSpecs);
            view = new GameView('#workspace', model);

            this.startGame();
        };

        /**
         * Reset the game board to its initial state.
         */
        this.reset = function () {
            this.cancel();
            model.reset();
            this.startGame();
        };

        /**
         * Cancel this game.
         */
        this.cancel = function () {
            clearInterval(this.pointsTimer);
        };

        /**
         * Start the game.
         */
        this.startGame = function () {
            var that = this,
                i;

            for (i = 0; i < model.puzzle.nodes.length; i++) {
                model.puzzle.nodes[i].verify();
            }

            view.render();
            setListeners();

            /* Start the game timer if applicable. */
            if (settings.timer) {

                this.pointsTimer = setInterval(function () {

                    model.points -= 5;

                    /* Game is over if points have run out. */
                    if (model.points <= 0) {
                        model.gameOver = true;
                    }

                    /* 
                     * If game is over (because points have run out or because
                     * game is in winning state), stop the timer.
                     */
                    if (model.gameOver) {
                        clearInterval(that.pointsTimer);
                    }

                    /* Update the points display. */
                    view.renderPoints();

                }, 400);

            }
        };

    };
});