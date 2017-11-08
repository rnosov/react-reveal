/*
 * Responsive Examples Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Page from '../Page';
import navMap from '../navigation/navMap';

const
  prefix = '/examples/responsive/',
  linkClass = 'nav-link',
  itemClass = 'nav-item',
  nav = navMap({ prefix, linkClass, itemClass }, [
    {title: 'Hamburger'},
    {title: 'Menu'},
  ]);

function ResponsiveDemo() {
  return (
    <div>
      <ul className="nav nav-pills mb-3">
        {nav}
      </ul>
      <div className="text-center">
        <Switch>
          <Route render={ ComingSoon }    path={prefix}   exact       />
          <Route render={ ComingSoon }    path={prefix + 'Hamburger'}  />
          <Route render={ ComingSoon }    path={prefix + 'Menu'}   />
          <Route render={ NotFound }                               		/>
        </Switch>
      </div>
    </div>
  );
}

function NotFound() {
  return <Page scroll animate title="Not Found"><h1>Effect not found</h1></Page>
}

function ComingSoon() {
  return (
    <Page scroll title="Coming Soon">
      <h1>Coming Soon</h1>
    </Page>
  );
}

export default ResponsiveDemo;
