/*
 * Spin React Component
 *
 * Copyright © Roman Nosov 2017
 * CSS Effect - Copyright (c) 2016 Daniel Eden
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bool } from 'prop-types';
import Reveal from '../Reveal';
import { animation } from '../lib/globals';

const
  propTypes = {
    out: bool,
  },
  defaultProps = {

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

function Spin({ out, ...props }, context) {

  function factory(reverse) {

    function make() {
      return animation(rule);
    }

    return reverse ? false : { make };
  }

  return context
    ? <Reveal {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}

Spin.propTypes = propTypes;
Spin.defaultProps = defaultProps;
export default Spin;
