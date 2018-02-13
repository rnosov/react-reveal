/*
 * RevealBase Component For react-reveal
 *
 * Copyright © Roman Nosov 2016, 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { string, object, number, bool, func, any, oneOfType, oneOf, instanceOf, shape, element } from 'prop-types';
import { namespace, ssr, disableSsr, globalHide, cascade, collapseend, is16 } from './lib/globals';
//import Step from './lib/Step';
import throttle from './lib/throttle';

const
  inOut = shape({
    make: func,
    duration: number.isRequired,
    delay: number.isRequired,
    forever: bool,
    count: number.isRequired,
    style: object.isRequired,
    reverse: bool,
  }),
  propTypes = {
    when: any,
    spy: any,
    collapse: oneOfType([bool, shape({ height: string })]),
    cascade: bool,
    wait: number,
//    step: oneOfType([instanceOf(Step), string]),
    force: bool,
    disabled: bool,
    skipInitial: bool,
    fraction: number,
    onReveal: func,
    children: element.isRequired,
    refProp: string,
    innerRef: func,
    in: inOut.isRequired,
    out: oneOfType([ inOut, oneOf([ false ]) ]).isRequired,
    //tag: string,
    //style: object,
    //className: string,
    //props: object,
  },
  defaultProps = {
    fraction: 0.2,
    when: true,
    refProp: 'ref',
  };
  //,
  //contextTypes = {
  //  stepper: object,
  //};

class RevealBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      style: {
        ...(props.collapse ? RevealBase.getInitialCollapseStyle(props): void 0),
        opacity: !props.when && props.out ? 0 : void 0,
      },
    };
    this.savedChild = false;
    this.isListener = false;
    //this.isShown = !!this.props.bypass;
    this.isShown = false;
    this.revealHandler = throttle(this.reveal.bind(this, false), 66);
    this.resizeHandler = throttle(this.resize.bind(this), 500);
    //this.invisible = debounce(this.invisible, 500);
    this.saveRef = this.saveRef.bind(this);
  }

  static getTop(el) {
    while (el.offsetTop === void 0)
      el = el.parentNode;
    let top = el.offsetTop;
    for (;el.offsetParent; top += el.offsetTop)
      el = el.offsetParent;
    return top;
  }

  saveRef(node) {
    this.el = node;
    if (this.childRef)
      this.childRef(node);
    if (this.props.innerRef)
      this.props.innerRef(node);
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
      this.unlisten();
      this.isShown = !!this.props.when;
      this.setState({ style: { opacity: this.props.when || !this.props.out ? 1 : 0 } });
      this.onReveal(this.props);
      //if (this.props.onReveal && this.props.when)
      //  this.props.wait ? this.onRevealTimeout = window.setTimeout(this.props.onReveal, this.props.wait) : this.props.onReveal();
    }
  }

  invisible() {
    if (!this || !this.el)
      return;
    this.savedChild = false;
    if (!this.isShown) {
      this.setState( { style: { ...this.state.style, visibility: 'hidden' }/*, collapsing: false */});
      if (this.props.collapse)
        window.document.dispatchEvent(collapseend);
    }
  }

  animationEnd(func, cascade, { forever, count, delay, duration }) {
    if (forever)
      return;
    //const el = this.finalEl || this.el;
    const handler = () => {
      if (!this || !this.el)
        return;
      this.animationEndTimeout = void 0;
      //el.removeEventListener('animationend', handler);
      func.call(this);
    };
    this.animationEndTimeout = window.setTimeout(handler, delay+(duration+(cascade?duration:0)*count));
    //el.addEventListener('animationend', handler);
    //this.animationEndEl = el;
    //this.animationEndHandler = handler;
  }

      //    //const delta = this.props.duration>>2,
      //    //      duration = delta,
      //    //      delay = this.props.delay + (this.props.when ? 0 : this.props.duration - delta)
  collapse(style, props, inOut) {
    if (props.collapse&&props.out) {
      const total = inOut.duration + (props.cascade ? inOut.duration : 0),
      //      delta = total>>2,
      //      duration = props.when ? delta : total - delta,
      //      delay = inOut.delay + (props.when ? 0 : delta),
            delta1 = total>>2,
            delta2 = delta1>>1,
            duration = delta1, // + (props.when ? 0 : delta2),
            delay = inOut.delay + (props.when ? 0 : total - delta1 - delta2),
            animationDuration = `${total - delta1 + (props.when ? delta2 : -delta2)}ms`,
            animationDelay = `${inOut.delay + (props.when ? delta1 - delta2 : 0)}ms`,
            height = props.when ? ( props.collapse !== true && 'height' in props.collapse ? props.collapse.height : ((this.dummyEl&&this.dummyEl.offsetHeight) || false)) : 0,
            padding = props.when ? ((this.dummyEl&&window.getComputedStyle(this.dummyEl, null).getPropertyValue('padding')) || false) : 0,
            border = props.when ? ((this.dummyEl&&window.getComputedStyle(this.dummyEl, null).getPropertyValue('border')) || false) : 0;
      if (height !== false)
        return {
            ...style,
            height, padding, border,
            transition: `height ${duration}ms ease ${delay}ms, padding ${duration}ms ease ${delay}ms, border ${duration}ms ease ${delay}ms`,
            animationDuration,
            animationDelay,
            //margin: 0, padding: 0, border: '1px solid transparent',
            boxSizing: 'border-box',
            //transition: `height ${duration}ms ease ${delay}ms`,
          //collapsing: true,
        };
    }
    return style;
  }

  animate(props) {
    if (!this || !this.el)
      return;
    this.unlisten();
    if (this.isShown === !!props.when)
      return;
    this.isShown = !!props.when;
    const leaving = !props.when && props.out,
          inOut = props[leaving ? 'out' : 'in'];
    //const inOut = props[props.when || !props.out ?'in':'out'];
    let animationName = (('style' in inOut) && inOut.style.animationName) || void 0;
    if ((props.out||props.when) && inOut.make)
        animationName = inOut.make();
    this.setState({
      style: this.collapse({
        ...inOut.style,
        animationDuration: `${inOut.duration}ms`,
        animationDelay: `${inOut.delay}ms`,
        animationIterationCount: inOut.forever ? 'infinite' : inOut.count,
        opacity: 1,
        //visibility: 'visible',
        animationName,
      }, props, inOut),
      className: inOut.className,
    });
    if (leaving) {
      this.savedChild = React.cloneElement(this.getChild());
      this.animationEnd( this.invisible, props.cascade, inOut);
    }
    else
      this.savedChild = false;
    this.onReveal(props);
  }

  onReveal(props) {
    if (props.onReveal && props.when) {
      if (this.onRevealTimeout)
        this.onRevealTimeout = window.clearTimeout(this.onRevealTimeout);
      props.wait ? this.onRevealTimeout = window.setTimeout(props.onReveal, props.wait) : props.onReveal();
    }
  }

  unlisten() {
    if (this.isListener) {
      window.removeEventListener('scroll', this.revealHandler);
      window.removeEventListener('orientationchange', this.revealHandler);
      window.document.removeEventListener('visibilitychange', this.revealHandler);
      window.document.removeEventListener('collapseend', this.revealHandler);
      window.removeEventListener('resize', this.resizeHandler);
      this.isListener = false;
    }
    if(this.onRevealTimeout)
      this.onRevealTimeout = window.clearTimeout(this.onRevealTimeout);
    if (this.animationEndTimeout)
      this.animationEndTimeout = window.clearTimeout(this.animationEndTimeout);
    //if (this.animationEndHandler)
    //   this.animationEndEl.removeEventListener('animationend', this.animationEndHandler);
  }

  componentWillUnmount() {
    this.unlisten();
    ssr && disableSsr();
  }

  listen() {
    if (!this.isListener) {
      this.isListener = true;
      window.addEventListener('scroll', this.revealHandler);
      window.addEventListener('orientationchange', this.revealHandler);
      window.document.addEventListener('visibilitychange', this.revealHandler);
      window.document.addEventListener('collapseend', this.revealHandler);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  reveal(props) {
    if (!this||!this.el) return;
    if (!props)
      props = this.props;
    if ( props.when && this.isShown && 'spy' in props ){
        this.isShown = false;
        this.setState({ style: {} });
        //window.setTimeout( () => this.animate.call(this, props), 200 );
        window.setTimeout( () => this.reveal(props), 200 );
    } else if ( this.inViewport() ) {
      //if (this.start) {
      //  this.hide();
      //  this.listen();
      //  this.start(this.step);
      //  return;
      //}
      this.animate(props);
    } else
      this.listen();
  }

  componentDidMount() {
    if (!this.el || this.props.disabled)
      return;
    if (this.props.skipInitial) {
      this.isShown = true;
      this.setState({ style: { opacity: 1 } });
      return;
    }
    if (this.props.force)
      return this.animate(this.props);
    //if (this.props.step) {
    //  if (this.props.step instanceof Step)
    //    this.props.step.push(this);
    //  else if (this.context.stepper)
    //    this.context.stepper.get(this.props.step).push(this);
    //}
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
    //if (newChildren.length === 1)
    //  return newChildren;
    let duration = this.props[this.props.when || !this.props.out ?'in':'out'].duration,
          count = newChildren.length,
          total = duration*2;
    if (this.props.collapse) {
      total = parseInt(this.state.style.animationDuration, 10);
      duration = total/2;
    }
    //total =  duration + ( this.props.cascade === true ? 1000 : this.props.cascade);
    //let i = reverse ? count : 0;
    let i = 0;
    newChildren = newChildren.map( child =>
      React.cloneElement(child,{
        style: {
          ...child.props.style,
          ...(this.props.collapse?{...this.state.style, boxSizing: void 0, height: void 0, border: void 0, padding: void 0, transition: void 0}:this.state.style),
          animationDuration: Math.round(cascade( /*reverse ? i-- : i++ */i++,0 , count, duration, total)) + 'ms',
        },
        //ref: i === count? (el => this.finalEl = el) : void 0,
      }));
    return newChildren;
  }

  static getInitialCollapseStyle(props) {
    return {
          visibility: props.when || !props.out ? 'visible' : 'hidden',
          height: 0,
          padding: 0,
          border: 0,
          boxSizing: 'border-box',
    };
  }

  componentWillReceiveProps (props) {
    if (props.disabled)
      return;
    //if (props.responsive && !props.when && this.props.when && props.collapse && !this.props.collapse) {
    if (props.collapse && !this.props.collapse) {
      this.setState({ style: RevealBase.getInitialCollapseStyle(props)});
      this.isShown = false;
      return;
    }
    if ( props.when && props.collapse === true && this.dummyEl && this.dummyEl.offsetHeight && this.state.style.height !== this.dummyEl.offsetHeight )
      this.setState({ style: { ...this.state.style, height: this.dummyEl.offsetHeight } });
    if ( (props.when !== this.props.when) || (props.spy !== this.props.spy))
      this.reveal(props);
    //(props.onReveal !== this.props.onReveal) &&
    if (this.onRevealTimeout&& !props.when)
        this.onRevealTimeout = window.clearTimeout(this.onRevealTimeout);
  }

  dummy(el, child) {
    if (this.props.collapse !== true && 'height' in this.props.collapse)
      return el;
    const arr = [
      el,
      <el.type
        {...el.props}
        {...{
          children: child.props.children,
          key: 2,
          //ref={ el => this.dummyEl = el }
          [this.props.refProp]: el => this.dummyEl = el,
          style: {
            ...el.props.style,
            position:'absolute',
            //left:'-9999em',
            top:'-9999em',
            //height: this.el  ? this.el.height  : void 0,
            height: 'auto',
            border: this.el  ? this.el.border  : void 0,
            padding: this.el ? this.el.padding : void 0,
            //display: 'block',
            animationName: 'none',
            animationDuration: '0s',
            transition: 'none',
            opacity: 0,
          }
        }}
      />
    ];
    return is16 ? arr : <span>{arr}</span> ;
  }

  getChild() {
    if (this.savedChild && !this.props.disabled)
      return this.savedChild;
    else if (React.Children.count(this.props.children) === 1) {
      if (typeof this.props.children === 'object') {
        const child = React.Children.only(this.props.children);
        return  (('type' in child) && typeof child.type === 'string') || this.props.refProp !== 'ref'
                ? child
                : <div>{child}</div>;
      }
      else
        return <div>{this.props.children}</div>;
    }
    else {
      console.warn('react-reveal expects a single child');
      return React.createElement('div', { children: this.props.children });
    }
  }

  render() {
    let child = this.getChild();
    //if (this.props.disabled)
    //  return child;
    if (typeof child.ref === 'function')
      this.childRef = child.ref;
    let
      newChildren = false,
      { style, className, children } = child.props;
      //style = { ...style, ...this.props.style };
      //className = this.props.className ? (className||'') + ' ' + this.props.className : className;
    let
      newClass = this.props.disabled ? className : `${ this.props.out ? namespace : '' }${ this.state.className ? ' ' + this.state.className : '' }${ className ? ' ' + className : '' }`||void 0,
      newStyle = this.props.disabled ? style : { ...style, ...this.state.style };
    if (this.props.cascade && !this.props.disabled && children && this.state.style.animationName) {
      newChildren = this.cascade(children);
      newStyle.animationName = void 0;
    }
    const props = { ...this.props.props, className: newClass,  style: newStyle, [this.props.refProp]: this.saveRef };
    if (this.props.collapse && !this.props.disabled)
      props.key = 1;
    const el = React.cloneElement(child, props, newChildren||children);
    return this.props.collapse && !this.props.disabled ? this.dummy(el, child) : el;
  }

}

RevealBase.propTypes = propTypes;
RevealBase.defaultProps = defaultProps;
//RevealBase.contextTypes = contextTypes;
export default RevealBase;
