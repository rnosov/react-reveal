/*
 * Pulse React Component
 *
 * Copyright © Roman Nosov 2017
 * Original CSS Effect - Copyright (c) 2016 Daniel Eden
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bool, number } from 'prop-types';
import wrap from '../lib/wrap';
import { animation, defaults } from '../lib/globals';

const
  propTypes = {
    duration: number,
    delay: number,
    count: number,
    forever: bool,
  };

const rule = `
	from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
}
`;

function Pulse({ children, out, duration = defaults.duration, delay = defaults.delay, count = defaults.count, forever, ...props } = defaults, context = false) {

  function factory(reverse) {

    function make() {
      return animation(rule);
    }

    return reverse ? false : { make, duration, delay, forever, count, style: { animationFillMode: 'both', } };
  }

  return context
    ? wrap(props, factory, children)
    : factory(out)
  ;
}

Pulse.propTypes = propTypes;
export default Pulse;
