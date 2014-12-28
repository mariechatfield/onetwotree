require.config({
    shim: {
        'boostrap': {
            deps: ['jquery']
        }
    },
    baseUrl: '/centarithmetic/public/resources/scripts',
    paths: {
        'bootstrap': '/centarithmetic/public/vendor/bootstrap.min',
        'jquery': '/centarithmetic/public/vendor/jquery.min',
        'hbs': '/centarithmetic/public/vendor/require-handlebars-plugin/hbs',
        'config': 'app.config'
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
    'config', 
    'game/controller', 
    'game/dataStructures/operation'
], function (config, GameController, Operation) {

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

    $('#timerOn').click(function () {
        $('#timerOn').attr('class', 'btn btn-warning active');
        $('#timerOff').attr('class', 'btn btn-warning');
    });

    $('#timerOff').click(function () {
        $('#timerOn').attr('class', 'btn btn-warning');
        $('#timerOff').attr('class', 'btn btn-warning active');
    });

    $('#easy').click(function () {
        $('#easy').attr('class', 'btn btn-warning active');
        $('#medium').attr('class', 'btn btn-warning');
        $('#hard').attr('class', 'btn btn-warning');
    });

    $('#medium').click(function () {
        $('#easy').attr('class', 'btn btn-warning');
        $('#medium').attr('class', 'btn btn-warning active');
        $('#hard').attr('class', 'btn btn-warning');
    });

    $('#hard').click(function () {
        $('#easy').attr('class', 'btn btn-warning');
        $('#medium').attr('class', 'btn btn-warning');
        $('#hard').attr('class', 'btn btn-warning active');
    });

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

    playNewGame();

});

