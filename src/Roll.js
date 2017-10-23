/*
 * Roll React Component
 *
 * Copyright © Roman Nosov 2017
 * Originally authored by Nick Pettit - https://github.com/nickpettit/glide
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

function Roll(props) {
  return <Reveal {...props} animation={animation(`from {opacity: 0;transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);}`, true)} />;
}


Roll.propTypes = propTypes;
Roll.defaultProps = defaultProps;
export default Roll;