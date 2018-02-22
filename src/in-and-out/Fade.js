/*
 * Fade React Component
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { bool, number, string } from 'prop-types';
import { animation, defaults } from '../lib/globals';
import wrap from '../lib/wrap';

const
  propTypes = {
    out: bool,
    left: bool,
    right: bool,
    top: bool,
    bottom: bool,
    big: bool,
    mirror: bool,
    opposite: bool,
    duration: number,
    timeout: number,
    distance: string,
    delay: number,
    count: number,
    forever: bool,
  };

function make(reverse, { distance, left, right, up, down, top, bottom, big, mirror, opposite, }) {
  const transform = left||right||up||down||top||bottom;
  let x, y;
  if (transform) {
    if ( !mirror !== !(reverse&&opposite)) // Boolean XOR
      [left, right, top, bottom, up, down] = [right, left, bottom, top, down, up];
    const dist = distance || (big ? '2000px' : '100%');
    x = left ? '-' + dist : ( right ? dist : '0' );
    y = down || top ? '-'+ dist : ( up || bottom ? dist : '0' );
  }
  return animation(
    `${!reverse?'from':'to'} {opacity: 0;${ transform ? ` transform: translate3d(${x}, ${y}, 0);` : ''}}
     ${ reverse?'from':'to'} {opacity: 1;transform: none;} `
  );
}

function Fade({ children, out, forever,
              timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props } = defaults, context = false) {
  const effect = {
    make,
    duration: timeout === undefined ? duration : timeout,
    delay,
    forever,
    count,
    style: { animationFillMode: 'both', },
    reverse: props.left,
  };
  const checksum = (props.distance?props.distance.toString():0) + (props.left?1:0) + (props.right?10:0) + (props.top||props.down?100:0) + (props.bottom||props.up?1000:0) + (props.mirror?10000:0) + (props.opposite?100000:0) + (props.big?1000000:0);
  return context ? wrap(props, effect, effect, children, checksum) : effect;
}

Fade.propTypes = propTypes;
export default Fade;
