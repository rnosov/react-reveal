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
import Quickstart from './Quickstart';
import Carousel from './Carousel';
import TransitionGroup from './TransitionGroup';
import Styled from './Styled';

const
  prefix = '/tutorials/',
  indexPath = 'quickstart',
  linkClass = 'list-group-item list-group-item-action',
  nav = navMap({ prefix, linkClass }, [
    { title: 'Quickstart', to: indexPath },
    { title: 'Working With Lists', to: 'transition-group' },
    { title: 'Styled Components', to: 'styled' },
    { title: 'Making A Carousel', to: 'carousel' },
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
            <Route exact path={prefix} component={Quickstart} />
            <Route path={prefix + indexPath} component={Quickstart} />
            <Route path={prefix + 'transition-group'} component={TransitionGroup} />
            <Route path={prefix + 'styled'} component={Styled} />
            <Route path={prefix + 'carousel'} component={Carousel} />
            <Route render={ () => <Article title="Not Found" content="Tutorial not found" />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Tutorials;
