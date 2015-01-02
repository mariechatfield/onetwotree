define([
    'app.config'
], function (Config) {

    'use strict';

    /**
     * Constructor for a generic operation.
     * @param {string} symbolIn - String representation of the operation
     */
    function AOperation(symbolIn) {

        /** @type {string} symbol - String representation of the operation */
        this.symbol = symbolIn;

        /** @type {Boolean} mutable - true if user can edit, false otherwise */
        this.mutable = true;

        /**
         * Evaluate this operation with left- and right-hand values.
         * @return {number} result of the operation
         */
        this.evaluate = function () {
            return 0;
        };
    }

    /**
     * Initialize a new AOperation for addition.
     * @return {AOperation} the addition operation
     */
    function ADD() {

        var op = new AOperation(Config.addSymbol);
        op.evaluate = function (x, y) {
            if (x === 0 || y === 0) {
                return 0;
            }

            return x + y;
        };

        return op;
    }

    /**
     * Initialize a new AOperation for subtraction.
     * @return {AOperation} the subtraction operation
     */
    function SUB() {

        var op = new AOperation(Config.subSymbol);
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

    /**
     * Initialize a new AOperation for multiplication.
     * @return {AOperation} the multiplication operation
     */
    function MULT() {

        var op = new AOperation(Config.multSymbol);
        op.evaluate = function (x, y) {
            if (x === 0 || y === 0) {
                return 0;
            }

            return x * y;
        };

        return op;
    }

    /**
     * Initialize a new AOperation for division.
     * @return {AOperation} the division operation
     */
    function DIV() {

        var op = new AOperation(Config.divSymbol);
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

    /* Well defined null AOperation. */
    var NULL = new AOperation('');

    return {
        ADD: ADD,
        SUB: SUB,
        MULT: MULT,
        DIV: DIV,
        NULL: NULL
    };

});