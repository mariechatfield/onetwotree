define([
    'jquery',
    'game/dataStructures/operation',
    'game/util'
], function ($, Operation, Util) {

    'use strict';

    /**
     * Generate a random puzzle with a given number of nodes and operations.
     * @param  {number} numNodes - the number of nodes in the puzzle
     * @param  {number} numOps - the number of operations in the puzzle
     * @return {{initValues: number[],
     *              initOps: AOperation[]}}
     *         the specifications for the puzzle's initial state
     */
    function generateRandomPuzzle(numNodes, numOps) {
        var i, nodes, ops;

        /* Attempt to generate puzzle until successful.  */
        while (true) {

            /* Initialize nodes and operations. */
            nodes = new Array(numNodes);
            ops = new Array(numOps);

            for (i = 0; i < numNodes; i++) {
                nodes[i] = 0;
            }

            for (i = 0; i < numOps; i++) {
                ops[i] = Operation.NULL;
            }

            /* 
             * Assign values and operations to each node to ensure puzzle
             * has at least one feasible solution.
             */

            /* Row 1 */
            nodes[0] = Math.floor(Math.random() * 100);

            /* Row 2 */
            if (!Util.assign(nodes, ops, 0, 1, 2)) {
                continue; /* If no valid assignment, start over. */
            }

            /* Row 3 */
            if (!Util.assign(nodes, ops, 1, 3, 4) ||
                !Util.assignRight(nodes, ops, 2, 4, 5)) {
                continue; /* If no valid assignment, start over. */
            }

            /* Row 4 */
            if (!Util.assign(nodes, ops, 4, 7, 8) ||
                !Util.assignLeft(nodes, ops, 3, 6, 7) ||
                !Util.assignRight(nodes, ops, 5, 8, 9)) {
                continue; /* If no valid assignment, start over. */
            }

            /* If total nodes is 10, puzzle is now complete. */
            if (numNodes <= 10) {
                break;
            }

            /* Row 5 */
            if (!Util.assign(nodes, ops, 7, 11, 12) ||
                !Util.assignRight(nodes, ops, 8, 12, 13) ||
                !Util.assignLeft(nodes, ops, 6, 10, 11) ||
                !Util.assignRight(nodes, ops, 9, 13, 14)) {
                continue; /* If no valid assignment, start over. */
            }

            /* If total nodes is 15, puzzle is now complete. */
            if (numNodes <= 15) {
                break;
            }

            /* Row 6 */
            if (!Util.assign(nodes, ops, 12, 17, 18) ||
                !Util.assignLeft(nodes, ops, 11, 16, 17) ||
                !Util.assignRight(nodes, ops, 13, 18, 19) ||
                !Util.assignLeft(nodes, ops, 10, 15, 16) ||
                !Util.assignRight(nodes, ops, 14, 19, 20)) {
                continue; /* If no valid assignment, start over. */
            }

            /* Puzzle is now complete with 21 total nodes. */
            break;
        }

        /* Mask all nodes except root, leaves, and one internal node per row. */
        mask(nodes, ops);

        return {
            initValues: nodes,
            initOps: ops
        };
    }

    /**
     * Clear out all nodes except root, leaves, and one internal node per row.
     * @param  {number[]} nodes - the values of the nodes
     * @param  {AOperation[]} ops - the operations of the nodes
     */
    function mask(nodes, ops) {
        var i, temp;

        /* Randomly select one internal node in each row to remain. */
        var row2 = Math.floor(Math.random() * 1) + 1, // random ∈ [1, 2]
            row3 = Math.floor(Math.random() * 2) + 3, // random ∈ [3, 5]
            row4 = Math.floor(Math.random() * 3) + 6, // random ∈ [6, 9]
            row5 = Math.floor(Math.random() * 4) + 10; // random ∈ [10, 14]

        /* Clear the operation on the root node. */
        ops[0] = 0;

        /* Clear values of nodes which were not randomly selected to remain. */
        for (i = 1; i < ops.length; i++) {
            if (i !== row2 && i !== row3 && i !== row4 &&
                i !== row5) {
                nodes[i] = 0;
            }
        }

        /* 
         * Clear operations of all internal nodes except the randomly selected
         * node in the final row of the puzzle.
         */
        if (nodes.length === 10) {
            temp = ops[row3];
            for (i = 0; i < ops.length; i++) {
                ops[i] = Operation.NULL;
            }
            ops[row3] = temp;
        } else if (nodes.length === 15) {
            temp = ops[row4];
            for (i = 0; i < ops.length; i++) {
                ops[i] = Operation.NULL;
            }
            ops[row4] = temp;
        } else if (nodes.length === 21) {
            temp = ops[row5];
            for (i = 0; i < ops.length; i++) {
                ops[i] = Operation.NULL;
            }
            ops[row5] = temp;
        }

    }

    /**
     * Generate a random puzzle at the easy level.
     */
    function Easy() {
        return generateRandomPuzzle(10, 6);
    }

    /** 
     * Generate a random puzzle at the medium level.
     */
    function Medium() {
        return generateRandomPuzzle(15, 10);
    }

    /**
     * Generate a random puzzle at the hard level.
     */
    function Hard() {
        return generateRandomPuzzle(21, 15);
    }

    return {
        Easy: Easy,
        Medium: Medium,
        Hard: Hard
    };

});