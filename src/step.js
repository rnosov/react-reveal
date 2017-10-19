/*
 * Stepper Auxiliary Class
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

class Stepper {
	
	constructor(steps) {		
		this.steps = steps;
		this.stepMap = {};
		for (let step of steps) 
			this.stepMap[step.name] = step;
		this.hasStarted = false;
		this.isTriggered = false;
		this.start = this.start.bind(this);		
		this.next = this.next.bind(this);		
		for (let i=0, len=this.steps.length;i<len;i++) {		
			this.steps[i].index = i;
			this.steps[i].start = this.start;
		}
	}

	//if (process.env.NODE_ENV !== 'production')
//	throw new Error(`Animation step ${name} is missing`);
//else {
//}
	is(name) {
		if (!this.stepMap.hasOwnProperty(name)) 
			console.warn(`Animation step ${name} is missing`);		
		return this.stepMap[name];
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
	}

	stop() {
		this.hasStarted = false;
		this.isTriggered = false;			
	}

	next() {
		for (let i = 0, len = this.steps[this.head].chain.length; i < len; i++){
			const api = this.steps[this.head].chain[i];			
			if (api.start){
				delete api.start;
				api.reveal();
			}		
		}		
		if (this.head === this.tail) 
			return this.stop();		
		const prev = this.head;
		this.head++;
		if (this.head >= this.steps.length) 
			this.head = 0;			
		window.setTimeout(this.next, this.steps[prev].after);						
	}

}

class Step {
	
	constructor(name, after = 1000) {				
		this.after = after;
		this.name = name;
		this.chain = [];
	}
	
	push(api) {		
		if (this.start) {
			api.step = this.index;
			api.start = this.start;
		}
		this.chain.push(api);
	}

	static stepper(...args) {
		return new Stepper(...args);
	}

}

function step(...args) {
	return new Step(...args);
}

step.by = function(...args) {	
	return new Stepper(Array.isArray(args[0]) ? args[0] : args);	
} 

export default step;