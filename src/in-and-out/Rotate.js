/*
 * Rotate React Component
 *
 * Copyright © Roman Nosov 2017
 * Original CSS Effect - Copyright (c) 2016 Daniel Eden
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
    opposite: bool,
  },
  defaultProps = {

  };

function Rotate({ out, left, right, top, bottom, up, down, opposite, ...props }, context) {

  function factory(reverse) {

    function make() {
      let angle = '-200deg', origin = 'center';
      if (reverse && opposite) {
        if ( (up||bottom) && right ) angle = '-45deg';
        if ( ((up||bottom) && left) || ((down||top) && right) ) angle = '45deg';
        if ( (down||top) && left ) angle = '-90deg';
        if ( left || right ) origin=( right ? 'left' : 'right' ) + ' bottom';
      }
      else {
        if ( (down||top) && left ) angle = '-45deg';
        if ( ((down||top) && right) || ((up||bottom) && left) ) angle = '45deg';
        if ( (up||bottom) && right ) angle = '-90deg';
        if ( left || right ) origin=( left ? 'left' : 'right' ) + ' bottom';
      }
      return animation(`
        ${!reverse?'from':'to'} { opacity: 0; transform-origin: ${origin}; transform: rotate3d(0, 0, 1, ${angle});}
        ${reverse?'from':'to'} { opacity: 1; transform-origin: ${origin}; transform: none;}
      `);
    }

    return { make };
  }

  return context
    ? <Reveal {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}

Rotate.propTypes = propTypes;
Rotate.defaultProps = defaultProps;
export default Rotate;
