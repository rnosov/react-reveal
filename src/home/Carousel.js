	/*
 * Carousel Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import makeCarousel from 'react-reveal/makeCarousel';
import './Carousel.css';

function Carousel({ position, total, handleClick, children }) {
  return (
    <div className="carousel mb-4">
      <div className="carousel-children">
      	{children}
        <div onClick={handleClick} data-position={position - 1} className="carousel-arrow carousel-prev"> &lt; </div>
        <div onClick={handleClick} data-position={position + 1} className="carousel-arrow carousel-next"> &gt; </div>
      </div>
      <div className="carousel-dots">
        {Array(...Array(total)).map( (val, index) =>
        	<span className="carousel-dot" key={index} onClick={handleClick} data-position={index}>
        		{index === position ? '●' : '○' }
        	</span>
        )}
      </div>
    </div>
  );
}

export default makeCarousel(Carousel);

