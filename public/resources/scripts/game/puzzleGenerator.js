define([
    'jquery',
    'game/dataStructures/operation',
    'game/util'
],
function($, Operation, Util) {

    'use strict';

    function generateRandomPuzzle(numNodes, numOps) {
        var i, nodes, ops;

        while (true) {

            nodes = new Array(numNodes);
            ops = new Array(numOps);

            for (i = 0; i < numNodes; i++)
                nodes[i] = 0;

            for (i = 0; i < numOps; i++)
                ops[i] = 0;

            /* Row 1 */
            nodes[0] = Math.floor(Math.random() * 100);

            /* Row 2 */
            if (!Util.assign(nodes, ops, 0, 1, 2))
                continue;

            /* Row 3 */
            if (!Util.assign(nodes, ops, 1, 3, 4) || !Util.assignRight(nodes, ops, 2, 4, 5))
                continue;

            /* Row 4 */
            if (!Util.assign(nodes, ops, 4, 7, 8) || !Util.assignLeft(nodes, ops, 3, 6, 7) 
                || !Util.assignRight(nodes, ops, 5, 8, 9))
                continue;

            if (numNodes <= 10)
                break;

            /* Row 5 */
            if (!Util.assign(nodes, ops, 7, 11, 12) || !Util.assignRight(nodes, ops, 8, 12, 13)
                || !Util.assignLeft(nodes, ops, 6, 10, 11) || !Util.assignRight(nodes, ops, 9, 13, 14))
                continue;

            if (numNodes <= 15)
                break;
            
            /* Row 6 */
            if (!Util.assign(nodes, ops, 12, 17, 18) || !Util.assignLeft(nodes, ops, 11, 16, 17)
                || !Util.assignRight(nodes, ops, 13, 18, 19) || !Util.assignLeft(nodes, ops, 10, 15, 16)
                || !Util.assignRight(nodes, ops, 14, 19, 20))
                continue;

            break;
        }

        mask(nodes, ops);

        return {
            initValues: nodes, 
            initOps: ops,
            numNodes: numNodes
        };
    }

    function mask(nodes, ops) {
        var i, temp,
            row2 = Math.floor(Math.random() * 1) + 1,   // 1..2
            row3 = Math.floor(Math.random() * 2) + 3,   // 3..5
            row4 = Math.floor(Math.random() * 3) + 6,   // 6..9
            row5 = Math.floor(Math.random() * 4) + 10;  // 10..14

        ops[0] = 0;

        for (i = 1; i < ops.length; i++) {
            if (i != row2 && i != row3 && i != row4 && i != row5)
                nodes[i] = 0;
        }

        if (nodes.length == 10) {
            temp = ops[row3];
            for (i = 0; i < ops.length; i++)
                ops[i] = 0;
            ops[row3] = temp;
        } else if (nodes.length == 15) {
            temp = ops[row4];
            for (i = 0; i < ops.length; i++)
                ops[i] = 0;
            ops[row4] = temp;
        } else if (nodes.length == 21) {
            temp = ops[row5];
            for (i = 0; i < ops.length; i++)
                ops[i] = 0;
            ops[row5] = temp;
        }       

    }

    function Easy() {
        return generateRandomPuzzle(10, 6);
    }

    function Medium() {
    	return generateRandomPuzzle(15, 10);
    }

    function Hard() {
        return generateRandomPuzzle(21, 15);
    }

    return {
        Easy: Easy,
    	Medium: Medium,
        Hard: Hard
    };

});


