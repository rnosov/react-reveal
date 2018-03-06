/*
 * HamburgerIcon Component Service For react-reveal
 *
 * Copyright © Roman Nosov 2017
 * SVG animation adapted from https://codepen.io/cwmanning/pen/zaCHB
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

function HamburgerIcon( toggle, animation, handleClick,
  { color = '#fff', size = 28, style,  ...props} = { color: '#fff', size: 28, style: { backgroundColor: '#808080' }} ) {
  const
    common = { opacity: 1, stroke: color, transition: 'transform 0.3s' },
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
      cursor: 'pointer',
      animationName: !toggle ? void 0 : animation(flip),
      animationDuration: !toggle ? void 0 : '900ms',
      animationFillMode: !toggle ? void 0 : 'forwards',
    },
    a = { ...common, transform: !toggle?void 0:'translate(0, 7px)' },
    b = { ...common, transform: !toggle?'rotate(0deg)':'translate(20px, -4px) rotate(90deg)' },
    c = { ...common, transform: !toggle?void 0:'translate(0, -7px)' };
    //viewBox="0 0 24 16"
  return (
    <div style={{ ...style, width: size, height: size }} {...props} onClick={handleClick}>
      <svg style={hamburger} width={size} height={size} id="hamburger" viewBox="-4 0 32 16">
        <line style={a} fill="none" stroke={color} strokeWidth="2" x1="0" y1="1" x2="24" y2="1" />
        <line style={b} fill="none" stroke={color} strokeWidth="2" x1="0" y1="8" x2="24" y2="8" />
        <line style={c} fill="none" stroke={color} strokeWidth="2" x1="0" y1="15" x2="24" y2="15" />
      </svg>
    </div>
  );
}

export default HamburgerIcon;
