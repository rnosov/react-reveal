/*
 * Reveal React Component
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bool, string, number, object, oneOf, oneOfType } from 'prop-types';
import { defaults } from './lib/globals';
import RevealBase from './RevealBase';
import Fade from './in-and-out/Fade';

const
  propTypes = {
    in: object,
    out: oneOfType([object, oneOf([ false ]) ]),
    effect: string,
    effectOut: string,
    duration: number,
    delay: number,
    count: number,
    forever: bool,
    durationOut: number,
    delayOut: number,
    countOut: number,
    foreverOut: bool,
  },
  defaultProps = {
    ...defaults,
    durationOut: defaults.duration ,
    delayOut: defaults.delay,
    countOut: defaults.count,
    foreverOut: defaults.forever,
    in: Fade(defaults),
    out: Fade({ out: true, ...defaults }),
  };



function Reveal({ duration, delay, count, forever, durationOut, delayOut, countOut, foreverOut, effect, effectOut, in: inProp, out,  ...props}) {
  return (
    <RevealBase
      {...props}
      in={effect ? {duration, delay, count, forever, className: effect, style: {} } : inProp }
      out={effectOut ? {duration: durationOut, delay: delayOut, count: countOut, forever: foreverOut, className: effectOut, style: {} } : out }
    />
  );
}

Reveal.propTypes = propTypes;
Reveal.defaultProps = defaultProps;
export default Reveal;
