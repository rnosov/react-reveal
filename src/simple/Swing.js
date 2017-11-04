/*
 * Swing React Component
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
    duration: number,
    delay: number,
    count: number,
    forever: bool,
  };

const rule = `
  20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    transform: rotate3d(0, 0, 1, 0deg);
}
`;

function Swing({ out, duration = defaults.duration, delay = defaults.delay, count = defaults.count, forever, ...props } = defaults, context = false) {

  function factory(reverse) {

    function make() {
      return animation(rule);
    }

    return reverse ? false : { make, duration, delay, forever, count, style: { animationFillMode: 'both', } };
  }

  return context
    ? <RevealBase {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}


Swing.propTypes = propTypes;
export default Swing;
