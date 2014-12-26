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
   		for (i = 0; i < 15; i++) {
   			this.nodes.push(Node.NULL);
   		}

   		/* Set up empty nodes with correct edges. */

   		/* Row 5 */
   		this.nodes[14] = Node.makeUnary(0);
   		this.nodes[13] = Node.makeUnary(0);
   		this.nodes[12] = Node.makeUnary(0);
         this.nodes[11] = Node.makeUnary(0);
   		this.nodes[10] = Node.makeUnary(0);

   		/* Row 4 */
   		this.nodes[9] = Node.makeBinary(0, this.nodes[13], this.nodes[14]);
   		this.nodes[8] = Node.makeBinary(0, this.nodes[12], this.nodes[13]);
   		this.nodes[7] = Node.makeBinary(0, this.nodes[11], this.nodes[12]);
   		this.nodes[6] = Node.makeBinary(0, this.nodes[10], this.nodes[11]);

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
   			this.nodes[i].value = this.initValues[i];
   		}

   		for (i = 0; i < this.initOps.length; i++) {
   			if (this.initOps[i] !== 0)
	   			this.nodes[i].op = this.initOps[i];
   		}
   	
   	};

   	function Puzzle (initValuesIn, initOpsIn) {

   		this.initValues = initValuesIn;

   		this.initOps = initOpsIn;

   		this.nodes = [];

   		this.init = init;

   		this.init();

   	};

   	Puzzle.prototype.toString = function () {
   		
   		return "" + 
   			"<p>{0}</p>".format(this.nodes[0].value) +
   			"<p>{0}</p>".format(this.nodes[0].op) +
   			
   			"<p>{0}...{1}</p>".format(this.nodes[1].value, this.nodes[2].value) + 
   			"<p>{0}...{1}</p>".format(this.nodes[1].op, this.nodes[2].op) + 
   			
   			"<p>{0}...{1}...{2}</p>".format(this.nodes[3].value, this.nodes[4].value, this.nodes[5].value) + 
			"<p>{0}...{1}...{2}</p>".format(this.nodes[3].op, this.nodes[4].op, this.nodes[5].op) + 
			
			"<p>{0}...{1}...{2}...{3}</p>".format(this.nodes[6].value, this.nodes[7].value, this.nodes[8].value, this.nodes[9].value) + 
			"<p>{0}...{1}...{2}...{3}</p>".format(this.nodes[6].op, this.nodes[7].op, this.nodes[8].op, this.nodes[9].op) + 
			
			"<p>{0}...{1}...{2}...{3}...{4}</p>".format(this.nodes[10].value, this.nodes[11].value, this.nodes[12].value, this.nodes[13].value, this.nodes[14].value); 
   	};

   	Puzzle.prototype.isWin = function () {

   		var i;

   		var allValid = true;

   		for (i = 14; i >= 0; i--) {
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


