/*
 * Flash React Component
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
from, 50%, to {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0;
}
`;

function Flash({ out, duration = defaults.duration, delay = defaults.delay, count = defaults.count, forever, ...props } = defaults, context = false) {

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

Flash.propTypes = propTypes;
export default Flash;
