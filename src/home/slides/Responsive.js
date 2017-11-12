import React from 'react';
import withReveal from 'react-reveal/withReveal';
import Animation from 'react-reveal/Animation';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import bg from '../assets/2.jpg';

function Brand({ reveal }) {
  return (
    <Animation steps={Animation
      .step('title', 1500)
      //.step('jumbotronText', 1000)
      .step('jumbotron', 800)
      .step('button', 200)
      .step('111', 200)
    }>
      {reveal(
        <div id="bg">
          <div className="container jumbotron">
            <h1>Responsive</h1>
              <p className="lead1">
                Really responsive
              </p>
          </div>
          <Zoom step={'jumbotron'} duration={2000} delay={1000}>
            <div id="img">
              <img alt="" src={bg} />
            </div>
          </Zoom>
        </div>
      )}
    </Animation>
  );
}

export default withReveal(Brand, Fade, { right: true, duration: 1000 });
