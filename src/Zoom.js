/*
 * Zoom React Component
 *
 * Copyright © Roman Nosov 2017
 * Copyright (c) 2016 Daniel Eden 
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Reveal from './Reveal';
import { animation } from './lib/globals';

const
  propTypes = {
    
  },
  defaultProps = {
    
  };

function Zoom({ left, right, up, down, top, bottom, ...props }) {
	if (left||right||up||down||top||bottom) {
		let rule = `from {
    opacity: 0;
    transform: scale3d(.1, .1, .1) translate3d(${left||right?(left?'-':'')+'1000px':'0'}, ${up||down||top||bottom?(down||top?'-':'')+'1000px':'0'}, 0);
    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  }

  60% {
    opacity: 1;
    transform: scale3d(.475, .475, .475) translate3d(${left||right?(right?'-':'')+'10px':'0'}, ${up||down||top||bottom?(up||bottom?'-':'')+'60px':'0'}, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  }`;
  	return <Reveal {...props} animation={animation(rule, false)} />;//`from { opacity: 0; transform: scale3d(.3, .3, .3);}`)} />;
	}
  return <Reveal {...props} animation={animation(`from { opacity: 0; transform: scale3d(.1, .1, .1);}`, true)} />;
}


Zoom.propTypes = propTypes;
Zoom.defaultProps = defaultProps;
export default Zoom;