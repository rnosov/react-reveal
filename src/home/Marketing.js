import React from 'react';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';
import cross from "./assets/food.jpg";
import resp from "./assets/keyboard.jpg";
import screen from "./assets/screen.jpg";
import './Marketing.css';

export default function Marketing() {
  return (
      <div className="container text-center">
        <div className="row">
          <Rotate bottom right duration={1200} delay={1500}>
            <div className="col-lg-4">
              <img alt="" className="rounded-circle" src={cross} width="140" height="140" />
              <h2>Cross Browser</h2>
              <ul className="list-group">
                <li className="list-group-item">Works in any modern desktop and mobile browser</li>
                <li className="list-group-item">Google Chrome</li>
                <li className="list-group-item">Mozilla Firefox</li>
                <li className="list-group-item">Apple Safari</li>
                <li className="list-group-item">Internet Explorer 10+</li>
              </ul>
            </div>
          </Rotate>
          <Fade bottom duration={1200} delay={750}>
            <div className="col-lg-4">
              <img alt="" className="rounded-circle" src={screen} width="140" height="140" />
              <h2>Open Source</h2>
              <ul className="list-group">
                <li className="list-group-item">MIT Licensed</li>
                <li className="list-group-item">React Reveal has a tiny footprint</li>
                <li className="list-group-item">specifically written for React in ES6.</li>
                <li className="list-group-item">Choose from a number of easy to remember reveal effects.</li>
              </ul>
            </div>
          </Fade>
          <Rotate bottom left duration={1200} delay={1500}>
            <div className="col-lg-4">
              <img alt="" className="rounded-circle" src={resp} width="140" height="140" />
              <h2>SEO Friendly</h2>
              <ul className="list-group">
                <li className="list-group-item">Makes sure that your content is visible to search engine spiders</li>
                <li className="list-group-item">Tested against GoogleBot</li>
                <li className="list-group-item">Server Side Rendering is supported and encourged</li>
              </ul>
            </div>
          </Rotate>
        </div>
      </div>
  );
}
