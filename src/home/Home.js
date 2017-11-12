import React from 'react';
import Helmet from 'react-helmet';
import Marketing from'./Marketing';
import Carousel from'./Carousel';
import Brand from'./slides/Brand';
import Responsive from'./slides/Responsive';
import Open from'./slides/Open';
import './Home.css';

function Home() {
	return (
      <main>
        <Carousel maxTurns={0}>
          <Brand />
          <Responsive />          
          <Open />
          <Open />
        </Carousel>
        <Marketing />      
        <Helmet title='Home' />
      </main>    
  );
}

export default Home;