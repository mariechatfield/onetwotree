define([
    'jquery',
    'game/dataStructures/operation',
], function ($, Operation) {

    'use strict';

    function ANode(valueIn) {

        this.value = valueIn || 0;

        this.mutable = true;

        this.verify = function () {
            return true;
        };

        this.valid = true;

    }

    function verifyBinaryNode(node) {

        if (node.value === 0) {
            return true;
        }

        if (node.op === undefined || node.op === Operation.NULL) {
            return true;
        }

        if (node.leftChild.value === 0 || node.rightChild.value ===
            0) {
            return true;
        }

        var result = node.op.evaluate(node.leftChild.value,
            node.rightChild.value);

        node.valid = result === node.value;

        return node.valid;
    }

    function BinaryNode(valueIn, leftChildIn, rightChildIn) {
        var node = new ANode(valueIn);

        node.op = Operation.NULL;
        node.leftChild = leftChildIn;
        node.rightChild = rightChildIn;

        leftChildIn.rightParent = node;
        rightChildIn.leftParent = node;

        node.verify = function () {
            var valid = verifyBinaryNode(this);

            if (this.leftParent !== NULL) {
                valid = valid && verifyBinaryNode(this.leftParent);
            }

            if (this.rightParent !== NULL) {
                valid = valid && verifyBinaryNode(this.rightParent);
            }


            return valid;
        };

        node.toString = function () {
            return '[{0}]{1} {2} {3})'.format(this.value, this.leftChild,
                this.op, this.rightChild);
        };

        return node;
    }

    function UnaryNode(valueIn) {

        var node = new ANode(valueIn);

        node.value = valueIn;
        node.mutable = false;

        node.toString = function () {
            return this.value;
        };

        return node;

    }

    /* Finish initializing ANode with nullNode defaults */

    var NULL = new ANode(0);
    NULL.toString = function () {
        return '--';
    };

    ANode.prototype.leftParent = NULL;
    ANode.prototype.rightParent = NULL;


    /* Return object with helper functions */

    return {
        makeBinary: BinaryNode,
        makeUnary: UnaryNode,
        NULL: NULL
    };

});