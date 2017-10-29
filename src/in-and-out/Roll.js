/*
 * Roll React Component
 *
 * Copyright © Roman Nosov 2017
 * CSS effect originally authored by Nick Pettit - https://github.com/nickpettit/glide
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
    top: bool,
    bottom: bool,
    big: bool,
    opposite: bool,
  },
  defaultProps = {

  };

function Roll({ out, left, right, up, down, top, bottom, big, opposite, ...props }, context) {

  function factory(reverse) {

    function make() {
      const dist = big ? '2000px' : '100%', change = opposite && reverse,
        x = left ? (change ? '':'-') + dist : ( right ? (change ? '-':'') + dist : '0' ),
        y = down || top ? (change ? '':'-') + dist : ( up || bottom ? (change ? '-':'') + dist : '0' ) ;
      return animation(`
      	${!reverse?'from':'to'} {opacity: 0;transform: translate3d(${x}, ${y}, 0) rotate3d(0, 0, 1, -120deg);}
				${reverse?'from':'to'} {opacity: 1;transform: none}
			`);
    }

    return { make };
  }

  return context
    ? <Reveal {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}

Roll.propTypes = propTypes;
Roll.defaultProps = defaultProps;
export default Roll;
