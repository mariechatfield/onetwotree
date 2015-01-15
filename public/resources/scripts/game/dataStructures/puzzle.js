define([
    'jquery',
    'game/dataStructures/node',
    'game/dataStructures/operation'
], function ($, Node, Operation) {

    'use strict';

    /**
     * Constructor for a puzzle.
     * @param {{initValues: number[],
     *              initOps: AOperation[]}}
     *          specs - Specifications for the initial state
     */
    function Puzzle(specs) {

        /** @type {number[]} initValues - Initial values of nodes */
        this.initValues = specs.initValues;

        /** @type {AOperation[]} initOps - Initial operations of nodes */
        this.initOps = specs.initOps;

        /** @type {number} numNodes - The total number of nodes in the puzzle */
        this.numNodes = this.initValues.length;

        /** @type {ANode[]} nodes - The nodes which comprise this puzzle */
        this.nodes = [];

        this.init();

    }

    /**
     * Initialize the puzzle using the pre-defined specifications.
     */
    Puzzle.prototype.init = function () {
        var i;

        /* Initialize all nodes as null. */
        for (i = 0; i < this.numNodes; i++) {
            this.nodes.push(Node.NULL);
        }

        /* Set up empty nodes with correct edges. */
        if (this.numNodes === 21) {
            /* Row 6 of 6 */
            this.nodes[20] = Node.makeLeaf(0);
            this.nodes[19] = Node.makeLeaf(0);
            this.nodes[18] = Node.makeLeaf(0);
            this.nodes[17] = Node.makeLeaf(0);
            this.nodes[16] = Node.makeLeaf(0);
            this.nodes[15] = Node.makeLeaf(0);

            /* Row 5 of 6 */
            this.nodes[14] = Node.makeInternal(0, this.nodes[19],
                this.nodes[20]);
            this.nodes[13] = Node.makeInternal(0, this.nodes[18],
                this.nodes[19]);
            this.nodes[12] = Node.makeInternal(0, this.nodes[17],
                this.nodes[18]);
            this.nodes[11] = Node.makeInternal(0, this.nodes[16],
                this.nodes[17]);
            this.nodes[10] = Node.makeInternal(0, this.nodes[15],
                this.nodes[16]);

        } else if (this.numNodes === 15) {
            /* Row 5 of 5 */
            this.nodes[14] = Node.makeLeaf(0);
            this.nodes[13] = Node.makeLeaf(0);
            this.nodes[12] = Node.makeLeaf(0);
            this.nodes[11] = Node.makeLeaf(0);
            this.nodes[10] = Node.makeLeaf(0);
        }

        if (this.numNodes > 10) {
            /* Row 4 of [5, 6] */
            this.nodes[9] = Node.makeInternal(0, this.nodes[13],
                this.nodes[14]);
            this.nodes[8] = Node.makeInternal(0, this.nodes[12],
                this.nodes[13]);
            this.nodes[7] = Node.makeInternal(0, this.nodes[11],
                this.nodes[12]);
            this.nodes[6] = Node.makeInternal(0, this.nodes[10],
                this.nodes[11]);
        } else {
            /* Row 4 of 4 */
            this.nodes[9] = Node.makeLeaf(0);
            this.nodes[8] = Node.makeLeaf(0);
            this.nodes[7] = Node.makeLeaf(0);
            this.nodes[6] = Node.makeLeaf(0);
        }

        /* Row 3 */
        this.nodes[5] = Node.makeInternal(0, this.nodes[8], this.nodes[
            9]);
        this.nodes[4] = Node.makeInternal(0, this.nodes[7], this.nodes[
            8]);
        this.nodes[3] = Node.makeInternal(0, this.nodes[6], this.nodes[
            7]);

        /* Row 2 */
        this.nodes[2] = Node.makeInternal(0, this.nodes[4], this.nodes[
            5]);
        this.nodes[1] = Node.makeInternal(0, this.nodes[3], this.nodes[
            4]);

        /* Row 1 */
        this.nodes[0] = Node.makeInternal(0, this.nodes[1], this.nodes[
            2]);

        /* Initialize nodes with initial values. */
        for (i = 0; i < this.initValues.length; i++) {
            if (this.initValues[i] !== 0) {
                this.nodes[i].value = this.initValues[i];
                this.nodes[i].mutable = false;
            }
        }

        /* Initialize operations with initial values. */
        for (i = 0; i < this.initOps.length; i++) {
            if (this.initOps[i] !== Operation.NULL) {
                this.nodes[i].op = this.initOps[i];
            }
        }
    };

    /**
     * Determine if the puzzle is in a winning state.
     * @return {Boolean} true if winning state, false otherwise
     */
    Puzzle.prototype.isWin = function () {

        var i;

        /* Check each node in the puzzle. */
        for (i = 0; i < this.numNodes; i++) {
            var node = this.nodes[i];

            /* If node's value has not been set, puzzle is incomplete. */
            if (node.value === 0) {
                return false;
            }

            /* If node's operation has not been set, puzzle is incomplete. */
            if (node.op !== undefined && node.op === Operation.NULL) {
                return false;
            }

            /* If node has an invalid value, the puzzle is incorrect. */
            if (!node.verify()) {
                return false;
            }

        }

        /* Puzzle is completely and correctly filled. */
        return true;
    };

    return Puzzle;

});