/*
 * HamburgerSkin Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

function HamburgerSkin({ content, icon, isActive, handleClick, size, bgColor, flex, ie10 } ) {
  const
    containerStyle = {
      textAlign: 'right',
      height: size,
      paddingTop:'4px',
      paddingBottom:'4px',
      ...flex('row')
      //border: '1px solid transparent',
    },
    iconStyle= {
      cursor: 'pointer',
      borderRadius: '5px',
      backgroundColor: bgColor,
      height: size,
      width: size,
    }
  ;
  return isActive
    ? <div style={{marginLeft: 'auto', marginRight: 0,}}>
        <div style={containerStyle} >
          <div onClick={handleClick} style={iconStyle}>
            {icon()}
          </div>
        </div>
        <div style={{marginTop: '20px' }} onClick={handleClick}>
          {content()}
        </div>
      </div>
    : content({ style: flex('row') })
  ;
}

export default HamburgerSkin;
