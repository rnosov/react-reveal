/*
 * Zoom React Component
 *
 * Copyright © Roman Nosov 2017 
 * CSS Effect - Copyright (c) 2016 Daniel Eden 
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
  },
  defaultProps = {   

  };

function Zoom({ out, left, right, top, bottom, up, down, ...props }, context) { 

  function factory(reverse) {
    
    function make() {
      const rule = (left||right||up||down||top||bottom) 
        ? `${!reverse?'from':'to'} {
            opacity: 0;
            transform: scale3d(.1, .1, .1) translate3d(${left||right?(left?'-':'')+'1000px':'0'}, ${up||down||top||bottom?(down||top?'-':'')+'1000px':'0'}, 0);
            animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
          }
          ${reverse?'40%':'60%'} {
            opacity: 1;
            transform: scale3d(.475, .475, .475) translate3d(${left||right?(right?'-':'')+'10px':'0'}, ${up||down||top||bottom?(up||bottom?'-':'')+'60px':'0'}, 0);
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
          }`
        : `${!reverse?'from':'to'} { opacity: 0; transform: scale3d(.1, .1, .1);} ${reverse?'from':'to'} { opacity: 1; transform: none;}`;
      return animation(rule);
    }
    
    return { make }; 
  }
  
  return context
    ? <Reveal {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}

Zoom.propTypes = propTypes;
Zoom.defaultProps = defaultProps;
export default Zoom;
