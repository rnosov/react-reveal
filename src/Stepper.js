/*
 * Stepper Auxiliary Class
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

export default class Stepper {
	
	constructor(...args) {		
		this.steps = Array.isArray(args[0])? args[0] : args;
		this.chain = {};
		this.id2chain = {};
		this.hasStarted = false;
		this.start = this.start.bind(this);
		this.next = this.next.bind(this);		
		for (let i=0, max=this.steps.length;i<max;i++){
			if (typeof this.steps[i] === 'string'){
				this.chain[this.steps[i]] = [];
				this.chain[this.steps[i]].index = i;
			}
		}
	}

	start(id) {
		if(this.hasStarted) { //todo: check for potential race condtions in here...
			if (this.chain[this.id2chain[id]].index<this.chain[this.id2chain[this.startId]].index)
				this.startId = id;
			return true;
		}
		this.startId = id;
		this.hasStarted = true;
		window.setTimeout(this.init.bind(this),50); //todo: find a better way of doing it
	}

	init() {
		for( const key in this.chain ){
      if (this.chain.hasOwnProperty(key))
   			for (let i=0, max=this.chain[key].length;i<max;i++){
					this.chain[key][i].clean();					
					this.chain[key][i].start = void 0;
   			}
    }		
    this.head = this.chain[this.id2chain[this.startId]].index;
    this.tail = this.head === 0 ? this.steps.length : this.head - 1;
    this.next();
	}

	next() {
		if (this.head === this.tail)
			return; // break the loop
		if (this.head >= this.steps.length) 
			this.head = 0;	
		if (typeof this.steps[this.head] !== 'string')
			return window.setTimeout(this.next, this.steps[this.head++]);				
		const chain = this.chain[this.steps[this.head]];
		for (let i = 0, len = chain.length; i < len; i++)
			chain[i].reveal();							
		this.head++;
		this.next();		
	}

	check(step) {		
		if (!this.chain.hasOwnProperty(step)) {			
			if (process.env.NODE_ENV !== 'production')
				throw new Error(`Reveal step ${step} is missing`);
			else {
				this.chain[step] = [];
				console.warn(`Reveal step ${step} is missing`);		
			} 
		}
	}

	step(step) {
		this.check(step);
		return api =>{ 
			this.chain[step].push(api);
			this.id2chain[api.id] = step;
			api.start = this.start;
		}
	}

}