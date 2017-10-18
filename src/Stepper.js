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
		this.isTriggered = false;

		this.start = this.start.bind(this);		
		this.next = this.next.bind(this);		
		for (let i=0, len=this.steps.length;i<len;i++) {		
			this.steps[i].index = i;
			this.steps[i].start = this.start;
		}
	}

	start(step) {
		if(this.isTriggered) { 
			if (step<this.trigger)
				this.trigger = step;
			return;
		}
		this.isTriggered = true;
		this.trigger = step;
		window.setTimeout(this.init.bind(this),50);
	}

	init() {		
		this.hasStarted = true;
		this.head = this.trigger;
    this.tail = this.head === 0 ? this.steps.length - 1 : this.head - 1;    
    this.next();
    //window.setTimeout(this.next, this.steps[this.head].before);
	}

	stop() {
		this.hasStarted = false;
		this.isTriggered = false;			
	}

	next() {
		for (let i = 0, len = this.steps[this.head].chain.length; i < len; i++){
			const api = this.steps[this.head].chain[i];
			//if (!api.inViewport())
			//	return this.stop();
			if (api.start){
				delete api.start;
				api.reveal();
			}
			//this.steps[this.head].finished = true;	    
		}
		console.log(this.head, this.tail, this.steps.length);
		if (this.head === this.tail) 
			return this.stop();		
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
