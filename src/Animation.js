/*
 * Animation Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { string, node, object, instanceOf } from 'prop-types';
import Stepper from './lib/Stepper';

const
  propTypes = {
    steps: instanceOf(Stepper).isRequired,
    children: node.isRequired,
    tag: string,
    props: object,
  },
  defaultProps = {

  },
  childContextTypes = {
    stepper: object,
  };

class Animation extends React.Component {

  constructor(props) {
    super(props);
    this.stepper = props.steps;
  }

  getChildContext() {
    return { stepper: this.stepper };
  }

  static step(...args) {
    return new Stepper().step(...args);
  }

  render() {
    return this.props.tag
      ? <this.props.tag {...this.props.props}>{this.props.children}</this.props.tag>
      : this.props.children;
  }

}

Animation.propTypes = propTypes;
Animation.defaultProps = defaultProps;
Animation.childContextTypes = childContextTypes;
export default Animation;
