/*
 * Generating Documentation Routes
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Article from '../../Article';
import Npm from '../Npm';
import { Route, Switch } from 'react-router-dom';

function makeRoutes(prefix, indexPath)  {
  const webpackRequireContext = require.context('!markdown-with-front-matter-loader!../', false, /.md$/);
  const docs = webpackRequireContext.keys().reduce((memo, fileName) => memo.set(fileName.match(/.\/([^.]+).*/)[1], webpackRequireContext(fileName)), new Map());
  let routes = [...docs.keys()].map(path => (
    <Route
      key={path}
      exact={path === indexPath}
      path={path === indexPath ? prefix + (`(${path})?`) : prefix + path }
      render={ () => <Article title={docs.get(path).title} content={docs.get(path).__content} /> }
    />));
  return (
    <Switch>
      <Route path={prefix + 'npm'} component={Npm} />
      <Route exact path={prefix} component={Npm} />
      {routes}
      <Route key="NoMatch" render={ () => <Article title="Not Found" content="Article not found" />} />
    </Switch>
  );
}

export default makeRoutes;
