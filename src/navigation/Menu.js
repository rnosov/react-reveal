/*
 * Menu Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Menu({ nowrap }) {
  const menu = (
    <React.Fragment>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink exact className="nav-link" to="/" activeClassName="active">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tutorials/" activeClassName="active">Tutorials</NavLink>
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
                  <a className="nav-link" href="https://github.com/rnosov/react-reveal">Github</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.npmjs.com/package/react-reveal">NPM</a>
                </li>
                <li className="nav-item">
                  {/*<NavLink className="nav-link" to="/blog/zombies/" activeClassName="active">Blog</NavLink>*/}
                  <a className="nav-link" href="https://github.com/rnosov/react-reveal/tree/site">Site Source</a>
                </li>
              </ul>
    </React.Fragment>
  );
  return nowrap ? menu : <div className="container mx-3">{menu}</div>;
}
