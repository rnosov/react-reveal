/*
 * RubberBand React Component
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
    duration: number,
    timeout: number,
    delay: number,
    count: number,
    forever: bool,
  };

const rule = `
 from {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, .95, 1);
  }

  to {
    transform: scale3d(1, 1, 1);
}
`;

let name = false;
function make() {
  return name || (name = animation(rule));
}


function RubberBand({ children, out, timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, forever, ...props } = defaults) {
  const effect = { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
  return wrap(props, effect, false, children, true);
}

RubberBand.propTypes = propTypes;
export default RubberBand;
