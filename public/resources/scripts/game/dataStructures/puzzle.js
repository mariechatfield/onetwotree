define([
    'jquery',
    'game/dataStructures/node',
    'game/dataStructures/operation'
],
function($, Node, Operation) {

    'use strict';

    function init () {

    	var i;

   		/* Initialize all nodes as null. */
   		for (i = 0; i < this.numNodes; i++) {
   			this.nodes.push(Node.NULL);
   		}

   		/* Set up empty nodes with correct edges. */

         if (this.numNodes == 21) {
            /* Row 6 */
            this.nodes[20] = Node.makeUnary(0);
            this.nodes[19] = Node.makeUnary(0);
            this.nodes[18] = Node.makeUnary(0);
            this.nodes[17] = Node.makeUnary(0);
            this.nodes[16] = Node.makeUnary(0);
            this.nodes[15] = Node.makeUnary(0);

            /* Row 5 */
            this.nodes[14] = Node.makeBinary(0, this.nodes[19], this.nodes[20]);
            this.nodes[13] = Node.makeBinary(0, this.nodes[18], this.nodes[19]);
            this.nodes[12] = Node.makeBinary(0, this.nodes[17], this.nodes[18]);
            this.nodes[11] = Node.makeBinary(0, this.nodes[16], this.nodes[17]);
            this.nodes[10] = Node.makeBinary(0, this.nodes[15], this.nodes[16]);

         } else if (this.numNodes == 15) {
            /* Row 5 */
            this.nodes[14] = Node.makeUnary(0);
            this.nodes[13] = Node.makeUnary(0);
            this.nodes[12] = Node.makeUnary(0);
            this.nodes[11] = Node.makeUnary(0);
            this.nodes[10] = Node.makeUnary(0);
         }

         if (this.numNodes > 10) {
            /* Row 4 */
            this.nodes[9] = Node.makeBinary(0, this.nodes[13], this.nodes[14]);
            this.nodes[8] = Node.makeBinary(0, this.nodes[12], this.nodes[13]);
            this.nodes[7] = Node.makeBinary(0, this.nodes[11], this.nodes[12]);
            this.nodes[6] = Node.makeBinary(0, this.nodes[10], this.nodes[11]);
         } else {
            /* Row 3 */
            this.nodes[9] = Node.makeUnary(0);
            this.nodes[8] = Node.makeUnary(0);
            this.nodes[7] = Node.makeUnary(0);
            this.nodes[6] = Node.makeUnary(0);
         }

   		/* Row 3 */
   		this.nodes[5] = Node.makeBinary(0, this.nodes[8], this.nodes[9]);
   		this.nodes[4] = Node.makeBinary(0, this.nodes[7], this.nodes[8]);
   		this.nodes[3] = Node.makeBinary(0, this.nodes[6], this.nodes[7]);

   		/* Row 2 */
   		this.nodes[2] = Node.makeBinary(0, this.nodes[4], this.nodes[5]);
   		this.nodes[1] = Node.makeBinary(0, this.nodes[3], this.nodes[4]);

   		/* Row 1 */
   		this.nodes[0] = Node.makeBinary(0, this.nodes[1], this.nodes[2]);

   		for (i = 0; i < this.initValues.length; i++) {
   			if (this.initValues[i] !== 0) {
               this.nodes[i].value = this.initValues[i];
               this.nodes[i].mutable = false;
            }
   		}

   		for (i = 0; i < this.initOps.length; i++) {
   			if (this.initOps[i] !== 0) {
	   			this.nodes[i].op = this.initOps[i];
               this.nodes[i].op.mutable = false;
            }
   		}
   	
   	};

   	function Puzzle (specs) {

   		this.initValues = specs.initValues;

   		this.initOps = specs.initOps;

         this.numNodes = specs.numNodes;

   		this.nodes = [];

   		this.init = init;

   		this.init();

   	};

   	Puzzle.prototype.isWin = function () {

   		var i;

   		var allValid = true;

   		for (i = this.numNodes-1; i >= 0; i--) {
   			var node = this.nodes[i];

   			/* Check if node's value has been set */
   			if (node.value === 0)
   				return false;

   			/* Check if node's operation has been set */
   			if (node.op !== undefined && node.op === Operation.NULL)
   				return false;

   			/* Check that node is valid */
   			if (!node.verify())
   				return false;
   			
   		}

   		return true;
   	}

   	return Puzzle;

});


