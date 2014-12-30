define([
    'game/dataStructures/operation'
], function (Operation) {

    'use strict';

    var i, j,
        factors = new Array(101),
        multiples = new Array(101);

    for (i = 0; i < 101; i++) {
        factors[i] = [];
        multiples[i] = [];
    }

    for (i = 2; i < 101; i++) {
        for (j = 2; j < 101; j++) {
            if (i * j <= 100) {
                multiples[i].push(i * j);
            } else {
                break;
            }
        }

        for (j = 2; j < i; j++) {
            if (i % j === 0) {
                factors[i].push(i / j);
            }
        }
    }

    function assign(nodes, ops, parentIndex, leftIndex, rightIndex) {
        var possible = [],
            parent = nodes[parentIndex],
            left, right, op,
            randIndex;

        if (factors[parent].length > 0) {
            possible.push(Operation.MULT());
        }

        if (multiples[parent].length > 0) {
            possible.push(Operation.DIV());
        }

        if (possible.length === 0) {
            if (parent < 100 && parent > 2) {
                possible.push(Operation.ADD());
            }

            if (parent > 2) {
                possible.push(Operation.SUB());
            }
        }

        randIndex = Math.floor(Math.random() * (possible.length - 1));

        if (randIndex < 0) {
            return false;
        }

        op = possible[randIndex];

        switch (op.symbol) {
            case '+':
                {
                    if (factors[parent].length > 0) {
                        left = factors[parent][Math.floor(Math.random() *
                            factors[parent].length)];
                    } else {
                        left = Math.floor(Math.random() * (parent -
                            1)) + 1;
                    }
                    right = parent - left;
                    break;
                }
            case '-':
                {
                    left = Math.floor(Math.random() * (100 - parent +
                        1)) + parent;
                    right = left - parent;
                    break;
                }
            case '×':
                {
                    randIndex = Math.floor(Math.random() *
                        (factors[parent].length - 1));
                    left = factors[parent][randIndex];
                    right = parent / left;
                    break;
                }
            case '÷':
                {
                    randIndex = Math.floor(Math.random() *
                        (multiples[parent].length - 1));
                    left = multiples[parent][randIndex];
                    right = left / parent;
                    break;
                }
        }

        nodes[leftIndex] = left;
        nodes[rightIndex] = right;
        ops[parentIndex] = op;

        return true;

    }

    function assignLeft(nodes, ops, parentIndex, leftIndex, rightIndex) {
        var possible = [],
            parent = nodes[parentIndex],
            right = nodes[rightIndex],
            randIndex;

        if (parent - right > 2) {
            possible.push({
                op: Operation.ADD(),
                left: parent - right
            });
        }

        if (parent + right < 100) {
            possible.push({
                op: Operation.SUB(),
                left: parent + right
            });
        }

        if (parent % right === 0) {
            possible.push({
                op: Operation.MULT(),
                left: parent / right
            });
        }

        if (parent * right < 100) {
            possible.push({
                op: Operation.DIV(),
                left: parent * right
            });
        }

        randIndex = Math.floor(Math.random() * (possible.length - 1));

        if (randIndex < 0) {
            return false;
        }

        nodes[leftIndex] = possible[randIndex].left;
        ops[parentIndex] = possible[randIndex].op;

        return true;
    }

    function assignRight(nodes, ops, parentIndex, leftIndex, rightIndex) {
        var possible = [],
            parent = nodes[parentIndex],
            left = nodes[leftIndex],
            randIndex;

        if (parent - left > 2) {
            possible.push({
                op: Operation.ADD(),
                right: parent - left
            });
        }

        if (left - parent > 2) {
            possible.push({
                op: Operation.SUB(),
                right: left - parent
            });
        }

        if (parent % left === 0) {
            possible.push({
                op: Operation.MULT(),
                right: parent / left
            });
        }

        if (left % parent === 0) {
            possible.push({
                op: Operation.DIV(),
                right: left / parent
            });
        }

        randIndex = Math.floor(Math.random() * (possible.length - 1));

        if (randIndex < 0) {
            return false;
        }

        nodes[rightIndex] = possible[randIndex].right;
        ops[parentIndex] = possible[randIndex].op;

        return true;
    }

    return {
        assign: assign,
        assignLeft: assignLeft,
        assignRight: assignRight
    };
});