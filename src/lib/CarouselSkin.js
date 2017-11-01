/*
 * Skin Component For react-reveal Carousel
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { object, node} from 'prop-types';

const
  propTypes = {
    api: object,
    children: node,
  },
  defaultProps = {

  };

function Skin({ api, children }) {
  return (
    <div style={{
      position: 'relative',
      width: '500px',
      height: '250px',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'relative',
        height: '200px'
      }}>
        {children}
      </div>
      <div onClick={api.prev} style={{
        lineHeight: '250px',
        textAlign: 'center',
        position: 'absolute',
        left:0,
        top: 0,
        width: '10%',
        fontSize: '4em',
        cursor: 'pointer',
        userSelect: 'none',
        //-webkit-touch-callout: none; /* iOS Safari */
        //-webkit-user-select: none; /* Safari */
        // -khtml-user-select: none; /* Konqueror HTML */
        //   -moz-user-select: none; /* Firefox */
        //    -ms-user-select: none; /* Internet Explorer/Edge */
      }}> &lt; </div>
      <div onClick={api.next} style={{
        lineHeight: '250px',
        textAlign: 'center',
        position: 'absolute',
        left:'90%',
        top: 0,
        width: '10%',
        fontSize: '4em',
        cursor: 'pointer',
      }}> &gt; </div>
      <div style={{
        textAlign: 'center',
      }}>
        {Array(...Array(api.total)).map( (val, index) =>
          index === api.position
          ? <span style={{fontSize: '1.5em',cursor: 'pointer'}} key={index} onClick={api.handleClick} data-index={index}> &#9679; </span>
          : <span style={{fontSize: '1.5em',cursor: 'pointer'}} key={index} onClick={api.handleClick} data-index={index}> &#9675; </span>
        )}
      </div>
    </div>
  );
}
Skin.propTypes = propTypes;
Skin.defaultProps = defaultProps;
export default Skin;
