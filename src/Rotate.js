/*
 * Rotate React Component
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

function Rotate({ left, right, up, down, top, bottom, ...props }) {
  let angle = '-200deg', origin = 'center';
  if ( (down||top) && left ) angle = '-45deg';
  if ( ((down||top) && right) || ((up||bottom) && left) ) angle = '45deg';
  if ( (up||bottom) && right ) angle = '-90deg';  
  if ( left || right ) origin=( left ? 'left' : 'right' ) + ' bottom';
  return <Reveal {...props} 
  	animation={animation(`
from { opacity: 0; transform-origin: ${origin}; transform: rotate3d(0, 0, 1, ${angle});}
to { opacity: 1; transform-origin: ${origin}; transform: none;}
`, false)} 
  />;  
}

Rotate.propTypes = propTypes;
Rotate.defaultProps = defaultProps;
export default Rotate;