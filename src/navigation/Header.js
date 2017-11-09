/*
 * Header Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from 'react-reveal/Hamburger';
import Fade from 'react-reveal/Fade';

function Header() {
	return (
		<div>
		<nav className="navbar navbar-expand-md navbar-dark bg-dark">
		  <a className="navbar-brand align-self-start" //href="https://rnosov.github.io/react-reveal-demo/"
		  href="/">react-reveal</a>
		  <Hamburger bgColor="none">
		  	<Fade right opposite>
		  		<div className="navbar-nav w-100" style={{ justifyContent: 'space-between' }}>
		  			<ul className="navbar-nav">
		  			  <li className="nav-item">
		  			  	<NavLink exact className="nav-link" to="/" activeClassName="active">Home</NavLink>
		  			  </li>
		  			  <li className="nav-item">
		  			  	<NavLink className="nav-link" to="/docs/" activeClassName="active">Documentation</NavLink>
		  			  </li>
		  			  <li className="nav-item">
		  			  	<NavLink className="nav-link" to="/examples/" activeClassName="active">Examples</NavLink>
		  			  </li>
		  			</ul>
		  			<ul className="navbar-nav justify-self-end">
		  			  <li className="nav-item">
		  			    <a className="nav-link" href="https://www.npmjs.com/package/react-reveal">NPM Package</a>
		  			  </li>
		  			  <li className="nav-item">
		  			    <a className="nav-link" href="https://github.com/rnosov/react-reveal">Github</a>
		  			  </li>
		  			  <li className="nav-item">
		  			    <a className="nav-link" href="https://github.com/rnosov/react-reveal/tree/site">Site Source</a>
		  			  </li>
		  			</ul>
		  		</div>
		  	</Fade>
		  </Hamburger>
		</nav>
		</div>
	);
}

export default Header;
