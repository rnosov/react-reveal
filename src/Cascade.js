/*
 * Cascade React Component
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { node } from 'prop-types';

const
  propTypes = {
  	children: node.isRequired,
  },
  defaultProps = {
    
  };

function makeRule(api, rule) {
  api.newRule(rule);
  let waveDelay = api.props.duration/5,
  	  delaySum = api.props.delay-waveDelay;
   for (let i=1, max=React.Children.count(api.props.children)+1; i<max; i++, delaySum += waveDelay)
     api.newRule(`${rule}animation-delay: ${delaySum}ms;`, i);
}

function Cascade({ children }) {
	return React.cloneElement(React.Children.only(children), { cascade: makeRule });  
}

Cascade.propTypes = propTypes;
Cascade.defaultProps = defaultProps;
export default Cascade;