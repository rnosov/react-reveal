/*
 * Flip React Component
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bool } from 'prop-types';
import Base from './Base';
import { animation } from './lib/globals';

const
  propTypes = {
    x: bool,
    y: bool,
  },
  defaultProps = {
    
  };

function Flip({ x, y, ...props }) {	
  return <Base {...props} 
  	animation={animation(`from { opacity: 0; transform: perspective(400px) rotate3d(${x?'1':'0'}, ${x?'0':'1'}, 0, ${x||y?'90deg':'-360deg'});}`)} 
  />;
}

Flip.propTypes = propTypes;
Flip.defaultProps = defaultProps;
export default Flip;