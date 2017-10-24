/*
 * LightSpeed React Component
 *
 * Copyright © Roman Nosov 2017
 * Copyright (c) 2016 Daniel Eden 
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Reveal from './Reveal';
import { bool } from 'prop-types';
import { animation } from './lib/globals';

const
  propTypes = {
    when: bool,

  },
  defaultProps = {
  	when: true,
  };

function LightSpeed(props) {
	const rule = props.when 
	? `from {
    transform: translate3d(100%, 0, 0) skewX(-30deg);
    opacity: 0;
  }

  60% {
    transform: skewX(20deg);
    opacity: 1;
  }

  80% {
    transform: skewX(-5deg);
    opacity: 1;
  }

  to {
    transform: none;
    opacity: 1;
  }`
  : `from {
    opacity: 1;
  }

  to {
    transform: translate3d(100%, 0, 0) skewX(30deg);
    opacity: 0;
  };`;	
  return <Reveal {...props} animation={animation(rule)} />;
}


LightSpeed.propTypes = propTypes;
LightSpeed.defaultProps = defaultProps;
export default LightSpeed;