import React from 'react';
import Helmet from 'react-helmet';
import Marketing from'./Marketing';
import Carousel from'./Carousel';
import Brand from'./slides/Brand';
import Seo from'./slides/Seo';
import Open from'./slides/Open';
import './Home.css';

function Home() {
	return (
      <main>
        <Carousel maxTurns={0}>
          <Brand />
          <Seo />
          <Open />
        </Carousel>
        <Marketing />
        <Helmet title='Home' />
      </main>
  );
}
          //<Open />
          //<Open />

export default Home;
