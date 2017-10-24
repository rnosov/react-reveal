/*
 * Fade React Component
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bool } from 'prop-types';
import Reveal from './Reveal';
import { animation } from './lib/globals';

const
  propTypes = {
    left: bool,
    right: bool,
    top: bool,
    bottom: bool,
    big: bool,
    when: bool,
  },
  defaultProps = {
    when: true,
  };

function Fade({ left, right, up, down, top, bottom, big, ...props }) {
	const 
		dist = big ? '2000px' : '100%', 
		rule=`${props.when?'from':'to'} { opacity: 0;${left||right||up||down||top||bottom ? ` transform: translate3d(${left?`-${dist}`:(right?dist:'0')}, ${down||top?`-${dist}`:(up||bottom?dist:'0')}, 0);` : ''}}
          ${!props.when?'from':'to'} {opacity: 1;transform: none;} `;  
  return <Reveal {...props} reverse={left} animation={animation(rule)} />;  
}


Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;
export default Fade;