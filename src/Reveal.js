/*
 * Reveal React Component
 *
 * Copyright © Roman Nosov 2016, 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';

const
  propTypes = {
    effect: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    ssr: PropTypes.bool,
    onReveal: PropTypes.func,
    children: PropTypes.node.isRequired,
  },
  defaultProps = {
    className: '',
    style: {},
    ssr: false,
  };

function getAbsoluteOffsetTop({ offsetTop, offsetParent }) {
  return offsetTop + (offsetParent && getAbsoluteOffsetTop(offsetParent));
}

class Reveal extends React.Component {

  state = {
    isHidden: false,
    isMounted: false,
  };

  handleScroll = () => {
    if (window.pageYOffset + window.innerHeight*0.85 > getAbsoluteOffsetTop(this.refs.el)) {
      this.setState({ isHidden: false });
      this.componentWillUnmount();
      if (typeof this.props.onReveal === 'function')
        this.props.onReveal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    if (!this.props.effect) return;
    if (window.pageYOffset + window.innerHeight > getAbsoluteOffsetTop(this.refs.el)) {
      if (!this.props.ssr) this.setState({ isHidden: false, isMounted: true });
      return;
    }
    this.setState({ isHidden: true, isMounted: true });
    window.setTimeout(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    const { effect, style, className, ssr, onReveal, ...props } = this.props;
    let animation = '', s = {};
    if (this.props.effect) {
      if (this.state.isHidden)
        s.visibility = 'hidden';
      else if (this.state.isMounted)
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
