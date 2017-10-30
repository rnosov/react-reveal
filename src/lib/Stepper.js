/*
 * Stepper Auxiliary Class
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Step from './Step';

class Stepper {

	constructor() {
		this.steps = [];
		this.stepMap = {};
		this.hasStarted = false;
		this.isTriggered = false;
		this.runs = 1;
		this.totalRuns = 0;
		this.start = this.start.bind(this);
		this.next = this.next.bind(this);
	}

	step(name, after = 1000) {
		const step = new Step(name, after);
		step.start = this.start;
		step.index = this.steps.push(step) - 1;
		this.stepMap[name] = step;
		return this;
	}

	//if (process.env.NODE_ENV !== 'production')
//	throw new Error(`Animation step ${name} is missing`);
//else {
//}
	is(name) {
		return this.get(name);
	}

  get(name) {
    if (name in this.stepMap)//.hasOwnProperty(name))
      return this.stepMap[name];
    else console.warn(`Animation step ${name} is missing`);
  }


	start(step) {
		if (this.hasStarted) {
			this.runs = 2;
		}
		if(this.isTriggered) {
			if ( step < this.trigger )
				this.trigger = step;
			return;
		}
		this.isTriggered = true;
		this.trigger = step;
		window.setTimeout(this.init.bind(this), 50);
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
		let onceRevealed = false;
		for (let i = 0, len = this.steps[this.head].chain.length; i < len; i++) {
			const api = this.steps[this.head].chain[i];
			if (!api.isShown&&api.start&&api.inViewport()) {
				onceRevealed = true;
				delete api.start;
				api.animate(api.props);
			}
		}
		if (this.head === this.tail) {
			this.runs--;
			this.totalRuns++;
			if (this.totalRuns>100)
				return;
			if (this.runs <= 0)
				return this.stop();
		}
		const prev = this.head;
		this.head++;
		if (this.head >= this.steps.length)
			this.head = 0;
		//console.log('head:',this.head,'runs', this.runs,'total', this.totalRuns)			;
		if (onceRevealed)
			window.setTimeout(this.next, this.steps[prev].after);
		else this.next();
	}

}

export default Stepper;
