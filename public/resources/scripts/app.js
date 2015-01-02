require.config({
    shim: {
        'boostrap': {
            deps: ['jquery']
        }
    },
    baseUrl: '/onetwotree/public/resources/scripts',
    paths: {
        'bootstrap': '/onetwotree/public/vendor/bootstrap.min',
        'jquery': '/onetwotree/public/vendor/jquery.min',
        'hbs': '/onetwotree/public/vendor/require-handlebars-plugin/hbs'
    }
});

/**
 * Initialize Bootstrap's js components
 */
require(['jquery'], function () {
    'use strict';

    require(['bootstrap']);
});

/**
 * Set up any global utility methods that will be used in the application.
 */
function setUpUtilities(Config) {
    'use strict';

    // String format, from http://stackoverflow.com/a/4673436
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, num) {
                return typeof args[num] !== 'undefined' ?
                    args[num] : match;
            });
        };
    }

    /**
     * Return the current Bootstrap device view.
     * From http://stackoverflow.com/a/15150381
     *
     * @return {string} current Bootstrap device view
     */
    var findBootstrapEnvironment = function findBootstrapEnvironment() {
        var envs = ['xs', 'sm', 'md', 'lg'];

        var $el = $('<div>');
        $el.appendTo($('body'));

        for (var i = envs.length - 1; i >= 0; i--) {
            var env = envs[i];

            $el.addClass('hidden-'+env);
            if ($el.is(':hidden')) {
                $el.remove();
                return env;
            }
        }
    };

    var adjustSizes = function () {
        var workspaceWidth = $('#workspace').width(),
            fontSize;

        Config.setNodeBoxSize();

        /* Adjust alert size as well. */
        $('#alert').css({'width': workspaceWidth});


        switch (findBootstrapEnvironment()) {
            case 'xs': {
                fontSize = '10px';
                break;
            }
            case 'sm': {
                fontSize = '12px';
                break;
            }
            case 'md': {
                fontSize = '14px';
                break;
            }
            case 'lg': {
                fontSize = '16px';
                break;
            }
            default:
                fontSize = '16px';
        }

        $('body').css({'font-size': fontSize});
        
    };

    adjustSizes();

    $(window).on('resize', adjustSizes);
}

/**
 * Inject modal HTML and set up animation.
 * @param {function} $ - JQuery
 * @param {function} _ModalTemplate - Compiled Handlebars template for the modal
 */
function setUpInstructionsModal($, _ModalTemplate, Config) {

    'use strict';

    /* Inject the modal HTML from Handlebars template into div. */
    $('#instructions').html(_ModalTemplate());

    /* Set operation character - displays incorrectly otherwise. */
    $('#sampleOp2').html(Config.divSymbol);

    /* Start the animation timer. */

    var count = 0;

    setInterval(function () {
        switch (count++) {
            case 0:
                {
                    /* Beat 1 */
                    $('#sampleOp1').html(Config.multSymbol);

                    $('#sampleNode3').html(9);
                    $('#sampleNode2').attr('class',
                        'btn btn-danger node');
                    break;
                }

            case 1:
                {
                    /* Beat 2 */
                    $('#sampleNode1').html(14);
                    $('#sampleNode1').attr('class', 'btn btn-success node');

                    $('#sampleNode3').html(8);
                    $('#sampleNode2').attr('class',
                        'btn btn-success node');
                    break;
                }

            case 2:
                {
                    /* Beat 3 (and reset) */
                    $('#sampleNode1').html('');

                    $('#sampleNode1').attr('class', 'btn btn-default node');
                    $('#sampleOp1').html('');
                    $('#sampleNode3').html('');
                    count = 0;
                    break;
                }
        }
    }, 1000);

}

/**
 * Attach listeners to buttons to start or reset game and open initial view.
 * @param {function} GameController - constructor for GameController
 */
function setUpGame(GameController) {

    'use strict';

    var game;

    /**
     * Display the play new game dialog.
     */
    var playNewGame = function () {

        if (game) {
            game.cancel();
        }

        $('#points').html('');
        $('#workspace').html('');
        $('#workspace').hide();

        $('#newGameForm').show();
    };

    /* Set up listener on game title. */
    $('#home').click(playNewGame);

    /**
     * Start a new game using the settings from the play new game dialog.
     */
    $('#start').click(function () {
        var isTimer, difficulty;

        $('#workspace').show();
        $('#newGameForm').hide();

        /* Get timer on/off setting. */
        if ($('#timerOn').hasClass('btn btn-warning active')) {
            isTimer = true;
        } else {
            isTimer = false;
        }

        /* Get difficulty setting. */
        if ($('#easy').hasClass('btn btn-warning active')) {
            difficulty = 'Easy';
        } else if ($('#medium').hasClass(
                'btn btn-warning active')) {
            difficulty = 'Medium';
        } else {
            difficulty = 'Hard';
        }

        /**
         * Attach appplication-wide listeners.
         */
        function setAppListeners() {
            $('#reset').click(function () {
                game.reset();
            });

            $('#playNew').click(playNewGame);
        }

        /* Initialize game controller and start game. */
        game = new GameController({
            timer: isTimer,
            difficulty: difficulty,
            setAppListeners: setAppListeners
        });

        game.init();

    });

    /* Display the play new game dialog when page first loads. */
    playNewGame();

}

/**
 * Initialize game environment and start the application.
 */
require([
    'jquery',
    'game/controller',
    'hbs!/onetwotree/public/resources/templates/modal',
    'app.config'
], function ($, GameController, _ModalTemplate, Config) {

    'use strict';

    setUpUtilities(Config);

    setUpInstructionsModal($, _ModalTemplate, Config);

    setUpGame(GameController);

});