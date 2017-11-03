/*
 * HamburgerSkin Component For react-reveal Carousel
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bool, node, func } from 'prop-types';
import { flex, animation } from './globals';

const
  propTypes = {
    match: bool,
    child: node,
    handleClick: func,
  },
  defaultProps = {

  };

function svg( toggle, size, color='#fff', bgColor='none') {
  // adapted from https://codepen.io/cwmanning/pen/zaCHB
  const
    common = { opacity: 1, stroke: color, transition: 'transform 0.3s'
  },
    flip = `
      15% {
        opacity: 0.8;
        transform: translateZ(0) scale(0.8) rotateZ(0);
      }
      30% {
        transform: translateZ(0) scale(0.8) rotateZ(0);
      }
      100% {
        opacity: 1;
        transform: translateZ(0) scale(1) rotateZ(405deg);
      }
    `,
    hamburger = {
      color: '#fff',
      cursor: 'pointer',
      animationName: !toggle?void 0:animation(flip),
      animationDuration: !toggle?void 0:'900ms',
      animationFillMode: !toggle?void 0:'forwards',
    },
    a = {...common,
      transform: !toggle?void 0:'translate(0, 7px)',

    },
    b = {...common,
      transform: !toggle?'rotate(0deg)':'translate(20px, -4px) rotate(90deg)',
    },
    c = {...common,
      transform: !toggle?void 0:'translate(0, -7px)',
    };
    //viewBox="0 0 24 16"
  return (
    <svg style={hamburger} width={size} height={size} id="hamburger" viewBox="-4 0 32 16">
      <line style={a} fill="none" stroke={color} strokeWidth="2" x1="0" y1="1" x2="24" y2="1" />
      <line style={b} fill="none" stroke={color} strokeWidth="2" x1="0" y1="8" x2="24" y2="8" />
      <line style={c} fill="none" stroke={color} strokeWidth="2" x1="0" y1="15" x2="24" y2="15" />
    </svg>
  );
}

function HamburgerSkin({ api: { toggle, child, match, handleClick, props } }) {
  //// style={{ display: 'flex', flexDirection: 'column' }}>
  child = React.cloneElement(child, { style : {
    ...child.props.style,
    display: flex,
    flexFlow: `${match ? 'row':'column'} nowrap`,
    MsFlexFlow: `${match ? 'row':'column'} nowrap`,
    border: '1px solid transparent',
  }});
  return match ? child : (
    <div>
      <div style={{
        textAlign: 'right',
        //verticalAlign: 'middle',
        height: props.size,
        paddingTop:'4px',
        paddingBottom:'4px',
        border: '1px solid transparent',
      }} >
        <div onClick={handleClick} style={{
          cursor: 'pointer',
          borderRadius: '5px',
          backgroundColor: props.bgColor,
          height: props.size-10,
          width: props.size-10,
          //transform: 'scale(1) translate(0, 10px)',
          display: 'inline-block',
        }}>
        {svg(toggle, props.size-10, props.color, props.bgColor)}
        </div>
      </div>
      <div onClick={handleClick}>
        {child}
      </div>
    </div>
  );
}
HamburgerSkin.propTypes = propTypes;
HamburgerSkin.defaultProps = defaultProps;
export default HamburgerSkin;
