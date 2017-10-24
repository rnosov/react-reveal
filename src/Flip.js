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
    left: bool,
    right: bool, // y
    top: bool, // x
    bottom: bool,
    when: bool,
  },
  defaultProps = {
    when: true,
  };

function Flip({ left, right, top, bottom, x, y, style, ...props }) {	
	let rule;
	if (x||y||left||right||top||bottom) {
    const xval = x||top||bottom ? (bottom?'-':'') + '1' : '0', 
          yval = y||right||left ? (left?'-':'') +'1' : '0';
    if (props.when)
      rule=`from {
    transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
`; else rule = `from {
    transform: perspective(400px);
  }

  30% {
    transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, -15deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(${xval}, ${yval}, 0, 90deg);
    opacity: 0;
  }`; 
} else rule = `from {
    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    animation-timing-function: ease-out;
    opacity: ${props.when?'0':'1'};
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
    opacity: ${!props.when?'0':'1'};
	}`;

  return <Reveal {...props} 
  	style={{...style, backfaceVisibility: 'visible'}}	
  	animation={animation(rule, false)} 
  />;
}

Flip.propTypes = propTypes;
Flip.defaultProps = defaultProps;
export default Flip;