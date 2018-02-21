import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';
//import Marketing from'./Marketing';
import Carousel from'./Carousel';
import Brand from'./Brand';
import './Home.css';

import withReveal from 'react-reveal/withReveal';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';
import Roll from 'react-reveal/Roll';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import LightSpeed from 'react-reveal/LightSpeed';

//import cat from './striped-cat-small.jpg';
const cat = '/assets/striped-cat-small.jpg';

function makeSlide(name, pic, arr) {
  const El = withReveal( ({ reveal }) => reveal(
    <div id="bg" style={{ backgroundImage: `url(${pic})` }}>
      <div className="container jumbotron">
        <div className="mx-4 text-center">
          <div className="mt-1" style={{ opacity: 0.8, backgroundColor:'#ccc', padding:'0.5rem' }}>
          <h1 className="mb-3">{name} Effect</h1>
          {arr.map( (item, id) =>
            <item.type delay={800+(id*300)} key={id} {...item.props}>
              <h2 className="mt-2">React Reveal</h2>
            </item.type>
          )}
          </div>
          <Link className="btn btn-primary mt-4" to={`/examples/common/${name}/`} role="button">See Detailed Example</Link>
        </div>
      </div>
    </div>
  ) , Slide, { right: true });
  return <El key={name} />;
}

let conf, slides, preloads = {};
function preload(src) {
  if (src in preloads)
    return;
  preloads[src] = new Image();
  preloads[src].src = src;
}

function Home() {
  if (!conf)
    conf = [
      {name: 'Fade', pic: '/assets/cat-on-couch.jpg', effects: [<Fade left/>, <Fade right/>, <Fade top/>, <Fade bottom/> ] },
      {name: 'Zoom', pic: '/assets/cat-on-plate.jpg', effects: [<Zoom/>, <Zoom left/>, <Zoom right/>, <Zoom top/>, <Zoom bottom/> ]},
      {name: 'Flip', pic: '/assets/cat-on-tree.jpg', effects: [<Flip delay={800}/>, <Flip right delay={2000}/>, <Flip top delay={3000}/>  ]},
      {name: 'Bounce', pic: '/assets/cat-on-grass.jpg', effects: [<Bounce/>, <Bounce left/>, <Bounce right/>, <Bounce top/>, <Bounce bottom/> ]},
      {name: 'Roll', pic: '/assets/cat-on-bed.jpg', effects: [<Roll left/>, <Roll right/>, <Roll top/>, <Roll bottom/> ]},
      {name: 'LightSpeed', pic: '/assets/cat-on-hands.jpg', effects: [<LightSpeed left/>, <LightSpeed right/> ]},
      {name: 'Rotate', pic: '/assets/cat-on-floor.jpg', effects: [<Rotate/>, <Rotate top left/>, <Rotate top right/>, <Rotate bottom left/>, <Rotate bottom right/> ]},
    ];
  if (!slides) {
    slides = conf.map( slide => makeSlide(slide.name, slide.pic, slide.effects) );
    //preload(cat);
    window.setTimeout( () => {
      for (let i=0; i<conf.length; i++)
        preload(conf[i].pic);
    }, 5000);
  }
  return (
    <Page title='Home'>
      <main>
        <Carousel maxTurns={10}>
          <Brand wait={8000} />
          {slides}
        </Carousel>
        <div className="container">
          <article className="mx-1">
          <section><p>
             The traditional way of calling attention to a certain web page elements has been
             "in-your-face" method of placing it in a popup or putting them in a sticky navigation elements
             like sticky headers,
             footers or sidebars. As the number of such elements increase, the app is at danger of
             starting to resemble a control panel from a jumbo jet cockpit. There should be a better way
             of managing a user attention and React Reveal can do just that.
          </p></section>
          <section><p>
            Instead of trying to squeeze everything that requires attention into one screen,
            you can draw user attention to important bits as they scroll past.
            React Reveal provides a dead simple way to add cool reveal-on-scroll animations
            to your React app. In addition, it has a first class support for collapsing elements
            thereby abolishing the need for the universally hated popups.
          </p></section>
          <section><p>
            The other problem many single page applications are facing is actually their speed.
            As you add and remove elements from the page transitions are often rough and jerky.
            React Reveal rich suite of effects could really smoothen these transitions to make
            for a modern and polished user experience.
          </p></section>
          <section><p>
            React Reveal is MIT licensed, supports server side rendering, has excellent cross browser support,
            won't mess your SEO,
            compatible with <Link to="/docs/transition-group/">react transition group</Link> and has a
            tiny footprint in the application js bundle ( doesn't require any CSS files either ).
            In order to start using it have a look at the <Link to="/docs/">documentation</Link>.
          </p></section>
          <h2>Kitty Trial</h2>
          <p>The following is a test of React Reveal by a cute picture of a cat. Scroll down and enjoy!</p>
          </article>
          {
            conf.map( ({ name, effects }) => (
              <React.Fragment key={name}>
              <h3 className="text-center"><Link to={`/examples/common/${name}`}>{name}</Link></h3>
              {
                effects.map( (example, index) =>
                  <div key={index} className="row">
                    <example.type {...example.props} delay={0} make always>
                      <img className="d-block mx-auto my-4" height="285" width="390" src={cat} alt="cute cat" />
                    </example.type>
                  </div>
                )
              }
              </React.Fragment>
            ))
          }
        </div>
      </main>
    </Page>
  );
}
        //<Marketing />

export default Home;
