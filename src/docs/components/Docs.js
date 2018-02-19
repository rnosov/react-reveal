/*
 * Docs Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Sidebar from './Sidebar';
import makeRoutes from './routes';
import navMap from '../../navigation/navMap';

const
  prefix = '/docs/',
  indexPath = 'intro',
  linkClass = 'list-group-item list-group-item-action',
  routes = makeRoutes(prefix, indexPath),
  nav = navMap({ prefix, linkClass }, [
    { title: 'Introduction'         , to: indexPath },
    //{ title: 'Migrating to 1.1'     , to: 'migrating' },
    { title: 'Common Effects'       , to: 'common' },
    { title: 'Special Effects'      , to: 'specials' },
    { title: 'Custom CSS Effects'   , to: 'custom' },
    { title: 'Component Props'      , to: 'props' },
    { title: 'when Prop'            , to: 'when' },
    { title: 'Cascade Effect'       , to: 'cascade' },
    { title: 'Transition Group'     , to: 'transition-group' },
    //{ title: 'Higher Order Components' , to: 'with-reveal' },
    //{ title: 'Responsive Elements' , to: 'responsive' },
    //{ title: 'Hamburger Menu' , to: 'hamburger' },
    //{ title: 'Carousel'             ,to:  'carousel' },

    //{ title: 'Collapse Effect'      , to: 'collapse' },
    //{ title: 'Stepped Animations'   , to: 'stepper' },
  ]);

function Docs () {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 order-md-12 mt-4">
          <Sidebar items={nav} />
        </div>
        <div className="col-12 col-md-8 order-md-1 mt-md-4">
          {routes}
        </div>
      </div>
    </div>
  );
}

export default Docs;
