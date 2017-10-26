/*
 * Step Auxiliary Class
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

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

}

export default Step;