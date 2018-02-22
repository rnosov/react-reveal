/*
 * Zoom React Component
 *
 * Copyright © Roman Nosov 2017
 * Original CSS Effect - Copyright (c) 2016 Daniel Eden
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { bool, number } from 'prop-types';
import wrap from '../lib/wrap';
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
    timeout: number,
    delay: number,
    count: number,
    forever: bool,
  };

function make(reverse, { left, right, up, down, top, bottom, mirror, opposite, }) {
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

function Zoom({ children, out, forever,
              timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props } = defaults) {
  const effect = {
    make,
    duration: timeout === undefined ? duration : timeout,
    delay, forever, count,
    style: { animationFillMode: 'both', },
    reverse: props.left,
  };
  const checksum = 0 + (props.left?1:0) + (props.right?10:0) + (props.top||props.down?100:0) + (props.bottom||props.up?1000:0) + (props.mirror?10000:0) + (props.opposite?100000:0);
  return wrap(props, effect, effect, children, checksum);
}

Zoom.propTypes = propTypes;
export default Zoom;
