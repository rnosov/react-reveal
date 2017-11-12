import React from 'react';
import Animation from 'react-reveal/Animation';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';
import imgData from "./assets/item.jpeg";
import './Marketing.css';
//const imgData = "https://source.unsplash.com/random/140x140";

export default function Marketing() {
  return (
    <Animation steps={Animation
      .step('centralItem', 800)
      .step('circle1', 300)
      .step('circle2', 300)
      .step('circle3', 600)
      .step('sideItems', 1500)
    }>
      <div className="container text-center">
        <div className="row">
          <div className="col-lg-4">
            <Zoom duration={800} step={'circle1'}><img alt="" className="rounded-circle" src={imgData} width="140" height="140" /></Zoom>
            <Fade left duration={1200} step={'sideItems'}><h2>Cross Browser</h2></Fade>
            <Rotate cascade bottom right duration={1200} step={'sideItems'}>
              <ul className="list-group">
                <li className="list-group-item">Works in any modern desktop and mobile browser</li>
                <li className="list-group-item">Google Chrome</li>
                <li className="list-group-item">Mozilla Firefox</li>
                <li className="list-group-item">Apple Safari</li>
                <li className="list-group-item">Internet Explorer 10+</li>
              </ul>
            </Rotate>
          </div>
          <div className="col-lg-4">
            <Zoom duration={800} step={'circle2'}><img alt="" className="rounded-circle" src={imgData} width="140" height="140" /></Zoom>
            <Flip duration={1200} step={'centralItem'}><h2>Small Size</h2></Flip>
              <Fade cascade bottom delay={300} duration={1200} step={'centralItem'}>
                <ul className="list-group">
                  <li className="list-group-item">React Reveal is less than 2kb gzipped</li>
                  <li className="list-group-item">specifically written for React in ES6.</li>
                  <li className="list-group-item">Morbi leo risus</li>
                  <li className="list-group-item">Porta ac consectetur ac</li>
                  <li className="list-group-item">Vestibulum at eros</li>
                  <li className="list-group-item">felis euismod semper</li>
                </ul>
              </Fade>
          </div>
          <div className="col-lg-4">
            <Zoom duration={800} step={'circle3'}><img alt="" className="rounded-circle" src={imgData} width="140" height="140" /></Zoom>
            <Fade right duration={1200} step={'sideItems'}><h2>Simple Syntax</h2></Fade>
            <Rotate cascade bottom left duration={1200} step={'sideItems'}>
              <ul className="list-group">
                <li className="list-group-item">Choose from a number of easy to remember reveal effects.</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </Rotate>
          </div>
        </div>
      </div>
    </Animation>
  );
}
