/*
 * Advanced Examples Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Form from './Form';
import Page from '../Page';
import navMap from '../navigation/navMap';

const
  prefix = '/examples/advanced/',
  linkClass = 'nav-link',
  itemClass = 'nav-item',
  nav = navMap({ prefix, linkClass, itemClass }, [
    {title: 'Form errors', to: 'form'},
    //{title: 'Collapsing Animations', to: 'collapse'},
    //{title: 'Custom Animations', to: 'custom'},
    //{title: 'Stepped Animations', to: 'stepper'},

  ]);

function Advanced() {
  return (
    <div>
      <ul className="nav nav-pills mb-3">
        {nav}
      </ul>
      <div>
        <Switch>
          <Route render={ () => <Form /> }    path={prefix} exact   />
          <Route render={ () => <Form /> }    path={prefix + 'form'}   />
          <Route render={ ComingSoon }        path={prefix + 'custom'}   />
          <Route render={ ComingSoon }        path={prefix + 'stepper'}   />
          <Route render={ ComingSoon }        path={prefix + 'forms'}   />
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


export default Advanced;
