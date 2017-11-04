/*
 * Zoom React Component
 *
 * Copyright © Roman Nosov 2017
 * Original CSS Effect - Copyright (c) 2016 Daniel Eden
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bool, number } from 'prop-types';
import RevealBase from '../RevealBase';
import { animation, defaults } from '../lib/globals';

const
  propTypes = {
    out: bool,
    left: bool,
    right: bool,
    top: bool,
    bottom: bool,
    mirror: bool,
    opposite: bool,
    duration: number,
    delay: number,
    count: number,
    forever: bool,
  };

function Zoom({ out, left, right, top, bottom, up, down, mirror, opposite, forever,
              duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props } = defaults, context = false) {

  function factory(reverse) {

    function make() {
      if ( !mirror !== !(reverse&&opposite)) // Boolean XOR
        [left, right, top, bottom, up, down] = [right, left, bottom, top, down, up];
      const
        transformX = left || right,
        transformY = top || bottom || up || down,
        transform = transformX || transformY;
      let rule, x1, y1, x2, y2;
      if (transform) {
        if (reverse) {
          x1 = transformX ? ( left       ? '' : '-' ) + '42px' : '0';
          y1 = transformY ? ( down||top  ? '-' : '' ) + '60px' : '0';
          x2 = transformX ? ( right      ? '' : '-' ) + '2000px'   : '0';
          y2 = transformY ? ( up||bottom ? '' : '-' ) + '2000px'   : '0';
          rule =`40% {
              opacity: 1;
              transform: scale3d(.475, .475, .475) translate3d(${x1}, ${y1}, 0);
            }
            to {
              opacity: 0;
              transform: scale(.1) translate3d(${x2}, ${y2}, 0);
              transform-origin: ${transformY ? `center bottom` : `${left?'left':'right'} center`};
            }`;
        }
        else {
          x1 = transformX ? ( left       ? '-' : '' ) + '1000px' : '0';
          y1 = transformY ? ( down||top  ? '-' : '' ) + '1000px' : '0';
          x2 = transformX ? ( right      ? '-' : '' ) + '10px'   : '0';
          y2 = transformY ? ( up||bottom ? '-' : '' ) + '60px'   : '0';
          rule =`from {
              opacity: 0;
              transform: scale3d(.1, .1, .1) translate3d(${x1}, ${y1}, 0);
              animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
            }
            60% {
              opacity: 1;
              transform: scale3d(.475, .475, .475) translate3d(${x2}, ${y2}, 0);
              animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
            }`;
        }
      }
      else
        rule = `${!reverse?'from':'to'} {opacity: 0; transform: scale3d(.1, .1, .1);} ${reverse?'from':'to'} { opacity: 1; transform: none;}`;
      return animation(rule);
    }

    return { make, duration, delay, forever, count, style: { animationFillMode: 'both', } };
  }

  return context
    ? <RevealBase {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}

Zoom.propTypes = propTypes;
export default Zoom;
