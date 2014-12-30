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
 * TODO; determine why shim deps doesn't always resolve jquery first
 */
require(['jquery'], function () {
    require(['bootstrap']);
});

/**
 * Return the current Bootstrap device view.
 * From http://stackoverflow.com/a/15150381
 *
 * @return {string} current Bootstrap device view
 */
var findBootstrapEnvironment = function findBootstrapEnvironment() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    $el = $('<div>');
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


// Initialize Backbone Router
require([
    'game/controller', 
    'game/dataStructures/operation',
    'hbs!/onetwotree/public/resources/templates/inputValue',
    'hbs!/onetwotree/public/resources/templates/inputOp'
], function (GameController, Operation, InputValueTemplate, InputOpTemplate) {

    // First, checks if it isn't implemented yet.
    if (!String.prototype.format) {
      String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
          ;
        });
      };
    }

    var game;

    var playNewGame = function () {

        if (game)
            game.cancel();

        $('#points').html('');
        $('#workspace').html('');
        $('#workspace').hide();

        $('#newGameForm').show();
    };

    var reset = function () {
        game.reset();
    }

    $('#start').click(function () {
        $('#workspace').show();
        $('#newGameForm').hide();

        var isTimer, difficulty;

        if ($('#timerOn').hasClass('btn btn-warning active'))
            isTimer = true;
        else
            isTimer = false;

        if ($('#easy').hasClass('btn btn-warning active'))
            difficulty = "Easy";
        else if ($('#medium').hasClass('btn btn-warning active'))
            difficulty = "Medium";
        else
            difficulty = "Hard";


        function setAppListeners() {
            $('#reset').click(reset);
            $('#playNew').click(playNewGame);
        };

        game = new GameController({
            timer: isTimer,
            difficulty: difficulty,
            setAppListeners: setAppListeners
        });
        game.init();

    });

    $('#home').click(playNewGame);

    playNewGame();

    var count = 0;

    $('#sampleOp2').html('÷');

    setInterval(function () {
        switch (count++) {
            case 0: {
                $('#sampleOp1').html('×');
               
                $('#sampleNode3').html(9);
                $('#sampleNode2').attr('class', 'btn btn-danger node');
               break;
            }

            case 1: {
                $('#sampleNode1').html(14);

                $('#sampleNode3').html(8);
                $('#sampleNode2').attr('class', 'btn btn-default node');
                break;
            }

            case 2: {
                $('#sampleNode1').html('');
                $('#sampleOp1').html('');
                $('#sampleNode3').html('');
                count = 0;
                break;
            }
        }
    }, 1000);

});

