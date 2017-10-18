/*
 * Stepper Auxiliary Class
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

export class Step {
	
	constructor(after = 0, before = 0) {		
		this.before = before;
		this.after = after;
		this.chain = [];
	}
	
	push(api) {		
		if (this.start) {
			api.step = this.index;
			api.start = this.start;
		}
		this.chain.push(api);
	}

}

export class Stepper {
	
	constructor(...args) {		
		this.steps = Array.isArray(args[0])? args[0] : args;
		this.hasStarted = false;
		this.start = this.start.bind(this);		
		this.next = this.next.bind(this);		
		for (let i=0, len=this.steps.length;i<len;i++) {		
			this.steps[i].index = i;
			this.steps[i].start = this.start;
		}
	}

	start(step) {
		if(this.hasStarted) { 
			if (step<this.head)
				this.head = step;
			return true;
		}
		this.head = step;
		this.hasStarted = true;
		window.setTimeout(this.init.bind(this),50);
	}

	init() {		
    this.tail = this.head === 0 ? this.steps.length - 1 : this.head - 1;    
    this.next();
    //window.setTimeout(this.next, this.steps[this.head].before);
	}

	next() {
		for (let i = 0, len = this.steps[this.head].chain.length; i < len; i++){
			if (this.steps[this.head].chain[i].start){
				delete this.steps[this.head].chain[i].start;
				this.steps[this.head].chain[i].reveal();
			}
			//this.steps[this.head].finished = true;	    
		}
		//console.log(this.head, this.tail);
		if (this.head === this.tail) {
			this.hasStarted = false;
			return; // break the loop
		}
		const prev = this.head;
		this.head++;
		if (this.head >= this.steps.length) 
			this.head = 0;			
		//if (this.steps[this.head].finished)
		//	this.next();
		//else
			window.setTimeout(this.next, this.steps[prev].after + this.steps[this.head].before);						
	}

}
