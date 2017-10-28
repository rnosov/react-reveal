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
import { namespace, ssr, disableSsr, globalHide, cascade, raf } from './lib/globals';
import Step from './lib/Step';
import debounce from './lib/debounce';

const
  propTypes = {
    when: oneOfType([bool, instanceOf(Step)]),
    spy: any,
    effect: string,
    collapse: string,
    duration: number,
    delay: number,
    count: number,
    forever: bool,
    tag: string,
    className: string,
    style: object,
    props: object,
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
    count: 1,
    fraction: 0.2,
    tag: 'div',
    when: true,
  };

class RevealBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      legacyMode: false,
      style: {
        //maxHeight: props.collapse?(this.props.when ? this.props.collapse : 0) : void 0,
        visibility: props.collapse ? (props.when || !props.out ? 'visible' : 'hidden') : void 0,
      },
    };
    this.isListener = false;
    this.isAnimated = false;
    this.revealHandler = debounce(this.reveal.bind(this, this.props), 66);
    this.resizeHandler = debounce(this.resize.bind(this), 500);
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
      this.setState({ style: { visibility: 'hidden' } });
  }

  resize() {
    if (!this||!this.el||!this.props.when) return;
    if ( !this.isAnimated && (this.props.force || this.inViewport()) ) {
      this.isAnimated = true;
      this.setState({ style: { visibility: this.props.when || !this.props.out ? 'visible' : 'hidden' } });
      if (this.props.onReveal && this.props.when)
        this.props.onReveal();
    }
  }

  //animationEnd(style) {
  //  if (this.props.forever)
  //    return;
  //  if (this.timeout)
  //    window.clearTimeout(this.timeout);
  //  this.timeout = window.setTimeout( () => {
  //    if (!this || !this.el)
  //      return;
  //    this.setState({ style });
  //  }, this.props.delay + this.props.count*
  //    (this.props.duration + (this.props.cascade? (this.props.cascade===true?1000:this.props.cascade) : 0))
  //  );
  //}

  animationEnd(style, forever) {
    if (forever)
      return;
    const handler = () => {
      if (!this || !this.el)
        return;
      this.el.removeEventListener('animationend', handler);
      this.setState({ style });
    };
    this.el.addEventListener('animationend', handler);
  }

  animate(props) {
    this.clean();
    if(props.effect)
      this.setState({ legacyMode: true });
    else {
      const inOut = props[props.when || !props.out ?'in':'out'],
            animationName = props.out||props.when ? inOut.animation || inOut.make() : void 0;

            //animation = props.out||props.when
            //?`${inOut.animation||inOut.make()} ${props.duration}ms ease ${props.delay}ms ${props.forever?'infinite':props.count} normal both`
            //: void 0
            //;
      if ( this.state.style.animationName === animationName )
        return;
      this.setState({ style: {
        animationName,
        animationDuration: `${props.duration}ms`,
        animationDelay: `${props.delay}ms`,
        animationIterationCount: props.forever?'infinite':props.count,
        animationFillMode: 'both',
        visibility: 'visible',
        ...inOut.style
      } });
      if (!props.out || (props.when&&'spy' in props))
        this.animationEnd({ animation: void 0, visibility: 'visible' }, props.forever);
      else if(!props.when)
        this.animationEnd({ visibility: 'hidden' }, props.forever);
        //this.animationEnd({ maxHeight: props.collapse? 0 : void 0, visibility: 'hidden' }, props.forever);
    }
    this.isAnimated = true;
    if (props.onReveal && props.when)
      props.onReveal();
  }

  clean() {
    if (this.isListener) {
      //const handler = this[this.isListener === -1?'concealHandler':'revealHandler'];
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

  listen(force) {
    if (!this.isListener && !force ) {
      this.isListener = true;
      window.addEventListener('scroll', this.revealHandler);
      window.addEventListener('orientationchange', this.revealHandler);
      window.document.addEventListener("visibilitychange", this.revealHandler);
      window.addEventListener('resize', this.resizeHandler);
    }
    //return this;
  }

  reveal(props) {
    if (!this||!this.el) return;
    if ( !this.isAnimated ) {
      if ( props.force || this.inViewport() ) {
        if (this.start) {
          this.hide();
          this.listen(props.force);
          this.start(this.step);
          return;
        }
        this.animate(props);
      }
      else
        this.listen(props.force);
    }
  }

  componentDidMount() {
    if (!this.el) return;
    if (this.props.when instanceof Step)
      this.props.when.push(this);
    else if (this.props.step) // todo: remove in 0.8.0
      this.props.step.push(this);
    if ( ssr && (this.props.out||this.props.effect) && RevealBase.getTop(this.el) < window.pageYOffset + window.innerHeight ) {
      this.setState({ style: { opacity: 0, transition: 'opacity 1000ms' } });
      window.setTimeout(this.reveal.bind(this), 1000);
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
          total =  this.props.duration + (typeof this.props.cascade === 'boolean' ? 1000 : this.props.cascade);
    //let i = reverse ? count : 0;
    let i = 0;
    newChildren = newChildren.map( child =>
      React.cloneElement(child,{
        style: {
          ...child.props.style,
          ...this.state.style,
          animationDuration: Math.round(cascade( /*reverse ? i-- : i++ */i++,0 ,count, this.props.duration, total)) + 'ms',
        },
        //ref: i === count? (el => this.finalEl = el) : void 0,
      }));
    return newChildren;
  }

  componentWillReceiveProps (props) {
    if (props.collapse && props.when && !this.state.emulation)
      this.setState({ emulation: 1 });
    if ( (props.when !== this.props.when ) || (props.spy !== this.props.spy)) {
      this.isAnimated = false;
      this.reveal(props);
    }
  }

  componentDidUpdate({ when, spy }, { emulation }) {
    if (this.state.emulation&&!emulation)
      window.setTimeout( () => raf( () =>
        this.setState({ emulation: 2 }, () => window.setTimeout( () =>
          raf( () => this.setState({ emulation: 0 }) ), 0)
        )
      ), 0);
  }

  collapse(style) {
    if (this.props.collapse&&this.props.out&&!this.state.style.transition)
      switch (this.state.emulation) {
        case 1:
          return {...style, top: '-1000px', left:'-1000px', position: 'absolute', visibility: 'hidden'};
        case 2:
          this.height = this.el.offsetHeight;
          return {...style, height: 0, visibility: 'hidden' };
        default:
          const delta = this.props.duration>>2,
                duration = this.props.when ? delta : this.props.duration - delta,
                delay = this.props.delay + (this.props.when ? 0 : delta);
          //const delta = this.props.duration>>2,
          //      duration = delta,
          //      delay = this.props.delay + (this.props.when ? 0 : this.props.duration - delta)
          return {...style,
            height: this.props.when ? ( this.height ? this.height : void 0 ) : 0,
            //display: this.props.when ? void 0 : 'none',
            transition: `height ${duration}ms ease ${delay}ms`,
          };
      }
    return style;
  }

  render() {
    //console.log('render:', this.state, this.props.when, this.cc++);
    const { tag: TagName, id, children, style, className } = this.props,
      newClass = `${ this.state.legacyMode ? this.props.effect : ( !this.props.out && !this.props.effect ? '' : namespace ) }${ className ? ' ' + className : '' }`||void 0;
    let newStyle, newChildren = false;
    if (!this.state.legacyMode) {
       newStyle = {...style, ...(this.state.emulation ? void 0 : this.state.style) };
       //newStyle = {...style, ...( this.state.emulation ? void 0 : this.state.style )};
      if (this.props.cascade && children && this.state.style.animationName /*&& !('collapse' in this.props)*/) {
        newChildren = this.cascade(children);
        //if (!this.props.when)console.log(newChildren);
        //if (!this.props.when&&newChildren)console.log(...newChildren.map( el => el.props.style.animationDuration));
        newStyle.animationName = void 0;
      }
    }
    return (
      <TagName
        id={id}
        {...(this.props.props||void 0)}
        className={newClass}
        style={this.state.legacyMode?style:this.collapse(newStyle)}//this.collapse(newStyle)}
        children={newChildren||children}
        ref={this.saveRef}
      />
    );
  }

}

RevealBase.propTypes = propTypes;
RevealBase.defaultProps = defaultProps;
export default RevealBase;
