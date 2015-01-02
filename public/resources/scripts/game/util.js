define([
    'game/dataStructures/operation',
    'app.config'
], function (Operation, Config) {

    'use strict';

    /* Calculate factors and multiples of all integers ∈ [2, 100]. */
    var i, j,
        factors = new Array(101),
        multiples = new Array(101);

    for (i = 0; i < 101; i++) {
        factors[i] = [];
        multiples[i] = [];
    }

    for (i = 2; i < 101; i++) {

        /* Calculate multiples under 100 for i. */
        for (j = 2; j < 101; j++) {
            if (i * j <= 100) {
                multiples[i].push(i * j);
            } else {
                break;
            }
        }

        /* Calculate factors of i. */
        for (j = 2; j < i; j++) {
            if (i % j === 0) {
                factors[i].push(i / j);
            }
        }
    }

    /**
     * Assign left child, right child, and operation given the parent value.
     * @param  {number[]} nodes - the values of all nodes
     * @param  {AOperation[]} ops - the operations of all nodes
     * @param  {number} parentIndex - the index of the parent node in nodes
     * @param  {number} leftIndex - the index of the left child node in nodes
     * @param  {number} rightIndex - the index of the right child node in nodes
     * @return {Boolean} true if valid assignment found, false otherwise
     */
    function assign(nodes, ops, parentIndex, leftIndex, rightIndex) {
        var possible = [],
            parent = nodes[parentIndex],
            left, right, op,
            randIndex;

        /* Fill possible array with valid operations given parent value. */

        if (factors[parent].length > 0) {
            possible.push(Operation.MULT());
        }

        if (multiples[parent].length > 0) {
            possible.push(Operation.DIV());
        }

        /* 
         * Only add ADD or SUBTRACT if no valid MULT or DIV for this value.
         * This helps add some complexity to the final puzzle. Otherwise, the
         * majority of operations are addition or subtraction.
         */
        if (possible.length === 0) {
            if (parent < 100 && parent > 2) {
                possible.push(Operation.ADD());
            }

            if (parent > 2) {
                possible.push(Operation.SUB());
            }
        }

        /* Randomly select an operation from the array of possible ops. */
        randIndex = Math.floor(Math.random() * (possible.length - 1));

        /* If no valid operation possible, return false to indicate failure. */
        if (randIndex < 0) {
            return false;
        }

        /* Calculate left and right child values for the chosen operation. */
        op = possible[randIndex];

        switch (op.symbol) {
            case Config.addSymbol:
                {
                    /* 
                     * Chose a factor of parent if possible. This allows
                     * greater possibility for later nodes to use MULT or DIV.
                     */
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
            case Config.subSymbol:
                {
                    left = Math.floor(Math.random() * (100 - parent +
                        1)) + parent;
                    right = left - parent;
                    break;
                }
            case Config.multSymbol:
                {
                    randIndex = Math.floor(Math.random() *
                        (factors[parent].length - 1));
                    left = factors[parent][randIndex];
                    right = parent / left;
                    break;
                }
            case Config.divSymbol:
                {
                    randIndex = Math.floor(Math.random() *
                        (multiples[parent].length - 1));
                    left = multiples[parent][randIndex];
                    right = left / parent;
                    break;
                }
        }

        /* Set values and operations and return true to indicate success. */
        nodes[leftIndex] = left;
        nodes[rightIndex] = right;
        ops[parentIndex] = op;

        return true;

    }

    /**
     * Assign left child and operation given the parent and right child values.
     * @param  {number[]} nodes - the values of all nodes
     * @param  {AOperation[]} ops - the operations of all nodes
     * @param  {number} parentIndex - the index of the parent node in nodes
     * @param  {number} leftIndex - the index of the left child node in nodes
     * @param  {number} rightIndex - the index of the right child node in nodes
     * @return {Boolean} true if valid assignment found, false otherwise
     */
    function assignLeft(nodes, ops, parentIndex, leftIndex,
        rightIndex) {
        var possible = [],
            parent = nodes[parentIndex],
            right = nodes[rightIndex],
            randIndex;

        /* 
         * Fill possible array with valid operations and the corresponding
         * left child value given the parent and right child value.
         */

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

        /* Randomly select an operation from the array of possible ones. */
        randIndex = Math.floor(Math.random() * (possible.length -
            1));

        /* If no valid operation possible, return false. */
        if (randIndex < 0) {
            return false;
        }

        /* Set value and operations and return true to indicate success. */
        nodes[leftIndex] = possible[randIndex].left;
        ops[parentIndex] = possible[randIndex].op;

        return true;
    }

    /**
     * Assign right child and operation given the parent and left child values.
     * @param  {number[]} nodes - the values of all nodes
     * @param  {AOperation[]} ops - the operations of all nodes
     * @param  {number} parentIndex - the index of the parent node in nodes
     * @param  {number} leftIndex - the index of the left child node in nodes
     * @param  {number} rightIndex - the index of the right child node in nodes
     * @return {Boolean} true if valid assignment found, false otherwise
     */
    function assignRight(nodes, ops, parentIndex, leftIndex,
        rightIndex) {

        var possible = [],
            parent = nodes[parentIndex],
            left = nodes[leftIndex],
            randIndex;

        /* 
         * Fill possible array with valid operations and the corresponding
         * right child value given the parent and left child value.
         */

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

        /* Randomly select an operation from the array of possible ones. */
        randIndex = Math.floor(Math.random() * (possible.length -
            1));

        /* If no valid operation possible, return false. */
        if (randIndex < 0) {
            return false;
        }

        /* Set value and operations and return true to indicate success. */
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