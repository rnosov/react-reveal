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
        xdist = big ? '2000px' : '100%', ydist =  big ? '2000px' : props.collapse || '100%'; 
        return animation(
          `${!reverse?'from':'to'} {${props.collapse?`max-height:0;`:''}opacity: 0;${left||right||up||down||top||bottom ? ` transform: translate3d(${left?`-${xdist}`:(right?xdist:'0')}, ${down||top?`-${ydist}`:(up||bottom?ydist:'0')}, 0);` : ''}}
            ${reverse?'from':'to'} {${props.collapse?`max-height:${props.collapse};`:''}opacity: 1;transform: none;} `);  
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