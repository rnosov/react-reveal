/*
 * LightSpeed React Component
 *
 * Copyright © Roman Nosov 2017
 * Original CSS Effect - Copyright (c) 2016 Daniel Eden
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import wrap from '../lib/wrap';
import { bool, number } from 'prop-types';
import { animation, defaults } from '../lib/globals';

const
  propTypes = {
    out: bool,
    left: bool,
    right: bool,
    mirror: bool,
    opposite: bool,
    duration: number,
    timeout: number,
    delay: number,
    count: number,
    forever: bool,
  };

function LightSpeed({ children, out, left, right, mirror, opposite, forever,
                    timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props } = defaults, context = false) {

  function factory(reverse) {

    function make() {
      if ( !mirror !== !(reverse&&opposite)) // Boolean XOR
          [left, right] = [right, left];
      const dist = '100%',
        x = left ? '-' + dist : ( right ? dist : '0' );
      const rule = !reverse
        ? `from {
            transform: translate3d(${x}, 0, 0) skewX(-30deg);
            opacity: 0;
          }

          60% {
            transform: skewX(20deg);
            opacity: 1;
          }

          80% {
            transform: skewX(-5deg);
            opacity: 1;
          }

          to {
            transform: none;
            opacity: 1;
          }`
        : `from {
            opacity: 1;
          }

          to {
            transform: translate3d(${x}, 0, 0) skewX(30deg);
            opacity: 0;
          }
        `;
      return animation(rule);
    }

    return { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
  }

  return context
    ? wrap(props, factory, children)
    : factory(out)
  ;
}

LightSpeed.propTypes = propTypes;
export default LightSpeed;
