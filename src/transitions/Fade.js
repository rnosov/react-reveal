/*
 * Fade React Component
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bool } from 'prop-types';
import Reveal from '../Reveal';
import { animation } from '../lib/globals';

const
  propTypes = {
    out: bool,
    left: bool,
    right: bool,
    top: bool,
    bottom: bool,
    big: bool,
  },
  defaultProps = { 

  };

function Fade({out, left, right, up, down, top, bottom, big, ...props}, context) {
  
  function factory(reverse) {
    
    function make() {
      const 
        dist = big ? '2000px' : '100%';
        return animation(
          `${!reverse?'from':'to'} {opacity: 0;${left||right||up||down||top||bottom ? ` transform: translate3d(${left?`-${dist}`:(right?dist:'0')}, ${down||top?`-${dist}`:(up||bottom?dist:'0')}, 0);` : ''}}
            ${reverse?'from':'to'} {opacity: 1;transform: none;} `);  
    }
    
    return { reverse: left, make }; 
  }
  
  return context
    ? <Reveal {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}

Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;
export default Fade;