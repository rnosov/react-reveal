/*
 * App Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from './navigation/Header';
import Footer from './navigation/Footer';
import NoMatch from './navigation/NoMatch';
import Home from './home/Home';
import Docs from './docs/components/Docs';
import Tutorials from './tutorials/Tutorials';
import Demos from './examples/Demos';

function App() {
  return (
    <div className="App" style={{ overflow: 'hidden' }}>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/tutorials/' component={Tutorials} />
        <Route path='/docs/' component={Docs} />
        <Route path='/examples/' component={Demos} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
      <Helmet titleTemplate="%s - React Reveal" />
    </div>
  );
}

export default App;
