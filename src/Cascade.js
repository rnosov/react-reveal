/*
 * Cascade React Component
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { node, number, bool } from 'prop-types';

const
  propTypes = {
  	children: node.isRequired,
    duration: number,
    depth: number,
    grand: bool,
  },
  defaultProps = {
    depth: 1,
    duration: 1000,
  };


class Cascade extends React.Component {

  constructor(props) {
    super(props);
    this.makeRule = this.makeRule.bind(this);
  }

  log(i, start, end, duration, total) {
    const minv = Math.log(duration);
    const maxv = Math.log(total);    
    const scale = (maxv-minv) / (end-start);
    return Math.exp(minv + scale*(i-start));
  }

  getCount(children, depth = 1) {    
    const count = React.Children.count(children);
    if ((this.props.grand ? 2 : this.props.depth) === depth || !count)
      return count;    
    return this.getCount(React.Children.toArray(children)[0].props.children, depth + 1);
  }

  makeRule(api, rule) {
    api.newRule(`${rule}animation-duration: 0s;animation-delay: 0s;`);    
    const count = this.getCount(api.props.children) + 1,
      selector = new Array(this.props.grand ? 2 : this.props.depth).join(':first-child ') + '>*',
      total = api.props.duration + this.props.duration;
    for (let i=1; i<count; i++) {
      let duration = Math.round(this.log(i, 1, count - 1, api.props.duration, total));
      api.newRule(`${rule}animation-duration: ${duration}ms;`, selector, i);      
    }
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), { cascade: this.makeRule });  
  }

}

Cascade.propTypes = propTypes;
Cascade.defaultProps = defaultProps;
export default Cascade;