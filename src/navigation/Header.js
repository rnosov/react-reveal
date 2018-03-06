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
import hamburger from './hamburger';
//import Fade from 'react-reveal/Fade';
import { ie10 } from 'react-reveal/globals';

function flex(mainAxis = 'row') {
  return {
    display: ie10 ? '-ms-flexbox' : 'flex',
    flexFlow: `${mainAxis} nowrap`,
    MsFlexFlow: `${mainAxis} nowrap`,
  }
}

function Header({ reveal, icon, belowBreakpoint }) {
   function getStyles() {
    if (!belowBreakpoint)
      return {
        container: {
          width: '100%',
          ...flex('row')
        },
      };
    return {
      container: {
        marginLeft: 'auto',
        minHeight: '2.5rem',
        paddingTop: '0.375rem' ,
        border: '1px solid transparent',
        marginTop: '-2.5rem' ,
        //paddingBottom: '0.6rem' ,
        width: '100%  ',
        marginRight: 0,
        ...flex('column')
      },

    };
  }

  const styles = getStyles();
  return (
		<nav className="navbar navbar-expand-md navbar-dark bg-dark">
		  <a className="navbar-brand align-self-start" href="/">react-reveal</a>
		  <div style={styles.container}>
          {icon({ size: 28, style: { alignSelf: 'flex-end' }})}
          {reveal(
            <div className="navbar-nav w-100"  style={{ justifyContent: 'space-between', marginTop: (belowBreakpoint ? '0.375rem' : void 0) }}>
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
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tutorials/" activeClassName="active">Tutorials</NavLink>
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
                  <a className="nav-link" href="https://github.com/rnosov/react-reveal/tree/site">Site Source</a>
                </li>
              </ul>
            </div>
          )}
		  </div>
    </nav>
	);
}

//export default hamburger(Header, Fade, { collapseProps: {className: 'w-100'}, right: true, opposite: true } );
export default hamburger(Header, { collapseEl: <div className='w-100' />, duration: 300 });
