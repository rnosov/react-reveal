/*
 * CarouselSkin Component For react-reveal Carousel
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

function CarouselSkin({ position, handleClick, total, prev, next }) {
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
        <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        }}>
          {prev}
        </div>
        <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        }}>
          {next}
        </div>
      </div>
      <div onClick={handleClick} data-position={position - 1} style={{
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
      <div onClick={handleClick} data-position={position + 1} style={{
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
        {Array(...Array(total)).map( (val, index) =>
          index === position
          ? <span style={{fontSize: '1.5em',cursor: 'pointer'}} key={index} onClick={handleClick} data-position={index}> &#9679; </span>
          : <span style={{fontSize: '1.5em',cursor: 'pointer'}} key={index} onClick={handleClick} data-position={index}> &#9675; </span>
        )}
      </div>
    </div>
  );
}

export default CarouselSkin;
