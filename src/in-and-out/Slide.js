/*
 * Slide React Component
 *
 * Copyright © Roman Nosov 2017
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
    big: bool,
    mirror: bool,
    opposite: bool,
    duration: number,
    timeout: number,
    delay: number,
    count: number,
    forever: bool,
  };

function Slide({ children, out, left, right, up, down, top, bottom, big, mirror, opposite, forever,
              timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props } = defaults, context = false) {

  function factory(reverse) {

    function make() {
      const transform = left||right||up||down||top||bottom;
      let x, y;
      if (transform) {
        if ( !mirror !== !(reverse&&opposite)) // Boolean XOR
          [left, right, top, bottom, up, down] = [right, left, bottom, top, down, up];
        const dist = big ? '2000px' : '100%';
        x = left ? '-' + dist : ( right ? dist : '0' );
        y = down || top ? '-'+ dist : ( up || bottom ? dist : '0' );
      }
      return animation(
        `${!reverse?'from':'to'} {${ transform ? ` transform: translate3d(${x}, ${y}, 0);` : ''}}
         ${ reverse?'from':'to'} {transform: none;} `
      );
    }

    const checksum = 0 + (left?1:0) + (right?10:0) + (top||down?100:0) + (bottom||up?1000:0) + (mirror?10000:0) + (opposite?100000:0) + (big?1000000:0);
    return { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', }, reverse: left, };
  }

  return context
    ? wrap(props, factory, children, checksum)
    : factory(out)
  ;
}

Slide.propTypes = propTypes;
export default Slide;
