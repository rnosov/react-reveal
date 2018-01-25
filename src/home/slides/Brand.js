import React from 'react';
import withReveal from 'react-reveal/withReveal';
import { Link } from 'react-router-dom';
//import Animation from 'react-reveal/Animation';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
//import Bounce from 'react-reveal/Bounce';
import bg from '../assets/comp.jpg';

function heading(first, second) {
  return (
    <h1 className="text-center">
      <Fade top cascade duration={1000} delay={1000}c>
        <div style={{display: 'inline-block'}}>
          {first}
        </div>
      </Fade>
      <span style={{whiteSpace:'pre'}}> </span>
      <Fade bottom cascade duration={1000} delay={1000}>
        <div style={{display: 'inline-block'}}>
          {second}
        </div>
      </Fade>
    </h1>
  );
}

function Brand({ reveal }) {
  return reveal(
        <div id="bg">
          <div className="container jumbotron">
            <div className="mx-4">
            {heading('React', 'Reveal')}
            <p className="lead"><a href="https://www.npmjs.com/package/react-reveal"> React Reveal</a> is an animation framework for your React App. It's MIT licensed, has a tiny footprint and written specifically for React in ES6. It can be used to create various cool reveal on scroll effects in your application.
            </p>
            <Link className="btn btn-primary" to="/docs/" role="button">See Docs</Link>            </div>
          </div>
          <Zoom duration={2000} delay={2000}>
            <div id="img">
              <img alt="" src={bg} />
            </div>
          </Zoom>
        </div>
  );
}

export default withReveal(Brand, Fade, { right: true, duration: 1000 });
