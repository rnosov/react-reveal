/*
 * Reveal React Component
 *
 * Copyright © Roman Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React, { Component, PropTypes } from 'react';

const
  propTypes = {
    effect: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
  },
  defaultProps = {
    className: '',
    style: {},
  };

function getAbsoluteOffsetTop({ offsetTop, offsetParent }) {
  return offsetTop + (offsetParent && getAbsoluteOffsetTop(offsetParent));
}

class Reveal extends Component {

  state = {
    isHidden: false,
    isMounted: false,
  };

  handleScroll = () => {
    if (window.pageYOffset + window.innerHeight*0.85 > getAbsoluteOffsetTop(this.refs.el)) {
      this.setState({ isHidden: false });
      this.componentWillUnmount();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    if (!this.props.effect) return;
    if (window.pageYOffset + window.innerHeight > getAbsoluteOffsetTop(this.refs.el)) {
      // this.setState({ isHidden: false, isMounted: true });
      return;
    }
    this.setState({ isHidden: true, isMounted: true });
    window.setTimeout(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    const { effect, style, className, ...props } = this.props;
    let animation = '', s = {};
    if (this.props.effect) {
      if (this.state.isHidden)
        s.visibility = 'hidden';
      else// if (this.state.isMounted)
        animation = ( className ? ' ' : '' ) + this.props.effect;
    }
    return (
      <div { ...props } style={ { ...style, ...s } } className={ className + animation } ref="el" />
    );
  }

}

Reveal.propTypes = propTypes;
Reveal.defaultProps = defaultProps;
export default Reveal;
