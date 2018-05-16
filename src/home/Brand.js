import React from 'react';
//import withReveal from 'react-reveal/withReveal';
import { Link } from 'react-router-dom';
//import Animation from 'react-reveal/Animation';
//import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import './Brand.css';

//import Bounce from 'react-reveal/Bounce';
//import bg from '../assets/comp.jpg';

const bg = '/assets/black-cat4.jpg';
//const bg = '/assets/bgcat.jpg';
function heading(first, second) {
  return (
    <h1 className="text-center">
      <Zoom left cascade duration={1200} delay={300} ssrReveal>
        <div style={{display: 'inline-block'}}>
          {first}
        </div>
      </Zoom>
      <span style={{whiteSpace:'pre'}}> </span>
      <Zoom right cascade duration={1200} delay={300} ssrReveal>
        <div style={{display: 'inline-block'}}>
          {second}
        </div>
      </Zoom>
    </h1>
  );
}

function Brand() {
  return (
      <Slide right wait={6500} fraction={0}>
        <div id="brand-bg">
          <div className="container jumbotron">
            <div className="mx-4 text-white">
              {heading('React', 'Reveal')}
              <p className="lead text-justify">
                <a href="https://www.npmjs.com/package/react-reveal">React Reveal</a> is
                high performance animation library for React. It's MIT licensed, has a small footprint
                and written specifically for React in ES6. It can be used to create various cool reveal
                on scroll effects. Scroll down to see it in action.
              </p>
              <Link className="btn btn-primary mr-3" to="/examples/" role="button">Examples</Link>
              <Link className="btn btn-primary mr-3" to="/docs/" role="button">Documentation</Link>
            </div>
          </div>
          <Zoom duration={2000} delay={2000} ssrReveal>
            <div id="img">
                <img alt="" src={bg} />
            </div>
          </Zoom>
        </div>
      </Slide>
  );
}

export default Brand;
