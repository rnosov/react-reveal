/*
 * LightSpeed React Component
 *
 * Copyright © Roman Nosov 2017
 * Original CSS Effect - Copyright (c) 2016 Daniel Eden
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Reveal from '../Reveal';
import { bool } from 'prop-types';
import { animation } from '../lib/globals';

const
  propTypes = {
    out: bool,
    left: bool,
    right: bool,
    opposite: bool,
  },
  defaultProps = {

  };

function LightSpeed({ out, left, right, opposite, ...props }, context) {

  function factory(reverse) {

    function make() {
      const dist = '100%', change = opposite && reverse,
        x = left ? (change ? '':'-') + dist : ( right ? (change ? '-':'') + dist : '0' );
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

    return { make };
  }

  return context
    ? <Reveal {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}

LightSpeed.propTypes = propTypes;
LightSpeed.defaultProps = defaultProps;
export default LightSpeed;
