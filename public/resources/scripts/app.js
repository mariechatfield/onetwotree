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
require(['config', 'game/controller', 'game/dataStructures/operation'], function (config, GameController, Operation) {

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

    var game = new GameController();
    game.init();

    // var count = 0;
    // var autoTurn = setInterval(function () { 

    //     switch (count) {
    //         case 0: game.playTurn(1, 75, true); break;
    //         case 1: game.playTurn(0, Operation.SUB, false); break;
    //         case 2: game.playTurn(0, Operation.ADD, false); break;
    //         case 3: game.playTurn(4, 5, true); break;
    //         case 4: game.playTurn(5, 20, true); break;
    //         case 5: game.playTurn(6, 8, true); break;
    //         case 6: game.playTurn(8, 2, true); break;
    //         case 7: game.playTurn(9, 10, true); break;
    //         case 8: game.playTurn(1, Operation.MULT, false); break;
    //         case 9: game.playTurn(2, Operation.ADD, false); break;
    //         case 10: game.playTurn(3, Operation.ADD, false); break;
    //         case 11: game.playTurn(4, Operation.SUB, false); break;
    //         case 12: game.playTurn(5, Operation.MULT, false); break;
    //         case 13: game.playTurn(6, Operation.DIV, false); break;
    //         case 14: game.playTurn(8, Operation.DIV, false); break;
    //         case 15: game.playTurn(9, Operation.MULT, false); break;
    //         default: clearInterval(autoTurn);
    //     }

    //     count++;
        
    // }, 100);

});

