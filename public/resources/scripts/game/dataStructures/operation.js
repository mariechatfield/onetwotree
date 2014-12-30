define([

], function () {

    'use strict';

    function AOperation(symbolIn) {
        this.symbol = symbolIn;
        this.mutable = true;
    }

    AOperation.prototype.toString = function () {
        return this.symbol;
    };

    AOperation.prototype.evaluate = function () {
        return 0;
    };

    function ADD() {
        var op = new AOperation('+');
        op.evaluate = function (x, y) {
            if (x === 0 || y === 0) {
                return 0;
            }

            return x + y;
        };

        return op;
    }

    function SUB() {
        var op = new AOperation('-');
        op.evaluate = function (x, y) {
            if (x === 0 || y === 0) {
                return 0;
            }

            if (x <= y) {
                return -1;
            }

            return x - y;
        };

        return op;
    }

    function MULT() {
        var op = new AOperation('×');
        op.evaluate = function (x, y) {
            if (x === 0 || y === 0) {
                return 0;
            }

            return x * y;
        };

        return op;
    }

    function DIV() {
        var op = new AOperation('÷');
        op.evaluate = function (x, y) {
            if (x === 0 || y === 0) {
                return 0;
            }

            if (x % y !== 0) {
                return -1;
            }

            return x / y;
        };

        return op;
    }

    /* Finish initializing ANode with nullNode defaults */

    var NULL = new AOperation('');

    /* Return object with helper functions */

    return {
        ADD: ADD,
        SUB: SUB,
        MULT: MULT,
        DIV: DIV,
        NULL: NULL
    };

});