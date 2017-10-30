/*
 * RevealBase Component For react-reveal
 *
 * Copyright © Roman Nosov 2016, 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { string, object, number, bool, func, node, any, oneOfType, instanceOf } from 'prop-types';
import { namespace, ssr, disableSsr, globalHide, cascade } from './lib/globals';
import Step from './lib/Step';
import debounce from './lib/debounce';

const
  propTypes = {
    when: bool,
    spy: any,
    effect: string,
    collapse: oneOfType([bool, string]),
    duration: number,
    delay: number,
    count: number,
    forever: bool,
    tag: string,
    step: oneOfType([instanceOf(Step), string]),
    className: string,
    style: object,
    props: object,
    force: bool,
    bypass: bool,
    fraction: number,
    onReveal: func,
    children: node.isRequired,
    in: object,
    out: oneOfType([ object, bool ]),
  },
  defaultProps = {
    duration: 1000,
    delay: 0,
    count: 1,
    fraction: 0.2,
    tag: 'div',
    when: true,
  },
  contextTypes = {
    stepper: object,
  };

class RevealBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      legacyMode: false,
      style: {
        height: props.collapse ? 0 : void 0,
        visibility: props.collapse ? (props.when || !props.out ? 'visible' : 'hidden') : void 0,
        opacity: !props.when && props.out ? 0 : void 0,
      },
    };
    this.isListener = false;
    this.isShown = !!this.props.bypass;
    this.revealHandler = debounce(this.reveal.bind(this, false), 66);
    this.resizeHandler = debounce(this.resize.bind(this), 500);
    this.invisible = debounce(this.invisible, 500);
    this.saveRef = el => this.el = el;
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
      this.setState({ style: { opacity: 0 } });
  }

  resize() {
    if (!this||!this.el||!this.props.when)
      return;
    if ( this.inViewport() ) {
      this.clean();
      this.isShown = !!this.props.when;
      this.setState({ style: { opacity: this.props.when || !this.props.out ? 1 : 0 } });
      if (this.props.onReveal && this.props.when)
        this.props.onReveal();
    }
  }

  invisible() {
    if (this && !this.isShown)
      this.setState( { style: { ...this.state.style, visibility: 'hidden' } });
  }

  animationEnd(func, forever) {
    if (forever)
      return;
    const el = this.finalEl || this.el;
    const handler = () => {
      if (!this || !el)
        return;
      el.removeEventListener('animationend', handler);
      func.call(this);
    };
    el.addEventListener('animationend', handler);
  }

      //    //const delta = this.props.duration>>2,
      //    //      duration = delta,
      //    //      delay = this.props.delay + (this.props.when ? 0 : this.props.duration - delta)
  collapse(style, props) {
    if (props.collapse&&props.out) {
      const total = props.duration + (props.cascade ? ( props.cascade === true ? 1000 : props.cascade) : 0),
            delta = total>>2,
            duration = props.when ? delta : total - delta,
            delay = props.delay + (props.when ? 0 : delta);
      return {
        ...style,
        height: props.when ? ( props.collapse === true ? this.dummyEl.offsetHeight : props.collapse) : 0,
        transition: `height ${duration}ms ease ${delay}ms`,
      };
    }
    return style;
  }

  animate(props) {
    if (!this || !this.el)
      return;
    this.clean();
    if(props.effect)
      this.setState({ legacyMode: true });
    else {
      const inOut = props[props.when || !props.out ?'in':'out'],
            animationName = props.out||props.when ? inOut.animation || inOut.make() : void 0;
      if ( this.isShown === !!props.when )//&&!('spy' in props))
        return;
      this.isShown = !!props.when;
      this.setState({ style: this.collapse({
        animationName,
        animationDuration: `${props.duration}ms`,
        animationDelay: `${props.delay}ms`,
        animationIterationCount: props.forever ? 'infinite' : props.count,
        animationFillMode: 'both',
        opacity: 1,
        ...inOut.style
      }, props) });
      if(!props.when && props.out)
        this.animationEnd( this.invisible, props.forever);
    }
    if (props.onReveal && props.when)
      props.onReveal();
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

  listen() {
    if (!this.isListener) {
      this.isListener = true;
      window.addEventListener('scroll', this.revealHandler);
      window.addEventListener('orientationchange', this.revealHandler);
      window.document.addEventListener("visibilitychange", this.revealHandler);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  reveal(props) {
    if (!this||!this.el) return;
    if (!props)
      props = this.props;
    if ( this.inViewport() ) {
      if (this.start) {
        this.hide();
        this.listen();
        this.start(this.step);
        return;
      }
      if ( props.when && this.isShown && 'spy' in props ){
        this.isShown = false;
        this.setState({ style: {} });
        window.setTimeout( () => this.animate.call(this, props), 200 );
      }
      else
        this.animate(props);
    }
    else
      this.listen();
  }

  componentDidMount() {
    if (!this.el || this.props.bypass)
      return;
    if (this.props.force)
      return this.animate(this.props);
    if (this.props.step instanceof Step)
      this.props.step.push(this);
    else if (this.props.step && this.context.stepper)
      this.context.stepper.get(this.props.step).push(this);
    if ( ssr && (this.props.out||this.props.effect) && RevealBase.getTop(this.el) < window.pageYOffset + window.innerHeight ) {
      this.setState({ style: { opacity: 0, transition: 'opacity 1000ms' } });
      window.setTimeout(this.revealHandler, 1000);
    }
    else if(this.props.when)
      this.reveal(this.props);
  }

  cascade(children) {
    let newChildren;//, reverse = false;
    if (typeof children === 'string') {
          newChildren = children.split("").map( (ch, index) => <span key={index} style={{display: 'inline-block', whiteSpace:'pre'}}>{ch}</span> );
          //reverse = this.props.reverse;
        }
        else
          newChildren = React.Children.toArray(children);
    const count = newChildren.length - 1,
          total =  this.props.duration + ( this.props.cascade === true ? 1000 : this.props.cascade);
    //let i = reverse ? count : 0;
    let i = 0;
    newChildren = newChildren.map( child =>
      React.cloneElement(child,{
        style: {
          ...child.props.style,
          ...this.state.style,
          animationDuration: Math.round(cascade( /*reverse ? i-- : i++ */i++,0 ,count, this.props.duration, total)) + 'ms',
        },
        ref: i === count? (el => this.finalEl = el) : void 0,
      }));
    return newChildren;
  }

  componentWillReceiveProps (props) {
    if ( (props.when !== this.props.when) || (props.spy !== this.props.spy))
      this.reveal(props);
  }

  dummy(el) {
    if (this.props.collapse !== true)
      return el;
    const arr = [
      el,
      <el.type
        {...(this.props.props||void 0)}
        className={this.props.className}
        children={this.props.children}
        key={2}
        ref={ el => this.dummyEl = el }
        style={{
          ...this.props.style,
          position:'absolute',
          left:'-9999em',
          top:'-9999em',
          height: 'auto',
          display: 'block',
          animationName: 'none',
          animationDuration: '0s',
          transition: 'none',
          opacity: 0,
        }}
      />
    ];
    return <span>{arr}</span>;
    //return is16 ? arr : <span>{arr}</span>;
  }

  render() {
    const { tag, id, children, style, className } = this.props,
      newClass = `${ this.state.legacyMode ? this.props.effect : ( !this.props.out && !this.props.effect ? '' : namespace ) }${ className ? ' ' + className : '' }`||void 0;
    let newStyle, newChildren = false;
    if (!this.state.legacyMode) {
       newStyle = {...style, ...this.state.style };
      if (this.props.cascade && children && this.state.style.animationName) {
        newChildren = this.cascade(children);
        newStyle.animationName = void 0;
      }
    }
    const el = React.createElement(tag, {
      ...(this.props.props||void 0),
      id,
      className: newClass,
      style: this.state.legacyMode ? style : newStyle,
      key: this.props.collapse ? 1 : void 0,
      ref: this.saveRef
    }, newChildren||children);
    return this.props.collapse ? this.dummy(el) : el;
  }

}

RevealBase.propTypes = propTypes;
RevealBase.defaultProps = defaultProps;
RevealBase.contextTypes = contextTypes;
export default RevealBase;
