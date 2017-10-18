/*
 * Reveal React Component
 *
 * Copyright © Roman Nosov 2016, 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
import { string, object, number, bool, func, node } from 'prop-types';
import { insertRule, deleteRule, newId, ruleMap, namespace, ssr, disableSsr, globalHide } from './globals';

const
  propTypes = {
    effect: string,
    duration: number,
    delay: number,
    tag: string,
    className: string,
    style: object,
    reveal: func,
    step: func,
    force: bool,
    fraction: number,
    onReveal: func,
    throttle: number,
    children: node.isRequired,
  },
  defaultProps = {
    duration: 1000,
    delay: 0,
    throttle: 66,
    fraction: 0.2,
    tag: 'div',
  };

class Base extends React.Component {

  constructor(props) {
    super(props);
    this.state = { legacyMode: false };
    this.scrollTimeout = void 0;
    this.showTimeout = void 0;
    this.isListener = false;
    this.id = newId();
    ruleMap[this.id] = [];
    this.show = this.show.bind(this);
    this.animate = this.animate.bind(this);
    this.scrollThrottle = this.scrollThrottle.bind(this);
    this.resizeThrottle = this.resizeThrottle.bind(this);
    this.reveal = this.reveal.bind(this);
    this.saveRef = el => this.el = el;
  }

  static getTop({ offsetTop, offsetParent }) {
    return offsetTop + (offsetParent && Base.getTop(offsetParent));
  }

  inViewport() {
    if (!this.el) return false;
    const h = this.el.offsetHeight,
          delta = window.pageYOffset - Base.getTop(this.el),
          tail = Math.min(h,window.innerHeight)*(globalHide?this.props.fraction:0); 
    return ( delta > tail - window.innerHeight) && (delta < h-tail);
  }

  newRule(rule, cascade = 0) {
    ruleMap[this.id].push(insertRule(
      `${this.props.tag}.${namespace}${this.id} ${cascade?`> *:nth-child(${cascade}) `:''}{${rule}}`));
  }

  hide() {
    this.cascade('visibility: hidden; opacity: 0;');
  }

  show(force = false) {
    if (!this.el) return;
    if ( !this.isShown && (force || this.props.force || this.inViewport()) ) {
      this.isShown = true;
      this.cascade('visibility: visible; opacity: 1;');        
      if (this.props.onReveal)
       this.props.onReveal();        
    }
    this.showTimeout = void 0;
  }

  delay() {
    return this.props.delay;//>this.props.throttle? this.props.delay - this.props.throttle : 0;
  }

  cascade(rule) {
    return this.props.cascade ? this.props.cascade(this, rule) : this.newRule(rule);
  }

  animate() {
    if ( this.props.force || this.inViewport() ) {
      if (this.start) {
        this.hide();
        this.start(this.id);        
        return;
      }
      this.clean();      
      if(!this.props.animation)
        this.setState({ legacyMode: true });
      else {
        const rule = `
          visibility: visible;
          opacity: 1;
          animation-duration: ${this.props.duration}ms;
          animation-fill-mode: both;
          animation-name: ${this.props.animation()};
          animation-delay: ${this.delay()}ms;
        `;
        this.cascade(rule);
        if (this.props.onReveal)
          this.props.onReveal();        
      }
    }
    this.scrollTimeout = void 0;
  }

  scrollThrottle() {
    // ignore scroll events as long as an reveal execution is in the queue
    if (!this.scrollTimeout)
      this.scrollTimeout = window.setTimeout(this.animate, this.props.throttle);
  }

  resizeThrottle() {
    // ignore resize events as long as an show execution is in the queue
    if (!this.resizeTimeout)
      this.resizeTimeout = window.setTimeout(this.show, this.props.throttle);
  }

  clean() {
    if (this.isListener) {
      window.clearTimeout(this.scrollTimeout);
      window.clearTimeout(this.resizeTimeout);
      window.removeEventListener('scroll', this.scrollThrottle);
      window.removeEventListener('orientationchange', this.scrollThrottle);
      window.removeEventListener('resize', this.resizeThrottle);
      this.isListener = false;
    }
  }

  clearRules() {
    // this will hurt your brain :(
    const total = ruleMap[this.id].length;
    for (let i=0; i<total; i++){
      let ruleId = ruleMap[this.id][i];
      deleteRule(ruleId);
      delete ruleMap[this.id][i];
      for( const key in ruleMap )
        if (ruleMap.hasOwnProperty(key))
          for (let j=0, len=ruleMap[key].length;j<len;j++)
             if(ruleMap[key][j] > ruleId)
              --ruleMap[key][j];
    }
    delete ruleMap[this.id];
  }

  componentWillUnmount() {
    this.clean();
    this.clearRules();
    ssr && disableSsr();
  }

  reveal() {
    if (!this.props.force && !this.isListener) {
      window.addEventListener('scroll', this.scrollThrottle);
      window.addEventListener('orientationchange', this.scrollThrottle);
      window.addEventListener('resize', this.resizeThrottle);
      this.isListener = true;
    }
    this.animate();
  }

  componentDidMount() {
    if (!this.el) return;        
    if ( ssr && Base.getTop(this.el) < window.pageYOffset + window.innerHeight ) 
      return this.show(true);    
    if (this.props.step)
      this.props.step(this);
    if (this.props.reveal)
      this.props.step(this.reveal);
    this.reveal();    
  }

  render() {
    const { id, tag: TagName, children, style, className } = this.props,
      cls = `${ this.state.legacyMode ? this.props.effect : namespace + ' ' +namespace + this.id }${ className ? ' ' + className : '' }`;
    return <TagName id={id} className={cls} style={style} ref={this.saveRef} children={children} />;
  }

}

Base.propTypes = propTypes;
Base.defaultProps = defaultProps;
export default Base;
