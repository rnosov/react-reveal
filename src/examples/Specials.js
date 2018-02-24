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
      <div>
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
      spy: false,
    };
    this.name = this.name.bind(this);
    this.spy = this.spy.bind(this);
  }

  componentWillReceiveProps() {
      this.setState({ change: !this.state.change});
  }

  name() {
    this.setState({ spy: false, change: !this.state.change});
    Page.event('name');
  }

  spy() {
    this.setState({ spy: true, change: !this.state.change});
    Page.event('spy');
  }

  menu() {
    return (
      <div>
        <div className="btn-toolbar justify-content-center mb-2" role="toolbar">
          <div className="btn-group" role="group">
            <button onClick={ this.name } type="button" className={`btn ${this.state.spy === false ? 'btn-info' : 'btn-secondary'}`}>{this.props.name}</button>
            <button onClick={ this.spy } type="button" className={`btn ${this.state.spy === true ? 'btn-info' : 'btn-secondary'}`}>Spy</button>
          </div>
        </div>
      </div>
    );
  }

  code( effect ) {
    return `// You can live edit this code below the import statements
import React from 'react';
import ${effect} from 'react-reveal/${effect}';

class ${effect}Example extends React.Component {${this.state.spy?`
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { counter: 0 };
  }
  handleClick() {
    this.setState({ counter: this.state.counter + 1 });
  }`:''}
  render() {
    return (
      <div>
        <${effect}${this.state.spy?' spy={this.state.counter}':''}>
          <h1>React Reveal</h1>
        </${effect}>${this.state.spy?`
        <button
          className="btn btn-success mt-4"
          type="button"
          onClick={this.handleClick}
        >
          Click Counter: {this.state.counter}
        </button>
        <small className="form-text text-muted">
          Apply ${effect} animation, when the counter is changed
        </small>`:''}
      </div>
    );
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
        <Editor previewClass="mt-5 text-center" importName={name} menu={this.menu()}>{this.code(name)}</Editor>
      </Page>
    );
  }

}

export default Specials;
