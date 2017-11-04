/*
 * Roll React Component
 *
 * Copyright © Roman Nosov 2017
 * CSS effect originally authored by Nick Pettit - https://github.com/nickpettit/glide
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import RevealBase from '../RevealBase';
import { bool, number } from 'prop-types';
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
    delay: number,
    count: number,
    forever: bool,
  };

function Roll({ out, left, right, up, down, top, bottom, big, mirror, opposite, forever,
              duration = defaults.duration, delay = defaults.delay, count = defaults.count, ...props } = defaults, context = false) {

  function factory(reverse) {

    function make() {
      if ( !mirror !== !(reverse&&opposite)) // Boolean XOR
        [left, right, top, bottom, up, down] = [right, left, bottom, top, down, up];
      const dist = big ? '2000px' : '100%',
        x = left ? '-' + dist : ( right ? dist : '0' ),
        y = down || top ? '-'+ dist : ( up || bottom ? dist : '0' );
      return animation(`
      	${!reverse?'from':'to'} {opacity: 0;transform: translate3d(${x}, ${y}, 0) rotate3d(0, 0, 1, -120deg);}
				${reverse?'from':'to'} {opacity: 1;transform: none}
			`);
    }

    return { make, duration, delay, forever, count, style: { animationFillMode: 'both', } };
  }

  return context
    ? <RevealBase {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}

Roll.propTypes = propTypes;
export default Roll;
