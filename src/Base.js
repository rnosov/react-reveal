/*
 * Base Component For react-reveal
 *
 * Copyright © Roman Nosov 2016, 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
import { string, object, number, bool, func, node } from 'prop-types';
import { insertRule, deleteRule, newId, ruleMap, namespace, ssr, disableSsr, globalHide } from './lib/globals';
import debounce from './lib/debounce';

const
  propTypes = {
    effect: string,
    duration: number,
    delay: number,
    tag: string,
    className: string,
    style: object,
    reveal: func,
    step: object,
    force: bool,
    fraction: number,
    onReveal: func,
    children: node.isRequired,
  },
  defaultProps = {
    duration: 1000,
    delay: 0,    
    fraction: 0.2,
    tag: 'div',
  };

class Base extends React.Component {

  constructor(props) {
    super(props);
    this.state = { legacyMode: false };
    this.isListener = false;
    this.id = newId();
    ruleMap[this.id] = [];
    this.animate = this.animate.bind(this);
    this.scrollHandler = debounce(this.animate, 66);
    this.resizeHandler = debounce(this.show.bind(this, false), 500);
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

  newRule(rule, selector, n) {
    ruleMap[this.id].push(insertRule(
      `${this.props.tag}.${namespace}${this.id} ${selector?`${selector}:nth-child(${n}) `:''}{${rule}}`)
    );
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
  }

  cascade(rule) {
    return this.props.cascade ? this.props.cascade(this, rule) : this.newRule(rule);
  }

  animate() {
    if ( this.props.force || this.inViewport() ) {
      if (this.start) {
        this.hide();
        this.start(this.step);        
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
          animation-delay: ${this.props.delay}ms;
        `;
        this.cascade(rule);
        if (this.props.onReveal)
          this.props.onReveal();        
      }
    }
  }

  clean() {
    if (this.isListener) {
      window.removeEventListener('scroll', this.scrollHandler);
      window.removeEventListener('orientationchange', this.scrollHandler);
      window.removeEventListener('resize', this.resizeHandler);
      this.isListener = false;
    }
  }

  clearRules() {
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
      window.addEventListener('scroll', this.scrollHandler);
      window.addEventListener('orientationchange', this.scrollHandler);
      window.addEventListener('resize', this.resizeHandler);
      this.isListener = true;
    }
    this.animate();
  }

  componentDidMount() {
    if (!this.el) return;        
    if ( ssr && Base.getTop(this.el) < window.pageYOffset + window.innerHeight ) 
      return this.show(true);    
    if (this.props.reveal)
      this.props.step(this.reveal);
    if (this.props.step)
      this.props.step.push(this);
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
