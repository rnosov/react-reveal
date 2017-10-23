/*
 * Pulse React Component
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

const rule = `
	from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
}
`;
function Pulse(props) {
  return <Reveal {...props} noHide={true} animation={animation(rule, false)} />;
}


Pulse.propTypes = propTypes;
Pulse.defaultProps = defaultProps;
export default Pulse;