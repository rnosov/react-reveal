/*
 * Carousel Example Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
//import { Switch, Route, Link } from 'react-router-dom';
import Editor from './Editor';
import Page from '../Page';

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      change: false,
    };
  }

  componentWillReceiveProps() {
      this.setState({ change: !this.state.change});
  }

  menu() {
    return (
      <div>
        <div className="btn-toolbar justify-content-center mb-2" role="toolbar">
          <div className="btn-group" role="group">
            <button onClick={ () =>  this.setState({ change: !this.state.change}) } type="button" className="btn btn-secondary">{this.props.name}</button>
          </div>
        </div>
      </div>
    );
  }

  code( effect ) {
    return `// You can edit this code below the import statements
import React from 'react';
import Fade from 'react-reveal/Fade';

class CascadeExample extends React.Component {
  render() {
    return (
      <Fade left cascade>
        <ul>
          <li>First Item</li>
          <li>Another Item</li>
          <li>Last Item</li>
        </ul>
      </Fade>
    );
  }
}

export default CascadeExample;
${this.state.change?'':' '}
`
  }

  render() {
    const name = "Cascade Effect";
    return (
      <Page scroll title={name}>
        <Editor importName={name} menu={this.menu()}>{this.code(name)}</Editor>
      </Page>
    );
  }

}

export default Example;
