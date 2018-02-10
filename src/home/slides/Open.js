import React from 'react';
import withReveal from 'react-reveal/withReveal';
import Fade from 'react-reveal/Fade';
//import bg from '../assets/keyboard1.jpg';

const bg = '/assets/keyboard1.jpg';
function Open({ reveal }) {
 return reveal(
        <div id="bg">
          <div className="container jumbotron">
          <div className="mx-4">
            <h1 className="text-center">SEO Friendly</h1>
            <ul>
              <li>Makes sure that your content is visible to search engine spiders</li>
              <li>Tested against GoogleBot</li>
              <li>Server Side Rendering is supported and encourged</li>
            </ul>
            </div>
          </div>
          <div id="img">
            <img alt="" src={bg} />
          </div>
        </div>
      );
}

export default withReveal(Open, Fade, { right: true, duration: 1000 });
