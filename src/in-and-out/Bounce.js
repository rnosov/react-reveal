/*
 * Bounce React Component
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

const lookup = {};
function make(reverse, { left, right, up, down, top, bottom, mirror, opposite, }) {
  const checksum = (left?1:0) | (right?2:0) | (top||down?4:0) | (bottom||up?8:0) | (mirror?16:0) | (opposite?32:0) | (reverse?64:0);
  if (lookup.hasOwnProperty(checksum))
    return lookup[checksum];
  if ( !mirror !== !(reverse&&opposite)) // Boolean XOR
      [left, right, top, bottom, up, down] = [right, left, bottom, top, down, up];
  const
    transformX = left || right,
    transformY = top || bottom || up || down,
    transform = transformX || transformY;
  let rule, x0, y0, x20, y20, y40, x60, y60, x75, y75, x90, y90, x100, y100;
  if (reverse) {
      x20  = transformX ? ( right ?'-':'') + '20px' : 0;
      y20  = transformY ? ( up||bottom?'':'-') + '10px' : '0';
      y40  = ( down||top ? '':'-') + '20px';
      x100 = transformX ? ( left ? '-' :'' ) + '2000px':'0';
      y100 = transformY ? ( down||top?'-':'') +'2000px':'0';
  }
  else {
    x0  = transformX ? ((left?'-':'') + '3000px'):'0';
    y0  = transformY ? ((down||top?'-':'') + '3000px'):'0';
    x60 = transformX ? ((right?'-':'') + '25px'):'0';
    y60 = transformY ? ((up||bottom?'-':'') + '25px'):'0';
    x75 = transformX ? ((left?'-':'') + '10px'):'0';
    y75 = transformY ? ((down||top?'-':'') + '10px'):'0';
    x90 = transformX ? ((right?'-':'') + '5px'):'0';
    y90 = transformY ? ((up||bottom?'-':'') + '5px'):'0';
  }
  if (transform)
    rule = reverse
      ?`
        20% {
          transform: translate3d(${x20}, ${y20}, 0);
          }
        ${ transformY
          ?`40%, 45% {
            opacity: 1;
            transform: translate3d(0, ${y40}, 0);
          }`
          :''
        }
          to {
            opacity: 0;
            transform: translate3d(${x100}, ${y100}, 0);
        }
      `
      :`from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      }
      from {
        opacity: 0;
        transform: translate3d(${x0}, ${y0}, 0);
      }
      60% {
        opacity: 1;
        transform: translate3d(${x60}, ${y60}, 0);
      }
      75% {
        transform: translate3d(${x75}, ${y75}, 0);
      }
      90% {
        transform: translate3d(${x90}, ${y90}, 0);
      }
      to {
        transform: none;
      }`;
  else
    rule = reverse
      ? `20% {
          transform: scale3d(.9, .9, .9);
        }
        50%, 55% {
          opacity: 1;
          transform: scale3d(1.1, 1.1, 1.1);
        }
        to {
          opacity: 0;
          transform: scale3d(.3, .3, .3);
      }`
      : `from, 20%, 40%, 60%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      }
      0% {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
      }
      20% {
        transform: scale3d(1.1, 1.1, 1.1);
      }
      40% {
        transform: scale3d(.9, .9, .9);
      }
      60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
      }
      80% {
        transform: scale3d(.97, .97, .97);
      }
      to {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }`;
  lookup[checksum] = animation(rule);
  return lookup[checksum];
}

function Bounce({ children, out, forever,
                timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props } = defaults) {
  const effect = {
    make,
    duration: timeout === undefined ? duration : timeout,
    delay,
    forever,
    count,
    style: { animationFillMode: 'both', },
    reverse: props.left,
  };
  return wrap(props, effect, effect, children);
}

Bounce.propTypes = propTypes;
export default Bounce;
