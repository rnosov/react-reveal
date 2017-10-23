/*
 * Flip React Component
 *
 * Copyright © Roman Nosov 2017 
 * Copyright (c) 2016 Daniel Eden 
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


import React from 'react';
import { bool } from 'prop-types';
import Reveal from './Reveal';
import { animation } from './lib/globals';

const
  propTypes = {
    x: bool,
    y: bool,
  },
  defaultProps = {
    
  };

function Flip({ x, y, style, ...props }) {	
	let rule;
	if (!x&&!y)
		rule=`from {
    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    animation-timing-function: ease-out;
  }

  40% {
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
    animation-timing-function: ease-out;
  }

  50% {
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
    animation-timing-function: ease-in;
  }

  to {
    transform: perspective(400px);
    animation-timing-function: ease-in;
	}`;
	else 
		rule=`from {
    transform: perspective(400px) rotate3d(${x?'1':'0'}, ${y?'1':'0'}, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(${x?'1':'0'}, ${y?'1':'0'}, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(${x?'1':'0'}, ${y?'1':'0'}, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(${x?'1':'0'}, ${y?'1':'0'}, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
`;	
  return <Reveal {...props} 
  	style={{...style, backfaceVisibility: 'visible'}}	
  	animation={animation(rule, false)} 
  />;
}

Flip.propTypes = propTypes;
Flip.defaultProps = defaultProps;
export default Flip;