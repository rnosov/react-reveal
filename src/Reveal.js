/*
 * Reveal React Component
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { bool, string, number, object, oneOf, oneOfType } from 'prop-types';
import { defaults } from './lib/globals';
import wrap from './lib/wrap';
import Fade from './in-and-out/Fade';

const
  propTypes = {
    in: object,
    out: oneOfType([object, oneOf([ false ]) ]),
    effect: string,
    effectOut: string,
    duration: number,
    timeout: number,
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
    inEffect: Fade(defaults),
    outEffect: Fade({ out: true, ...defaults }),
  };



function Reveal({ children, timeout, duration, delay, count, forever, durationOut, delayOut, countOut, foreverOut, effect, effectOut, inEffect, outEffect,  ...props}) {

  function factory(reverse) {
    return reverse
    ? effectOut ? { duration: durationOut, delay: delayOut, count: countOut, forever: foreverOut, className: effectOut, style: {} } : outEffect
    : effect ? { duration: timeout === undefined ? duration : timeout, delay, count, forever, className: effect, style: {} } : inEffect;
  }

  return wrap(props, factory(false), factory(true), children);
}

Reveal.propTypes = propTypes;
Reveal.defaultProps = defaultProps;
export default Reveal;
