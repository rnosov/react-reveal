/*
 * Docs Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Sidebar from '../navigation/Sidebar';
import Article from '../Article';
import { Route, Switch } from 'react-router-dom';
import navMap from '../navigation/navMap';
//import Basic from './Basic';
import TransitionGroup from './TransitionGroup';

const
  prefix = '/tutorials/',
  indexPath = 'transition-group',
  linkClass = 'list-group-item list-group-item-action',
  //routes = makeRoutes(prefix, indexPath),
  nav = navMap({ prefix, linkClass }, [
    { title: 'Working With Collections', to: indexPath },
    //{ title: 'Working With Collections', to: 'transition-group' },
    //{ title: 'Carousel', to: 'carousel' },
    //{ title: 'Hamburger', to: 'hamburger' },
    //{ title: 'Responsive', to: 'responsive' },
  ]);

function Tutorials () {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 order-md-12 mt-4">
          <Sidebar items={nav} />
        </div>
        <div className="col-12 col-md-8 order-md-1 mt-md-4">
          <Switch>
            <Route exact path={prefix} component={TransitionGroup} />
            <Route path={prefix + indexPath} component={TransitionGroup} />
            {/*<Route path={prefix + 'transition-group'} component={TransitionGroup} />*/}
            <Route render={ () => <Article title="Not Found" content="Tutorial not found" />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Tutorials;
