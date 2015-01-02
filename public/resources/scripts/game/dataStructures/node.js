define([
    'jquery',
    'game/dataStructures/operation',
], function ($, Operation) {

    'use strict';

    /**
     * Constructor for a generic node with a value.
     * @param {number} valueIn - Initial value of the node
     */
    function ANode(valueIn) {

        /** @type {number} value - The number value of the node */
        this.value = valueIn || 0;

        /** @type {Boolean} mutable - true if user can edit, false otherwise */
        this.mutable = true;

        /** @type {Boolean} completed - true if calculation is complete, false otherwise */
        this.completed = true;

        /** @type {Boolean} valid - true if node is valid, false otherwise */
        this.valid = true;

        /** 
         * Verifies that the given node is valid.
         * @return {Boolean} true if valid, false otherwise
         */
        this.verify = function () {
            return true;
        };

    }

    /**
     * Verifies that a given internal node is valid.
     * @param  {ANode} node - The node to verify
     * @return {Boolean} true if node is valid, false otherwise
     */
    function verifyInternalNode(node) {

        node.completed = false;
        node.valid = true;

        /* If this node's value is not set, assume true. */
        if (node.value === 0) {
            return true;
        }

        /* If this node's operation is not set, assume true. */
        if (node.op === undefined || node.op === Operation.NULL) {
            return true;
        }

        /* If either of this node's children are undefined, assume true. */
        if (node.leftChild.value === 0 || node.rightChild.value ===
            0) {
            return true;
        }

        node.completed = true;

        /* 
         * This node has defined value, operation, and children.
         * It can now be verified.
         */

        var result = node.op.evaluate(node.leftChild.value,
            node.rightChild.value);

        /* 
         * The node is valid if its defined value matches the result of its
         * operation over its children.
         */
        node.valid = result === node.value;

        return node.valid;

    }

    /**
     * Mock constructor for an internal ANode with two children.
     * @param {number} valueIn - Initial value of the node
     * @param {ANode} leftChildIn - Left child of the node
     * @param {ANode} rightChildIn - Right child of the node
     * @return {ANode} the internal node
     */
    function InternalNode(valueIn, leftChildIn, rightChildIn) {

        /* Initialize the internal node. */
        var node = new ANode(valueIn);

        node.op = Operation.NULL;
        node.leftChild = leftChildIn;
        node.rightChild = rightChildIn;

        node.completed = false;

        /* Establish this node as the parent of its children. */
        leftChildIn.rightParent = node;
        rightChildIn.leftParent = node;

        /* Override the default verify function. */
        node.verify = function () {
            var valid = verifyInternalNode(this);

            if (this.leftParent !== NULL) {
                valid = valid && verifyInternalNode(this.leftParent);
            }

            if (this.rightParent !== NULL) {
                valid = valid && verifyInternalNode(this.rightParent);
            }


            return valid;
        };

        return node;

    }

    /**
     * Mock constructor for an leaf ANode.
     * @param {number} valueIn - Initial value of the node
     * @return {ANode} the leaf node
     */
    function LeafNode(valueIn) {

        var node = new ANode(valueIn);

        node.value = valueIn;
        node.mutable = false;

        return node;

    }

    /* Well defined null ANode. */
    var NULL = new ANode(0);

    /* Finish initializing ANode with null node defaults */
    ANode.prototype.leftParent = NULL;
    ANode.prototype.rightParent = NULL;

    return {
        makeInternal: InternalNode,
        makeLeaf: LeafNode,
        NULL: NULL
    };

});