/*
 * Demos Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import navMap from '../navigation/navMap';
import Common from './Common';
import Specials from './Specials';
import Advanced from './Advanced';
import Responsive from './Responsive';
import Carousel from './Carousel';

const
  prefix = '/examples/',
  linkClass = 'nav-link',
  itemClass = 'nav-item',
  nav = navMap({ prefix, linkClass, itemClass }, [
		{title: 'Common'},
		{title: 'Specials'},
		//{title: 'Advanced'},
		//{title: 'Responsive'},
		//{title: 'Carousel'},
]);

class Demos extends React.Component {

  render() {
		return (
			<nav className="container mt-4">
				<ul className="nav nav-tabs  mb-2">
					{nav}
				</ul>
	     	<Switch>
          <Route path='/examples/' exact component={Common} />
          <Route path="/examples/common/" component={Common} />
          <Route path="/examples/specials/" component={Specials} />
          <Route path="/examples/advanced/" component={Advanced} />
          <Route path="/examples/responsive/" component={Responsive} />
          <Route path="/examples/carousel/" component={Carousel} />
          <Route render={ () => <h1>Demo not found</h1> } />
      	</Switch>
			</nav>
		);
	}

}

export default Demos;
