/*
 * Zoom React Component
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Base from './Base';
import { animation } from './globals';

const
  propTypes = {
    
  },
  defaultProps = {
    
  };

function Zoom(props) {
  return <Base {...props} animation={animation(`from { opacity: 0; transform: scale3d(.3, .3, .3);}`)} />;
}


Zoom.propTypes = propTypes;
Zoom.defaultProps = defaultProps;
export default Zoom;