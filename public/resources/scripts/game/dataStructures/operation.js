define([
    'jquery'
],
function($) {

    'use strict';

    function AOperation (symbolIn) {
    	this.symbol = symbolIn;
    	this.mutable = true;
	};

	AOperation.prototype.toString = function () {
		return this.symbol;
	}

	AOperation.prototype.evaluate = function (x, y) {
		return 0;
	}

	var ADD = new AOperation("+");
	ADD.evaluate = function (x, y) {
		if (x == 0 || y == 0)
			return 0;

		return x + y;
	}

	var SUB = new AOperation("-");
	SUB.evaluate = function (x, y) {
		if (x == 0 || y == 0)
			return 0;

		if (x <= y)
			return -1;

		return x - y;
	}

	var MULT = new AOperation("*");
	MULT.evaluate = function (x, y) {
		if (x == 0 || y == 0)
			return 0;

		return x * y;
	}

	var DIV = new AOperation("/");
	DIV.evaluate = function (x, y) {
		if (x == 0 || y == 0)
			return 0;

		if (x % y != 0)
			return -1;

		return x / y;
	}

	/* Finish initializing ANode with nullNode defaults */

	var NULL = new AOperation("");

	/* Return object with helper functions */

	return {
		ADD: ADD,
		SUB: SUB,
		MULT: MULT,
		DIV: DIV,
		NULL: NULL
	}

});


