/*
 * HeadShake React Component
 *
 * Copyright © Roman Nosov 2017
 * Original CSS Effect - Copyright (c) 2016 Daniel Eden
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Reveal from '../Reveal';
import { animation } from '../lib/globals';

const
  propTypes = {

  },
  defaultProps = {

  };

const rule = `
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
}
`;

function HeadShake({ out, ...props }, context) {

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


HeadShake.propTypes = propTypes;
HeadShake.defaultProps = defaultProps;
export default HeadShake;
