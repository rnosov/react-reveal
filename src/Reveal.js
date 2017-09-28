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
    effect: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
    transition: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    ssr: PropTypes.bool,
    fraction: PropTypes.number,
    throttleTimeout: PropTypes.number,
    onReveal: PropTypes.func,
  },
  defaultProps = {
    transition: 'all 1s ease 0s',
    fraction: 0.2,
    throttleTimeout: 66,
    ssr: false,
  };

class Reveal extends React.Component {

  revealTimeout = void 0;

  state = {
    isHidden: false,
    isMounted: false,
  };

  static getAbsoluteOffsetTop({ offsetTop, offsetParent }) {
    return offsetTop + (offsetParent && Reveal.getAbsoluteOffsetTop(offsetParent));
  }

  handleReveal = () => {
    this.revealTimeout = void 0;
    if (window.pageYOffset + window.innerHeight - this.refs.el.offsetHeight*this.props.fraction > Reveal.getAbsoluteOffsetTop(this.refs.el)) {
      this.setState({ isHidden: false });
      this.componentWillUnmount();
      if (typeof this.props.onReveal === 'function')
        this.props.onReveal();
    }
  };

  revealThrottler = () => {
    // ignore reveal events as long as an handleReveal execution is in the queue
    if (!this.revealTimeout)
      this.revealTimeout = window.setTimeout(this.handleReveal, this.props.throttleTimeout);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.revealThrottler);
    window.removeEventListener('resize', this.revealThrottler, false);
  }

  componentDidMount() {
    if (this.props.ssr)
      if (window.pageYOffset + window.innerHeight > Reveal.getAbsoluteOffsetTop(this.refs.el))
      {
        this.setState({ isHidden: false, isMounted: false });
        return;
      }
    this.setState({ isHidden: true, isMounted: true });
    this.revealThrottler();
    window.addEventListener('scroll', this.revealThrottler);
    window.addEventListener('resize', this.revealThrottler, false);
  }

  render() {
    const { transition, effect, style, className, ssr, onReveal, fraction, throttleTimeout, ...props } = this.props;
    if (!props.children) {
      let lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
      for (let i=0; i<4; i++)
        lorem += lorem;
      props.children = <p>{lorem}</p>;
    }
    let s = {}, cls = className, isInline = !(typeof effect === 'string' || effect instanceof String);
    let o = isInline ? effect : {};
    if (this.state.isHidden)
      s = { opacity: 0, ...o };
    else if (this.state.isMounted)
    {
      if (isInline)
        s = { opacity: 1, transition };
      else
        cls = className ? className + ' ' + this.props.effect : this.props.effect;
    }
    return (
      <div { ...props } style={{ ...style, ...s }} className={cls} ref="el" />
    );
  }

}

Reveal.propTypes = propTypes;
Reveal.defaultProps = defaultProps;
export default Reveal;
export let
  Fade = () => <Reveal />,
  SlideDown = () => <Reveal effect={{ transform: 'translate3d(0, -100%, 0)' }} />,
  SlideDownBig = () => <Reveal effect={{ transform: 'translate3d(0, -2000px, 0)' }} />,
  SlideLeft = () => <Reveal effect={{ transform: 'translate3d(-100%, 0, 0)' }} />,
  SlideRight = () => <Reveal effect={{ transform: 'translate3d(100%, 0, 0)' }} />,
  SlideRightBig  = () => <Reveal effect={{ transform: 'translate3d(2000px, 0, 0)' }} />,
  SlideUp = () => <Reveal effect={{ transform: 'translate3d(0, 100%, 0)' }} />,
  SlideUpBig = () => <Reveal effect={{ transform: 'translate3d(0, 2000px, 0)' }} />,
  Flip = () => <Reveal effect={{ transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)' }} />,
  FlipY = () => <Reveal effect={{ transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)' }} />,
  FlipX = () => <Reveal effect={{ transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)' }} />,
  Rotate = () => <Reveal effect={{ transform: 'rotate(-200deg)' }} />,
  RotateDownLeft = () => <Reveal effect={{ transform: 'rotate3d(0, 0, 1, -45deg)', transformOrigin: 'left bottom' }} />,
  RotateDownRight = () => <Reveal effect={{ transform: 'rotate3d(0, 0, 1, 45deg)', transformOrigin: 'right bottom' }} />,
  RotateUpLeft = () => <Reveal effect={{ transform: 'rotate3d(0, 0, 1, 45deg)', transformOrigin: 'left bottom' }} />,
  RotateUpRight = () => <Reveal effect={{ transform: 'rotate3d(0, 0, 1, -90deg)', transformOrigin: 'right bottom' }} />,
  Zoom = () => <Reveal effect={{ transform: 'scale3d(.3, .3, .3)' }} />
;
