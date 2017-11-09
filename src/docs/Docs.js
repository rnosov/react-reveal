/*
 * Docs Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Page from '../Page';
import Code from '../Code';
import { Switch, Route } from 'react-router-dom';
import navMap from '../navigation/navMap';
import Fade from 'react-reveal/Fade';
import Responsive from 'react-reveal/Responsive';
import 'markdown-with-front-matter-loader';

const
  prefix = '/docs/',
  indexPath = 'intro',
  linkClass = 'list-group-item list-group-item-action',
  nav = navMap({ prefix, linkClass }, [
    { title: 'Introduction'         , to: indexPath },
    { title: 'Upgrading'            , to: 'upgrading' },
    { title: 'Common Effects'       , to: 'common' },
    { title: 'Special Effects'      , to: 'specials' },
    { title: 'Custom Effects'       , to: 'custom' },
    { title: 'Base Props'           , to: 'base' },
    { title: 'Cascade Effect'       , to: 'cascade' },
    //{ title: 'Collapse Effect'      , to: 'collapse' },
    //{ title: 'Stepped Animations'   , to: 'stepper' },
    //{ title: 'Responsive Hamburger' , to: 'responsive' },
  ]);


class Docs extends React.Component {

  constructor(props) {
    super(props);
    this.below = this.below.bind(this);
  }

  static article({ title, content }) {
    return (
      <Page animate scroll className='markdown-body' title={title}>
        <h1>{title}</h1>
        <Code>{content}</Code>
      </Page>
    );
  }

  static get routes() {
    if (Docs.savedRoutes)
      return Docs.savedRoutes;

    const webpackRequireContext = require.context('!markdown-with-front-matter-loader!./', false, /.md$/);
    const docs = webpackRequireContext.keys().reduce((memo, fileName) => memo.set(fileName.match(/.\/([^.]+).*/)[1], webpackRequireContext(fileName)), new Map());
    Docs.savedRoutes = [...docs.keys()].map(path => (
      <Route
        key={path}
        exact={path === indexPath}
        path={path === indexPath ? prefix + (`(${path})?`) : prefix + path }
        render={ () => <Docs.article title={docs.get(path).title} content={docs.get(path).__content} /> }
      />));
    Docs.savedRoutes.push(<Route key="NoMatch" render={ () => <Docs.article title="Not Found" content="Article not found" />} />);
    return Docs.savedRoutes;
  }

  below({ isToggled, content, toggle } ) {
    return(
      <div className={ isToggled ? 'dropup' : '' }>
        <button
          style={{ width: '8rem' }}
          onClick={toggle}
          className={`mb-3 btn btn-outline-primary dropdown-toggle`}
          type="button"
        >
         Show { isToggled ? 'Less' : 'More' }
        </button>
        {content()}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 order-md-12 mt-4">
            <Responsive below={this.below}>
              <Fade bottom cascade force duration={1200}>
                <ul className="list-group">
                  {nav}
                </ul>
              </Fade>
            </Responsive>
          </div>
          <div className="col-12 col-md-8 order-md-1 mt-md-4">
            <Switch>
              {Docs.routes}
            </Switch>
          </div>
        </div>
      </div>
    );
  }

}

export default Docs;
