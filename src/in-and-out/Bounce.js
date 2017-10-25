/*
 * Bounce React Component
 *
 * Copyright © Roman Nosov 2017 
 * CSS Effect - Copyright (c) 2016 Daniel Eden 
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bool } from 'prop-types';
import Reveal from '../Reveal';
import { animation } from '../lib/globals';

const
  propTypes = {
    out: bool,
    left: bool,
    right: bool,
    top: bool,
    bottom: bool,
    big: bool,
  },
  defaultProps = { 

  };

function Bounce({out, left, right, up, down, top, bottom, ...props}, context) {
  
  function factory(reverse) {
    
    function make() {
      let rule;
      if (left||right||up||down||top||bottom)         
        rule= reverse 
          ?`
            20% {
              ${props.collapse?`max-height:${props.collapse};`:''}
              transform: translate3d(${left||right ? (right?'-':'') + '20px' : 0 }, ${down||top||up||bottom? (up||bottom?'-':'') + '10px' : '0' }, 0);
              }
            ${ top||bottom||up||down              
              ?`40%, 45% {
                opacity: 1;
                transform: translate3d(0, ${down||top?'-':''}20px, 0);
              }`
              :''            
            }
              to {
                ${props.collapse?`max-height:0;`:''}
                opacity: 0;
                transform: translate3d(${left||right ? (left ? '-' :'' ) + '2000px':'0'}, ${down||top||up||bottom? (down||top?'-':'') +'2000px':'0'}, 0);
            }
          `
          :`from, 60%, 75%, 90%, to {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
          }
        
          from {
            ${props.collapse?`max-height:0;`:''}
            opacity: 0;
            transform: translate3d(${left||right? ((left?'-':'') + '3000px'):'0'}, ${down||top||up||bottom? ((down||top?'-':'') + '3000px'):'0'}, 0);
          }
        
          60% {
            opacity: 1;
            transform: translate3d(${left||right? ((right?'-':'') + '25px'):'0'}, ${down||top||up||bottom? ((up||bottom?'-':'') + '25px'):'0'}, 0);
          }
        
          75% {
            transform: translate3d(${left||right? ((left?'-':'') + '10px'):'0'}, ${down||top||up||bottom? ((down||top?'-':'') + '10px'):'0'}, 0);
          }
        
          90% {
            transform: translate3d(${left||right? ((right?'-':'') + '5px'):'0'}, ${down||top||up||bottom? ((up||bottom?'-':'') + '5px'):'0'}, 0);
          }
        
          to {
            ${props.collapse?`max-height:${props.collapse};`:''}
            transform: none;
          }`; 
      else 
        rule = reverse
          ? `20% {
              transform: scale3d(.9, .9, .9);
            }
          
            50%, 55% {
              ${props.collapse?`max-height:${props.collapse};`:''}
              opacity: 1;
              transform: scale3d(1.1, 1.1, 1.1);
            }
          
            to {
              ${props.collapse?`max-height:0;`:''}
              opacity: 0;
              transform: scale3d(.3, .3, .3);
          }`
          : `from, 20%, 40%, 60%, 80%, to {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
          }
        
          0% {
            ${props.collapse?`max-height:0;`:''}
            opacity: 0;
            transform: scale3d(.3, .3, .3);
          }
        
          20% {
            transform: scale3d(1.1, 1.1, 1.1);
          }
        
          40% {
            transform: scale3d(.9, .9, .9);
          }
        
          60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03);
          }
        
          80% {
            transform: scale3d(.97, .97, .97);
          }
        
          to {
            ${props.collapse?`max-height:${props.collapse};`:''}
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }`;
      return animation(rule);
    } 
    
    return { make }; 
  }
  
  return context
    ? <Reveal {...props} in={factory(false)} out={factory(true)} />
    : factory(out)
  ;
}

Bounce.propTypes = propTypes;
Bounce.defaultProps = defaultProps;
export default Bounce;