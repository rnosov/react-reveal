/*
 * Reveal React Component
 *
 * Copyright © Roman Nosov 2016, 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
import { string, object, number, oneOfType, bool, func, node } from 'prop-types';

const
  propTypes = {
    effect: oneOfType([ string, object ]),
    duration: number,
    delay: number,
    easing: string,
    wave: oneOfType([ bool, number ]),
    tag: string,
    className: string,
    style: object,
    preventReveal: bool,
    //when: bool,
    passProps: bool,
    ssr: bool,
    fraction: number,
    onReveal: func,
    children: node.isRequired,
  },
  defaultProps = {
    duration: 1000,
    easing: 'ease',
    delay: 66,
    fraction: 0.2,
    tag: 'div',
    //when: true,
    passProps: true
  };

class Reveal extends React.Component {

  constructor(props) {
    super(props);
    this.timeout = void 0;
    this.state = { stage: 0 }; //0 - nothing added, 1 - hidden, 2 - revealed
    this.reveal = this.reveal.bind(this);
    this.throttler = this.throttler.bind(this);
    this.saveRef = el => this.el = el;
  }

  static getTop({ offsetTop, offsetParent }) {
    return offsetTop + (offsetParent && Reveal.getTop(offsetParent));
  }

  reveal() {
    this.timeout = void 0;
    if (this.props.preventReveal/* || !this.props.when*/) return;
    const h = Math.min(this.el.offsetHeight,window.innerHeight)*this.props.fraction;
    if (window.pageYOffset + window.innerHeight - h > Reveal.getTop(this.el)) {
      this.setState({ stage: 2 });
      this.componentWillUnmount();
      if (this.props.onReveal)
        this.props.onReveal();
    }
  }

  throttler() {
    // ignore reveal events as long as an reveal execution is in the queue
    if (!this.timeout)
      this.timeout = window.setTimeout(this.reveal, this.props.delay);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttler);
    window.removeEventListener('resize', this.throttler, false);
    window.clearTimeout(this.timeout);
  }

  componentWillReceiveProps(next) {
    if ((!next.preventReveal && this.props.preventReveal)
      /*||(!this.props.when && next.when)*/)
      this.throttler();
  }

  componentDidMount() {
    if (this.props.ssr && (window.pageYOffset + window.innerHeight > Reveal.getTop(this.el)))
        return;
    this.setState({ stage: 1 });
    window.addEventListener('scroll', this.throttler);
    window.addEventListener('resize', this.throttler, false);
    this.throttler();
  }

  render() {
    const {
      props: { tag, children, wave, duration, delay, easing, effect, style,/* when,*/ className,
               onReveal, fraction, preventReveal, passProps, transition, ssr, ...props },
      state: { stage }
    } = this;
    let TagName = tag, newStyle = {}, cls = className, isInline = !(typeof effect === 'string' || effect instanceof String);
    switch (stage) {
      case 1:
        newStyle = { visibility: 'hidden', opacity: 0, ...( isInline ? effect : {} ) }; break;
      case 2:
        if (isInline)
          newStyle = { opacity: 1,  transition: transition || `all ${duration}ms ${easing} 0s` };
        else
          cls = cls ? `${cls} ${effect}` : effect;
      break;default:
    }
    if (wave && isInline) {
      let waveDelay = typeof wave === 'boolean' ? 200 : wave, delaySum = -waveDelay;
      return (
        <TagName {...( passProps ? props : {} )} style={style} className={className} ref={this.saveRef}>
          {React.Children.map(children, child => {
            if ( typeof child !== 'object' || !child ) return child;
            if ( stage === 2 )
              newStyle.transition = `all ${duration}ms ${easing} ${delaySum += waveDelay}ms`;
            return React.cloneElement( child, {style: {...child.props.style, ...newStyle} });
          })}
        </TagName>
      );
    }
    return <TagName {...( passProps ? props : {} )} children={children} style={{ ...style, ...newStyle }} className={cls} ref={this.saveRef} />;
  }

}

Reveal.propTypes = propTypes;
Reveal.defaultProps = defaultProps;
export default Reveal;
export let
  Fade = ({ left, right, up, down, top, bottom, big, ...props }) => {
    const dist = big ? '2000px' : '100%';
    return <Reveal passProps={false} {...props} effect={left||right||up||down||top||bottom?{ transform: `translate3d(${left?`-${dist}`:(right?dist:'0')}, ${down||top?`-${dist}`:(up||bottom?dist:'0')}, 0)` }:void 0} />;
  },
  Flip = ({ x, y, ...props }) => <Reveal passProps={false} {...props} effect={{ transform: `perspective(400px) rotate3d(${x?'1':'0'}, ${x?'0':'1'}, 0, ${x||y?'90deg':'-360deg'})` }} />,
  Rotate = ({ left, right, up, down, top, bottom, ...props }) => {
    let angle = '-200deg', origin = 'center';
    if ( (down||top) && left ) angle = '-45deg';
    if ( ((down||top) && right) || ((up||bottom) && left) ) angle = '45deg';
    if ( (up||bottom) && right ) angle = '-90deg';
    if ( left || right ) origin=( left ? 'left' : 'right' ) + ' bottom';
    return <Reveal passProps={false} {...props} effect={{ transform: `rotate3d(0, 0, 1, ${angle})`, transformOrigin: origin }} />
  },
  Zoom = props => <Reveal passProps={false} {...props} effect={{ transform: 'scale3d(.3, .3, .3)' }} />
;
