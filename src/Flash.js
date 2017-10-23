/*
 * Flash React Component
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
from, 50%, to {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0;
}
`;
function Flash(props) {
  return <Reveal {...props} noHide={true} animation={animation(rule, false)} />;
}


Flash.propTypes = propTypes;
Flash.defaultProps = defaultProps;
export default Flash;