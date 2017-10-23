/*
 * RubberBand React Component
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

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, .95, 1);
  }

  to {
    transform: scale3d(1, 1, 1);
}
`;
function RubberBand(props) {
  return <Reveal {...props} noHide={true} animation={animation(rule, false)} />;
}


RubberBand.propTypes = propTypes;
RubberBand.defaultProps = defaultProps;
export default RubberBand;