/*
 * Common Examples For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Page from '../Page';
import Editor from './Editor';
import navMap from '../navigation/navMap';

import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';
import Roll from 'react-reveal/Roll';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import LightSpeed from 'react-reveal/LightSpeed';

//const example = <h3>React-Reveal React-Reveal React-Reveal React-Reveal</h3>;
const example = <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit faucibus mollis. Praesent ultrices vehicula hendrerit. Maecenas ut ante ut magna viverra consequat. Sed pretium viverra quam non blandit. Nullam bibendum odio non posuere venenatis. Aliquam a quam non velit pharetra convallis. Duis lorem libero, vehicula fermentum elementum vel, finibus at purus. Curabitur feugiat felis a dolor ultricies interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sit amet sem interdum, lacinia nulla ac, tincidunt odio. </p>;

const
  prefix = '/examples/common/',
  linkClass = 'nav-link',
  itemClass = 'nav-item',
  nav = navMap({ prefix, linkClass, itemClass }, [
    {title: 'Fade', rootPrefix: '/examples/(common/)?(fade.*)?'},
    {title: 'Flip'},
    {title: 'Rotate'},
    {title: 'Zoom'},
    {title: 'Bounce'},
    {title: 'Slide'},
    {title: 'Roll'},
    {title: 'LightSpeed'},
  ]);

function Common() {
  return (
    <div>
      <ul className="nav nav-pills nav-fill mb-3">
        {nav}
      </ul>
      <div>
        <Switch>
          <Route render={ () => <Example name="Fade"       effect={Fade}       />} path={prefix}   exact        />
          <Route render={ () => <Example name="Fade"       effect={Fade}       />} path={'/examples'}   exact        />
          <Route render={ () => <Example name="Fade"       effect={Fade}       />} path={prefix + 'fade'}       />
          <Route render={ () => <Example name="Flip"       effect={Flip}       />} path={prefix + 'flip'}       />
          <Route render={ () => <Example name="Rotate"     effect={Rotate}     />} path={prefix + 'rotate'}     />
          <Route render={ () => <Example name="Zoom"       effect={Zoom}       />} path={prefix + 'zoom'}       />
          <Route render={ () => <Example name="Bounce"     effect={Bounce}     />} path={prefix + 'bounce'}     />
          <Route render={ () => <Example name="Roll"       effect={Roll}       />} path={prefix + 'roll'}       />
          <Route render={ () => <Example name="Slide"      effect={Slide}      />} path={prefix + 'slide'}      />
          <Route render={ () => <Example name="LightSpeed" effect={LightSpeed} />} path={prefix + 'lightspeed'} />
          <Route render={ NotFound } />
        </Switch>
      </div>
    </div>
  );
}

function NotFound() {
  return <Page scroll animate title="Not Found"><h1>Effect not found</h1></Page>
}

class StressTest extends React.Component {

  constructor(props) {
    super(props);
    this.reset = {};
    for (let i=0; i<100; i++)
      this.reset[i] = false;
    this.state ={ ...this.reset };
  }

  componentWillReceiveProps() {
      this.setState({ ...this.reset });
  }

  render() {
    const {name, dir} = this.props;
    return (
      <div className="text-center mt-5">
        {Array(...Array(100)).map( (val, index) => (
          <this.props.effect
            key={index}
            left={name === 'Rotate' ? (dir === 'left' || dir === 'top' ):dir === 'left'}
            right={name === 'Rotate' ? (dir === 'right' || dir === 'bottom' ):dir === 'right'}
            top={name === 'Rotate' ? (dir === 'right' || dir === 'left' ):dir === 'top'}
            bottom={name === 'Rotate' ? (dir === 'top' || dir === 'bottom' ):dir === 'bottom'}
            spy={this.props.change}
            when={!this.state[index]}
            wait={1000}
            opposite={this.props.opposite}
            onReveal={ this.props.out?()=> this.setState({ [index]: true }):void 0}
          >
            {example}
          </this.props.effect>
        ))}
      </div>
    );
  }

}


class Example extends React.Component {

  constructor(props) {
    super(props);
    this.reset = {};
    for (let i=0; i<100; i++)
      this.reset[i] = false;
    this.state = {
      ...this.reset,
      dir: 'left',
      out: false,
      opposite: false,
      change: false,
    }
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.top = this.top.bind(this);
    this.bottom = this.bottom.bind(this);
    this.clear = this.clear.bind(this);
    this.handleOut = this.handleOut.bind(this);
    this.handleOpposite = this.handleOpposite.bind(this);
    //this.left = this.left.bind(this);
  }

  left() {
    this.setState({ dir: 'left', change: !this.state.change});
  }

  right() {
    this.setState({ dir: 'right', change: !this.state.change});
  }

  top() {
    this.setState({ dir: 'top', change: !this.state.change});
  }

  bottom() {
    this.setState({ dir: 'bottom', change: !this.state.change});
  }

  clear() {
    this.setState({ dir: '', change: !this.state.change});
  }

  componentWillReceiveProps() {
      this.setState({ change: !this.state.change});
  }

  handleOut(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      out: value,
      opposite: value && this.state.opposite,
      change: !this.state.change
    });
  }

  handleOpposite(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      out: value || this.state.out,
      opposite: value,
      change: !this.state.change
    });
  }

  menu() {
    return (
      <div>
        <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group ml-2" role="group">
            <button onClick={this.left} type="button" className={`btn ${this.state.dir === 'left' ? 'btn-primary' : 'btn-secondary'}`}>{this.transformRotate('Left')}</button>
            <button onClick={this.right} type="button" className={`btn ${this.state.dir === 'right' ? 'btn-primary' : 'btn-secondary'}`}>{this.transformRotate('Right')}</button>
          </div>
          {this.props.name === 'LightSpeed'
            ? void 0
            : <div className="btn-group ml-2" role="group">
                <button onClick={this.top} type="button" className={`btn ${this.state.dir === 'top' ? 'btn-primary' : 'btn-secondary'}`}>{this.transformRotate('Top')}</button>
                <button onClick={this.bottom} type="button" className={`btn ${this.state.dir === 'bottom' ? 'btn-primary' : 'btn-secondary'}`}>{this.transformRotate('Bottom')}</button>
              </div>
          }
          <div className="btn-group ml-2" role="group">
            <button onClick={this.clear} type="button" className={`btn ${this.state.dir === '' ? 'btn-primary' : 'btn-secondary'}`}>Clear</button>
          </div>
          <div className="input-group">
          </div>
        </div>
        <div className="mt-1 text-center">
          <label className="custom-control custom-checkbox">
            <input
              name="out"
              type="checkbox"
              className="custom-control-input"
              checked={this.state.out}
              onChange={this.handleOut}
            />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Fade Out</span>
          </label>
          <label className="custom-control custom-checkbox">
            <input
              name="opposite"
              type="checkbox"
              className="custom-control-input"
              checked={this.state.opposite}
              onChange={this.handleOpposite}
            />            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Opposite</span>
          </label>
        </div>
      </div>
    );
  }

  transformRotate(dir) {
    if (this.props.name !== 'Rotate')
      return dir === '' ? '' : ' '+dir;
    switch (dir.toLowerCase()) {
      case 'left': return ' Top Left';
      case 'right': return ' Top Right';
      case 'top': return ' Bottom Left';
      case 'bottom': return ' Bottom Right';
      default:
        return '';
    }
  }

  code( effect ) {
    return `// You can edit this code below the import statements
import React from 'react';
import ${effect} from 'react-reveal/${effect}';

class ${effect}Example extends React.Component {
  ${ this.state.out? `constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  `:''}render() {
    return (
      <div>
        <${effect}${this.transformRotate(this.state.dir).toLowerCase()}${this.state.out?'':' duration={1000}'}${this.state.opposite?' opposite':''}${this.state.out?' when={this.state.isOn}':''}>
          <h1>React Reveal</h1>
        </${effect}>
        <p>
          ${this.state.out?`The idea behind it is that we initially
          sеt “isOn” state variable to truе
          and then sеt a timeout that will
          sеt “isOn” to falsе
        `:`Try changing the “duration” attribute
          оf the ${effect} component
          or replace “left” attribute
          wіth “right”, “top” or “bottom”
        `}</p>
      </div>
    );
  }${ this.state.out? `
  componentDidMount() {
    this.timeout = window.setTimeout(
      () => this.setState({ isOn: false }), 1000
    );
  }
  componentWillUnmount() {
    if (this.timeout)
      this.timeout = window.clearTimeout(this.timeout);
  }`:''}
}

export default ${effect}Example;
${this.state.change?'':' '}
`
  }

  render() {
    const { effect, name } = this.props;
    return (
      <Page scroll title={name}>
        <div style={{ minHeight: '100vh' }}>
          <Editor importName={name} menu={this.menu()}>{this.code(name)}</Editor>
          <p className="lead mt-5">
            The following is the stress test for the chosen effect.
            A 100 paragraphs of lorem ipsum text will be revealed as you scroll down.
            To reset the test select an option from the button toolbar above.
            The following whitespace is intentionally left blank. Scroll down to begin stress test.
          </p>
        </div>
        <StressTest name={name} effect={effect} dir={this.state.dir} change={this.state.change} opposite={this.state.opposite} out={this.state.out} />
      </Page>
    );
  }

}


export default Common;


