/*
 * Docs Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Sidebar from '../../navigation/Sidebar';
import makeRoutes from './routes';
import navMap from '../../navigation/navMap';

const
  prefix = '/blog/',
  indexPath = 'npm',
  linkClass = 'list-group-item list-group-item-action',
  routes = makeRoutes(prefix, indexPath),
  nav = navMap({ prefix, linkClass }, [
    { title: 'Dawn of the Dead Packages', to: indexPath },
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
