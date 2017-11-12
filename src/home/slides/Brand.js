import React from 'react';
import withReveal from 'react-reveal/withReveal';
import Animation from 'react-reveal/Animation';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import bg from '../assets/1.jpg';

function heading(first, second) {
  return (
    <h1 className="text-center">
      <Fade top cascade={1000} duration={500} delay={1000} step={'title'} >
        <div style={{display: 'inline-block'}}>
          {first}
        </div>
      </Fade>
      <span style={{whiteSpace:'pre'}}> </span>
      <Fade bottom cascade={1000} duration={500} delay={1000} step={'title'}>
        <div style={{display: 'inline-block'}}>
          {second}
        </div>
      </Fade>
    </h1>
  );
}

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
            {heading('React', 'Reveal')}
              <p className="lead1"><a href="https://www.npmjs.com/package/react-reveal"> React Reveal</a> is a dead simple way to add some cool reveal on scroll animations to your React app. It's less than 2kb gzipped and specifically written for React in ES6.
                It was used to create vairous animations that you see on this page.
                    Scroll down to see more. <a href="https://github.com/rnosov/react-reveal-demo">Source code of this demo</a>.
              </p>

              <Bounce left step={'button'}>
                <div>
                  <button onClick={ () => window.location.reload(false) } className="btn btn-primary btn-lg">Refresh Page</button>
                </div>
              </Bounce>
          </div>
          <Zoom step={'jumbotron'} duration={2000}>
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
