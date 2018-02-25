/*
 * Spin React Component
 *
 * Copyright © Roman Nosov 2017
 * CSS Effect - Copyright (c) 2016 Daniel Eden
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
    transform: rotate(360deg);
    animation-timing-function: linear;
  }

to {
  transform: rotate(0deg);
}
`;

let name = false;
function make() {
  return name || (name = animation(rule));
}


function Spin({ children, out, timeout, duration = defaults.duration, delay = defaults.delay, count = defaults.count, forever, ...props } = defaults) {
  const effect = { make, duration: timeout === undefined ? duration : timeout, delay, forever, count, style: { animationFillMode: 'both', } };
  return wrap(props, effect, false, children, true);
}

Spin.propTypes = propTypes;
export default Spin;
