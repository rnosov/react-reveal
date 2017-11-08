/*
 * Special Examples Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Editor from './Editor';
import Page from '../Page';
import navMap from '../navigation/navMap';

import Flash from 'react-reveal/Flash';
import HeadShake from 'react-reveal/HeadShake';
import Jello from 'react-reveal/Jello';
import Jump from 'react-reveal/Jump';
import Pulse from 'react-reveal/Pulse';
import RubberBand from 'react-reveal/RubberBand';
import Shake from 'react-reveal/Shake';
import Spin from 'react-reveal/Spin';
import Swing from 'react-reveal/Swing';
import Tada from 'react-reveal/Tada';
import Wobble from 'react-reveal/Wobble';

const
  prefix = '/examples/specials/',
  linkClass = 'nav-link',
  itemClass = 'nav-item',
  nav = navMap({ prefix, linkClass, itemClass }, [
    {title: 'Jump'},
    {title: 'Flash'},
    {title: 'HeadShake'},
    {title: 'Jello'},
    {title: 'Pulse'},
    {title: 'RubberBand'},
    {title: 'Shake'},
    {title: 'Spin'},
    {title: 'Swing'},
    {title: 'Tada'},
    {title: 'Wobble'},
  ]);

function Specials() {
  return (
    <div>
      <ul className="nav nav-pills nav-fill mb-3">
        {nav}
      </ul>
      <div className="text-center">
        <Switch>
          <Route render={ () => <Example name="Jump"       effect={Jump}       />}    path={prefix}   exact        />
			    <Route render={ () => <Example name="Jump"       effect={Jump}       />}    path={prefix + 'jump'} />
          <Route render={ () => <Example name="Flash"      effect={Flash}      />}    path={prefix + 'flash'} />
          <Route render={ () => <Example name="HeadShake"  effect={HeadShake}  />}    path={prefix + 'headShake'} />
          <Route render={ () => <Example name="Jello"      effect={Jello}      />}    path={prefix + 'jello'} />
			    <Route render={ () => <Example name="Pulse"      effect={Pulse}      />}    path={prefix + 'pulse'} />
			    <Route render={ () => <Example name="RubberBand" effect={RubberBand} />}    path={prefix + 'rubberband'} />
			    <Route render={ () => <Example name="Shake"      effect={Shake}      />}    path={prefix + 'shake'} />
			    <Route render={ () => <Example name="Spin"       effect={Spin}       />}    path={prefix + 'spin'} />
			    <Route render={ () => <Example name="Swing"      effect={Swing}      />}    path={prefix + 'swing'} />
			    <Route render={ () => <Example name="Tada"       effect={Tada}       />}    path={prefix + 'tada'} />
			    <Route render={ () => <Example name="Wobble"     effect={Wobble}     />}    path={prefix + 'wobble'} />
          <Route render={ NotFound }                               />
        </Switch>
      </div>
    </div>
  );
}

function NotFound() {
  return <Page scroll animate title="Not Found"><h1>Effect not found</h1></Page>
}


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
import ${effect} from 'react-reveal/${effect}';

class ${effect}Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { num: 1 };
  }
  isOdd() {
    return !!(this.state.num % 2);
  }
  render() {
    return (
      <div>
        <${effect} when={this.isOdd()}>
          <h1>React Reveal</h1>
        </${effect}>
        <div>
          <input
            type="number"
            className="form-control"
            value={this.state.num}
            onChange={this.handleChange}
          />
          <p>
            Do a ${effect} effect, when the number is odd
          </p>
        </div>
      </div>
    );
  }
  handleChange(event) {
    this.setState({ num: event.target.value });
  }
}

export default ${effect}Example;
${this.state.change?'':' '}
`
  }

  render() {
    const { name } = this.props;
    return (
      <Page scroll title={name}>
        <Editor importName={name} menu={this.menu()}>{this.code(name)}</Editor>
      </Page>
    );
  }

}

export default Specials;
