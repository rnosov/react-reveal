/*
 * Home Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Helmet from 'react-helmet';
import Animation from 'react-reveal/Animation';
import Jumbotron from'./Jumbotron';
import Marketing from'./Marketing';

function Home() {
	return (
    <Animation steps={Animation
      .step('title', 500)
      .step('jumbotronText', 1000)
      .step('centralItem', 800)
      .step('circle1', 300)
      .step('circle2', 300)
      .step('circle3', 600)
      .step('jumbotron', 800)
      .step('sideItems', 1500)
      .step('button', 200)
    }>
      <div>
        <Jumbotron />
        <Marketing />
        <Helmet title='Home' />
      </div>
    </Animation>
	);
}

export default Home;
