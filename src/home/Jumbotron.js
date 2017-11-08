/*
 * Jumbotron Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Roll from 'react-reveal/Roll';
import Bounce from 'react-reveal/Bounce';
import './Jumbotron.css';

function heading(first, second) {
  return (
    <h1 className="text-center">
      <Fade top cascade={1000} duration={500} step={'title'} >
        <div style={{display: 'inline-block'}}>
          {first}
        </div>
      </Fade>
      <span style={{whiteSpace:'pre'}}> </span>
      <Fade bottom cascade={1000} duration={500} step={'title'}>
        <div style={{display: 'inline-block'}}>
          {second}
        </div>
      </Fade>
    </h1>
  );
}

function Jumbotron() {
  return (
    <div id="bg" className="jumbotron">
      <div className="container">
        {heading('React', 'Reveal')}
        <Roll step={'jumbotronText'}>
          <p className="lead"><a href="https://www.npmjs.com/package/react-reveal"> React Reveal</a> is a dead simple way to add some cool reveal on scroll animations to your React app. It's less than 2kb gzipped and specifically written for React in ES6.
            It was used to create vairous animations that you see on this page.
                Scroll down to see more. <a href="https://github.com/rnosov/react-reveal-demo">Source code of this demo</a>.
          </p>
        </Roll>
          <Bounce left step={'button'}>
            <p><button onClick={ () => window.location.reload(false) } className="btn btn-primary btn-lg">Refresh Page</button></p>
          </Bounce>
      </div>
      <Zoom step={'jumbotron'} duration={2000}>
        <div id="img">
          <img alt="" src="https://source.unsplash.com/random/1280x400" />
        </div>
      </Zoom>
    </div>
  );
}

export default Jumbotron;
