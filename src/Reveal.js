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
    duration: PropTypes.number,
    delay: PropTypes.number,
    easing: PropTypes.string,
    wave: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ]),
    tag: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    ssr: PropTypes.bool,
    fraction: PropTypes.number,
    onReveal: PropTypes.func,
  },
  defaultProps = {
    duration: 1000,
    easing: 'ease',
    delay: 66,
    fraction: 0.2,
    tag: 'div',
  };

class Reveal extends React.Component {

  revealTimeout = void 0;

  state = {
    isHidden: false,
    isMounted: false,
  };

  static getTop({ offsetTop, offsetParent }) {
    return offsetTop + (offsetParent && Reveal.getTop(offsetParent));
  }

  handleReveal = () => {
    this.revealTimeout = void 0;
    if (window.pageYOffset + window.innerHeight - this.refs.el.offsetHeight*this.props.fraction > Reveal.getTop(this.refs.el)) {
      this.setState({ isHidden: false });
      this.componentWillUnmount();
      if (typeof this.props.onReveal === 'function')
        this.props.onReveal();
    }
  };

  revealThrottler = () => {
    // ignore reveal events as long as an handleReveal execution is in the queue
    if (!this.revealTimeout)
      this.revealTimeout = window.setTimeout(this.handleReveal, this.props.delay);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.revealThrottler);
    window.removeEventListener('resize', this.revealThrottler, false);
  }

  componentDidMount() {
    if (this.props.ssr)
      if (window.pageYOffset + window.innerHeight > Reveal.getTop(this.refs.el))
      {
        this.setState({ isHidden: false, isMounted: false });
        return;
      }
    this.setState({ isHidden: true, isMounted: true });
    this.revealThrottler();
    window.addEventListener('scroll', this.revealThrottler);
    window.addEventListener('resize', this.revealThrottler, false);
  }

  static lorem() {
    let lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
    for (let i=0; i<4; i++)
      lorem += lorem;
    return <p>{lorem}</p>;
  }

  render() {
    const { transition, tag, children, wave, duration, delay, easing, effect, style,
            className, ssr, onReveal, fraction, ...props } = this.props;
    let TagName = tag, newStyle = {}, cls = className, isInline = !(typeof effect === 'string' || effect instanceof String);
    if (this.state.isHidden)
      newStyle = { opacity: 0, ...( isInline ? effect : {} ) };
    else if (this.state.isMounted)
    {
      if (isInline)
        newStyle = { opacity: 1,  transition: transition || `all ${duration}ms ${easing} 0s` };
      else
        cls = className ? className + ' ' + this.props.effect : this.props.effect;
    }
    if (wave && isInline) {
      let delaySum = 0, waveDelay = typeof wave === 'boolean' ? 200 :  wave;
      return (
        <TagName { ...props } style={style} className={className} ref="el">
          {React.Children.map(children, child => {
            if (newStyle.transition)
              newStyle.transition = `all ${duration}ms ${easing} ${delaySum += waveDelay}ms`;
            return React.cloneElement( child, {style: {...child.props.style, ...newStyle} });
          }
          )}
        </TagName>
      );
    }
    else return <TagName { ...props } children={ children || Reveal.lorem() } style={{ ...style, ...newStyle }} className={cls} ref="el" />;
  }

}

Reveal.propTypes = propTypes;
Reveal.defaultProps = defaultProps;
export default Reveal;
export let
  Fade = ({ left, right, up, down, big, ...props }) => {
    const dist = big?'2000px':'100%';
    return <Reveal {...props} effect={{ transform: `translate3d(${left?`-${dist}`:(right?dist:'0')}, ${down?`-${dist}`:(up?dist:'0')}, 0)` }} />;
  },
  Flip = ({ x, y, ...props }) => <Reveal {...props} effect={{ transform: `perspective(400px) rotate3d(${x?'1':'0'}, ${x?'0':'1'}, 0, ${x||y?'90deg':'-360deg'})` }} />,
  Rotate = ({ left, right, up, down, ...props }) => {
    let angle = '-200deg', origin = 'center';
    if ( down && left ) angle = '-45deg';
    if ( (down && right) || (up && left) ) angle = '45deg';
    if ( up && right ) angle = '-90deg';
    if ( left || right ) origin=(left?'left':'right')+' bottom';
    return <Reveal {...props} effect={{ transform: `rotate3d(0, 0, 1, ${angle})`, transformOrigin: origin }} />
  },
  Zoom = props => <Reveal {...props} effect={{ transform: 'scale3d(.3, .3, .3)' }} />
;
