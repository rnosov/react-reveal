/*
 * Bounce React Component
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
    right: bool,
    top: bool,
    bottom: bool,    
  },
  defaultProps = {
    
  };

function Bounce({ left, right, up, down, top, bottom, ...props }) {
	let rule;
	if (left||right||up||down||top||bottom) 
		rule=`from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    transform: translate3d(${left||right? ((left?'-':'') + '3000px'):'0'}, ${down||top||up||bottom? ((down||top?'-':'') + '3000px'):'0'}, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(${left||right? ((right?'-':'') + '25px'):'0'}, ${down||top||up||bottom? ((up||bottom?'-':'') + '25px'):'0'}, 0);
  }

  75% {
    transform: translate3d(${left||right? ((left?'-':'') + '10px'):'0'}, ${down||top||up||bottom? ((down||top?'-':'') + '10px'):'0'}, 0);
  }

  90% {
    transform: translate3d(${left||right? ((right?'-':'') + '5px'):'0'}, ${down||top||up||bottom? ((up||bottom?'-':'') + '5px'):'0'}, 0);
  }

  to {
    transform: none;
  }`;	
  else 
    rule = `from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }`;
  return <Reveal {...props} 
  	animation={animation(rule, false)} 
  />;
}

Bounce.propTypes = propTypes;
Bounce.defaultProps = defaultProps;
export default Bounce;

