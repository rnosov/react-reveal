/*
 * RevealBase Component For react-reveal
 *
 * Copyright © Roman Nosov 2016, 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
import { string, object, number, bool, func, node, any, oneOfType } from 'prop-types';
import { namespace, ssr, disableSsr, globalHide } from './lib/globals';
import debounce from './lib/debounce';

const
  propTypes = {
    when: bool,
    spy: any,
    effect: string,
    collapse: string,
    duration: number,
    delay: number,
    tag: string,
    className: string,
    style: object,
    props: object,
    step: object,
    force: bool,
    fraction: number,
    onReveal: func,
    children: node.isRequired,
    in: object,
    out: oneOfType([object, bool]),
  },
  defaultProps = {
    duration: 1000,
    delay: 0,
    fraction: 0.2,
    tag: 'div',
    when: true,
  };

class RevealBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      legacyMode: false, 
      style: props.when || !props.out 
        ? {} 
        : (props.collapse?{maxHeight: 0,...RevealBase.getStyle(false)}:RevealBase.getStyle(false))
    };
    this.isListener = false;
    this.isAnimated = false;
    this.reveal = this.reveal.bind(this);
    this.revealHandler = debounce(this.reveal, 66);
    //this.concealHandler = debounce(this.conceal.bind(this), 66);
    this.resizeHandler = debounce(this.resize.bind(this), 500);
    this.saveRef = el => this.el = el;
  }

  static getStyle(visible) {
    return { visibility: visible?'visible':'hidden', opacity: visible ? 1 : 0 };
  }

  static getTop(el) {
    while (el.offsetTop === void 0)
      el = el.parentNode;
    let top = el.offsetTop;
    for (;el.offsetParent; top += el.offsetTop)
      el = el.offsetParent;
    return top;
  }

  inViewport() {
    if (!this.el || window.document.hidden) return false;
    const h = this.el.offsetHeight,
          delta = window.pageYOffset - RevealBase.getTop(this.el),
          tail = Math.min(h, window.innerHeight) * ( globalHide ? this.props.fraction : 0 );
    return ( delta > tail - window.innerHeight ) && ( delta < h - tail );
  }

  hide() {
    if (this.props.out)      
      this.setState(this.props.collapse
        ?{ style: {maxHeight: 0, transition: `max-height ${this.props.duration}ms`,...RevealBase.getStyle(false),  }}
        :{ style: RevealBase.getStyle(false) }); 
  }

  resize() {
    if (!this.el) return;
    if ( !this.isAnimated && (this.props.force || this.inViewport()) ) {
      this.isAnimated = true;
      this.setState({ style: RevealBase.getStyle(this.props.when) });
      if (this.props.onReveal && this.props.when)
        window.setTimeout(this.props.onReveal, this.props.delay + this.props.duration);
    }
  }

  log(i, start, end, duration, total) {
    const minv = Math.log(duration);
    const maxv = Math.log(total);
    const scale = (maxv-minv) / (end-start);
    return Math.exp(minv + scale*(i-start));
  }

  animate() {
    this.clean();
    if(this.props.effect)
      this.setState({ legacyMode: true });
    else {
      const inOut = this.props[this.props.when?'in':'out'];
      this.setState({ style: {
        //...RevealBase.getStyle(this.props.when),
        ...RevealBase.getStyle(true),
        //animationName: ( this.props.animation ? this.props.animation : void 0 ),
        animationName: inOut.animation||inOut.make(),
        animationFillMode: 'both',
        animationDuration: `${this.props.duration}ms`,
        animationDelay: `${this.props.delay}ms`,
        ...inOut.style,
      }});
    }
    this.isAnimated = true;
    if (this.props.onReveal && this.props.when)
      window.setTimeout(this.props.onReveal, this.props.delay + this.props.duration);
  }

  clean() {
    if (this.isListener) {
      window.removeEventListener('scroll', this.revealHandler);
      window.removeEventListener('orientationchange', this.revealHandler);
      window.document.removeEventListener('visibilitychange', this.revealHandler);
      window.removeEventListener('resize', this.resizeHandler);
      this.isListener = false;
    }
  }

  componentWillUnmount() {
    this.clean();
    ssr && disableSsr();
  }

  componentWillReceiveProps({ when, spy }) {
    if ( (when !== this.props.when) || (spy !== this.props.spy) ){
      this.setState({ style: {
        maxHeight:(this.props.collapse? 0 : void 0)
      } });
    }
  }

  componentDidUpdate({ when, spy }) {
    if ( (when !== this.props.when ) || (spy !== this.props.spy)) {
      this.isAnimated = false;
      this.props.when?this.reveal():this.conceal();
    }
  }

  listen() {
    if (!this.isListener && !this.props.force ) {
      window.addEventListener('scroll', this.revealHandler);
      window.addEventListener('orientationchange', this.revealHandler);
      window.document.addEventListener("visibilitychange", this.revealHandler);
      window.addEventListener('resize', this.resizeHandler);
      this.isListener = true;
    }
    return this;
  }

  reveal() {
    if (!this.props.when)
      return;
    if ( !this.isAnimated ) {
      this.listen();
      if ( this.props.force || this.inViewport() ) {
        if (this.start) {
          this.hide();
          this.start(this.step);
          return;
        }
        else
          this.animate();
      }
    }
  }

  conceal() {
    if ( !this.isAnimated && this.props.out ) {
      //this.listen(-1);
      if (this.inViewport())
        this.animate();
      else //this.setState({ style: RevealBase.getStyle(true)});
        this.hide();
    }
  }

  componentDidMount() {
    if (!this.el) return;
    if (this.props.step)
      this.props.step.push(this);
    if ( ssr && this.props.out && RevealBase.getTop(this.el) < window.pageYOffset + window.innerHeight ) {
      this.setState({ style: { ...RevealBase.getStyle(true), transition: 'opacity 1000ms' } });
      window.setTimeout(this.reveal, 1000);
    }
    else
      this.reveal();
  }

  //inOut() {
  //  const inOut = this.props[this.props.when?'in':'out'];
  //  if (this.props.effect || !inOut)
  //    return {};
  //  return inOut;
  //}

  render() {
    const { tag: TagName, id, children, style, className } = this.props,
      newClass = `${ this.state.legacyMode ? this.props.effect : ( !this.props.out ? '' : namespace ) }${ className ? ' ' + className : '' }`;
    let newStyle, newChildren= false;
    if (!this.state.legacyMode) {
       newStyle = {...style, ...this.state.style};
      let reverse = false;
      if (this.props.cascade && children && this.state.style.animationName) {
        if (typeof children === 'string') {
          newChildren = children.split("").map( (ch, index) => <span key={index} style={{display: 'inline-block', whiteSpace:'pre'}}>{ch}</span> );
          reverse = this.props.reverse;
        }
        else
          newChildren = React.Children.toArray(children);
        const count = newChildren.length - 1,
              total =  this.props.duration + (typeof this.props.cascade === 'boolean' ? 1000 : this.props.cascade);
        let i = reverse ? count : 0;
        newChildren = newChildren.map( child =>
          React.cloneElement(child,{style: {...child.props.style, ...this.state.style,
            animationDuration: Math.round(this.log( reverse ? i-- : i++ ,0 ,count, this.props.duration, total)) + 'ms',
          }}));
        newStyle.animationDuration = '0s';
        newStyle.animationName = 'none';
      }
    }
    return <TagName
        id={id}
        {...(this.props.props||void 0)}
        className={newClass}
        style={this.state.legacyMode?style:newStyle}
        children={newChildren||children}
        ref={this.saveRef}
    />;
  }

}

RevealBase.propTypes = propTypes;
RevealBase.defaultProps = defaultProps;
export default RevealBase;
