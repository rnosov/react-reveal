import React from 'react';
import Page from '../Page';
import Marketing from'./Marketing';
import Carousel from'./Carousel';
import Brand from'./slides/Brand';
import Seo from'./slides/Seo';
import Open from'./slides/Open';
import './Home.css';

function Home() {
	return (
    <Page title='Home'>
      <main>
        <Carousel maxTurns={10}>
          <Brand />
          <Seo />
          <Open />
        </Carousel>
        <Marketing />
      </main>
    </Page>
  );
}


export default Home;
