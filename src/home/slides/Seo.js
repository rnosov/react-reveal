import React from 'react';
import withReveal from 'react-reveal/withReveal';
import Fade from 'react-reveal/Fade';
import bg from '../assets/notebook.jpg';

function Responsive({ reveal }) {
  return reveal(
        <div id="bg">
          <div className="container jumbotron">
          <div className="mx-4">
            <h1 className="text-center">Open Source</h1>
            <ul>
              <li>MIT Licensed</li>
              <li>React Reveal has a tiny footprint</li>
              <li>specifically written for React in ES6.</li>
              <li>Choose from a number of easy to remember reveal effects.</li>
            </ul>
            </div>
          </div>
          <div id="img">
            <img alt="" src={bg} />
          </div>
        </div>
  );
}

export default withReveal(Responsive, Fade, { right: true, duration: 1000 });
