/*
 * Rotate React Component
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
  let angle = '-200deg', origin = 'center';
  if ( (down||top) && left ) angle = '-45deg';
  if ( ((down||top) && right) || ((up||bottom) && left) ) angle = '45deg';
  if ( (up||bottom) && right ) angle = '-90deg';
  if ( left || right ) origin=( left ? 'left' : 'right' ) + ' bottom';
  return animation(`
    ${!reverse?'from':'to'} { opacity: 0; transform-origin: ${origin}; transform: rotate3d(0, 0, 1, ${angle});}
    ${reverse?'from':'to'} { opacity: 1; transform-origin: ${origin}; transform: none;}
  `);
}

function Rotate({ children, out, forever,
                  timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props } = defaults) {
  const effect = {
    make,
    duration: timeout === undefined ? duration : timeout,
    delay, forever, count,
    style: { animationFillMode: 'both', }
  };
  const checksum = 0 + (props.left?1:0) + (props.right?10:0) + (props.top||props.down?100:0) + (props.bottom||props.up?1000:0) + (props.mirror?10000:0) + (props.opposite?100000:0);
  return wrap(props, effect, effect, children, checksum);
}

Rotate.propTypes = propTypes;
export default Rotate;
