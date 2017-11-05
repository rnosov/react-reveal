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
import { namespace, ssr, disableSsr, globalHide, cascade, collapseend } from './lib/globals';
import Step from './lib/Step';
import debounce from './lib/debounce';

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
    when: bool,
    spy: any,
    collapse: oneOfType([bool, shape({ height: string })]),
    wait: number,
    step: oneOfType([instanceOf(Step), string]),
    force: bool,
    disabled: bool,
    fraction: number,
    onReveal: func,
    children: element.isRequired,
    refProp: string,
    innerRef: func,
    in: inOut.isRequired,
    out: oneOfType([ inOut, oneOf([ false ]) ]).isRequired,
  },
  defaultProps = {
    fraction: 0.2,
    when: true,
    refProp: 'ref',
  },
  contextTypes = {
    stepper: object,
  };

class RevealBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      style: {
        ...(props.collapse
          ? {
            visibility: props.when || !props.out ? 'visible' : 'hidden',
            height: 0,
            //margin: 0, padding: 0, border: '1px solid transparent',
            boxSizing: 'border-box',
          }: void 0),
        opacity: !props.when && props.out ? 0 : void 0,
      },
    };
    this.isListener = false;
    //this.isShown = !!this.props.bypass;
    this.isShown = false;
    this.revealHandler = debounce(this.reveal.bind(this, false), 66);
    this.resizeHandler = debounce(this.resize.bind(this), 500);
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
    if (this && this.el && !this.isShown) {
      this.setState( { style: { ...this.state.style, visibility: 'hidden' }/*, collapsing: false */});
      if (this.props.collapse)
        window.document.dispatchEvent(collapseend)
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
    this.animationEndTimeout = window.setTimeout(handler, delay+(duration+(cascade?(cascade === true?1000:cascade):0)*count));
    //el.addEventListener('animationend', handler);
    //this.animationEndEl = el;
    //this.animationEndHandler = handler;
  }

      //    //const delta = this.props.duration>>2,
      //    //      duration = delta,
      //    //      delay = this.props.delay + (this.props.when ? 0 : this.props.duration - delta)
  collapse(style, props, inOut) {
    if (props.collapse&&props.out) {
      const total = inOut.duration + (props.cascade ? ( props.cascade === true ? 1000 : props.cascade) : 0),
            delta = total>>2,
            duration = props.when ? delta : total - delta,
            delay = inOut.delay + (props.when ? 0 : delta),
            height = props.when ? ( props.collapse !== true && 'height' in props.collapse ? props.collapse.height : ((this.dummyEl&&this.dummyEl.offsetHeight) || false)) : 0;
            //console.log(this.dummyEl.marginTop);
            //margin = props.when ? : 0;
      if (height !== false)
        return {
            ...style,
            height,
            //margin: 0, padding: 0, border: '1px solid transparent',
            boxSizing: 'border-box',
            transition: `height ${duration}ms ease ${delay}ms`,
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
    const inOut = props[props.when || !props.out ?'in':'out'];
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
        animationName,
      }, props, inOut),
      className: inOut.className,
  });
    if(!props.when && props.out)
      this.animationEnd( this.invisible, props.cascade, inOut);
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
      if(this.onRevealTimeout)
        this.onRevealTimeout = window.clearTimeout(this.onRevealTimeout);
      if (this.animationEndTimeout)
        this.animationEndTimeout = window.clearTimeout(this.animationEndTimeout);
      //if (this.animationEndHandler)
      //   this.animationEndEl.removeEventListener('animationend', this.animationEndHandler);

      this.isListener = false;
    }
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
      window.document.addEventListener("visibilitychange", this.revealHandler);
      window.document.addEventListener("collapseend", this.revealHandler);
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
    if (!this.el || this.props.disabled)
      return;
    if (this.props.force)
      return this.animate(this.props);
    if (this.props.step) {
      if (this.props.step instanceof Step)
        this.props.step.push(this);
      else if (this.context.stepper)
        this.context.stepper.get(this.props.step).push(this);
    }
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
    const duration = this.props[this.props.when || !this.props.out ?'in':'out'].duration,
          count = newChildren.length - 1,
          total =  duration + ( this.props.cascade === true ? 1000 : this.props.cascade);
    //let i = reverse ? count : 0;
    let i = 0;
    newChildren = newChildren.map( child =>
      React.cloneElement(child,{
        style: {
          ...child.props.style,
          ...this.state.style,
          animationDuration: Math.round(cascade( /*reverse ? i-- : i++ */i++,0 , count, duration, total)) + 'ms',
        },
        //ref: i === count? (el => this.finalEl = el) : void 0,
      }));
    return newChildren;
  }

  componentWillReceiveProps (props) {
    if (props.disabled)
      return;
    if ( (props.when !== this.props.when) || (props.spy !== this.props.spy))
      this.reveal(props);
    //(props.onReveal !== this.props.onReveal) &&
    if (this.onRevealTimeout&& !props.when)
        this.onRevealTimeout = window.clearTimeout(this.onRevealTimeout);
  }

  dummy(el, child) {
    if (this.props.collapse !== true && 'height' in this.props.collapse)
      return el;
    return (<span>{[
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
            left:'-9999em',
            top:'-9999em',
            height: 'auto',
            //display: 'block',
            animationName: 'none',
            animationDuration: '0s',
            transition: 'none',
            opacity: 0,
          }
        }}
      />
    ]}</span>);
  }

  render() {
    const child = React.Children.only(this.props.children);
    if (this.props.disabled)
      return child;
    if (typeof child.ref === 'function')
      this.childRef = child.ref;
    const
     { style, className, children } = child.props,
      newClass = `${ this.props.out ? namespace : '' }${ this.state.className ? ' ' + this.state.className : '' }${ className ? ' ' + className : '' }`||void 0;
    let newChildren = false, newStyle = {...style, ...this.state.style };
    if (this.props.cascade && children && this.state.style.animationName) {
      newChildren = this.cascade(children);
      newStyle.animationName = void 0;
    }
    const props = { className: newClass,  style: newStyle, [this.props.refProp]: this.saveRef };
    if (this.props.collapse)
      props.key = 1;
    const el = React.cloneElement(child, props, newChildren||children);
    return this.props.collapse ? this.dummy(el, child) : el;
  }

}

RevealBase.propTypes = propTypes;
RevealBase.defaultProps = defaultProps;
RevealBase.contextTypes = contextTypes;
export default RevealBase;
