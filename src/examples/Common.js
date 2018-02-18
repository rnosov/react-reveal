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
import Reveal from 'react-reveal/Reveal';
import Pulse from 'react-reveal/HeadShake';

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
    {title: 'Custom CSS', to: 'custom'},
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
          <Route render={ () => <Example name="Reveal"     effect={Reveal}     />} path={prefix + 'custom'} />
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
    //this.state.trigger = true;
    this.handleReveal = this.handleReveal.bind(this);
    //if (props.out)
    //  window.setTimeout( () => this.setState({ trigger: false }), 500 );
  }

  componentWillReceiveProps(props) {
   //if (props.out)
   //   window.setTimeout( () => this.setState({ trigger: false }), 500 );
   // else this.setState({ trigger: true });
    this.setState({ ...this.reset });
  }

  handleReveal() {
    Page.gtag('event','scroll', {'event_category' : 'examples',});
  }

  render() {
    const {name, dir, opposite, out, change, big} = this.props;
    return (
      <div className="text-center mt-5">
        {Array(...Array(100)).map( (val, index) => (
          <this.props.effect
            appear
            key={index}
            effect={this.props.effect === Reveal ? 'fadeInUp' : void 0}
            big={big}
            //key={name+dir+opposite.toString()+out.toString()+index}
            //key={index+change}
            left={name === 'Rotate' ? (dir === 'left' || dir === 'top' ):dir === 'left'}
            right={name === 'Rotate' ? (dir === 'right' || dir === 'bottom' ):dir === 'right'}
            top={name === 'Rotate' ? (dir === 'right' || dir === 'left' ):dir === 'top'}
            bottom={name === 'Rotate' ? (dir === 'top' || dir === 'bottom' ):dir === 'bottom'}
            spy={change}
            when={!this.state[index]}
            //appear={!out}
            //when={out?this.state.trigger:true}
            wait={1000}
            opposite={opposite}
            onReveal={out?()=> this.setState({ [index]: true }):(index%10?void 0:this.handleReveal)}
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
      cascade: false,
      text: false,
      change: false,
      collapse: false,
      big: false,
    }
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.top = this.top.bind(this);
    this.bottom = this.bottom.bind(this);
    this.clear = this.clear.bind(this);
    this.handleOut = this.handleOut.bind(this);
    this.handleOpposite = this.handleOpposite.bind(this);
    this.handleCascade = this.handleCascade.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleBig = this.handleBig.bind(this);
    //this.left = this.left.bind(this);
  }

  left() {
    this.setState({ dir: 'left', change: !this.state.change});
    Page.gtag('event','left', {'event_category' : 'examples',});
  }

  right() {
    this.setState({ dir: 'right', change: !this.state.change});
    Page.gtag('event','right', {'event_category' : 'examples',});
  }

  top() {
    this.setState({ dir: 'top', change: !this.state.change});
    Page.gtag('event','top', {'event_category' : 'examples',});
  }

  bottom() {
    this.setState({ dir: 'bottom', change: !this.state.change});
    Page.gtag('event','bottom', {'event_category' : 'examples',});
  }

  clear() {
    this.setState({ dir: '', big: false, change: !this.state.change});
    Page.gtag('event','clear', {'event_category' : 'examples',});
  }


  handleBig() {
    this.setState({ big: !this.state.big, change: !this.state.change});
    Page.gtag('event','big', {'event_category' : 'examples',});
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
    Page.gtag('event','when', {'event_category' : 'examples',});
  }

  handleOpposite(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      out: value || this.state.out,
      opposite: value,
      change: !this.state.change
    });
    Page.gtag('event','opposite', {'event_category' : 'examples',});
  }

  handleCascade(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      cascade: value,
      text: value && this.state.text,
      change: !this.state.change
    });
    Page.gtag('event','cascade', {'event_category' : 'examples',});
  }

  handleText(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      cascade: value || this.state.cascade,
      text: value,
      change: !this.state.change
    });
    Page.gtag('event','text', {'event_category' : 'examples',});
  }

  handleCollapse(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      out: value || this.state.out,
      collapse: value,
      change: !this.state.change
    });
    Page.gtag('event','collapse', {'event_category' : 'examples',});
  }

  menu() {
    if (this.props.name === 'Reveal') return <div />;
    return (
      <div>
        <Pulse>
        <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group ml-2" role="group">
            <button onClick={this.left} type="button" className={`btn ${this.state.dir === 'left' ? 'btn-info' : 'btn-secondary'}`}>{this.transformRotate('Left')}</button>
            <button onClick={this.right} type="button" className={`btn ${this.state.dir === 'right' ? 'btn-info' : 'btn-secondary'}`}>{this.transformRotate('Right')}</button>
          </div>
          {this.props.name === 'LightSpeed'
            ? void 0
            : <div className="btn-group ml-2" role="group">
                <button onClick={this.top} type="button" className={`btn ${this.state.dir === 'top' ? 'btn-info' : 'btn-secondary'}`}>{this.transformRotate('Top')}</button>
                <button onClick={this.bottom} type="button" className={`btn ${this.state.dir === 'bottom' ? 'btn-info' : 'btn-secondary'}`}>{this.transformRotate('Bottom')}</button>
              </div>
          }
          <div className="btn-group ml-2" role="group">
            <button onClick={this.clear} type="button" className={`btn ${this.state.dir === '' ? 'btn-info' : 'btn-secondary'}`}>Clear</button>
          </div>
          {this.props.name === 'Fade'
          ? <div className="btn-group ml-2" role="group">
              <button onClick={this.handleBig} type="button" className={`btn ${this.state.big ? 'btn-info' : 'btn-secondary'}`}>Big</button>
            </div>
          : void 0
          }
        </div>
        </Pulse>
        <div className="form-row justify-content-center mt-1">
          <div className="custom-control custom-checkbox mr-2">
            <input id="customFadeOut" checked={this.state.out} onChange={this.handleOut} type="checkbox" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="customFadeOut">When</label>
          </div>
          <div className="custom-control custom-checkbox mr-2">
            <input id="customOpposite" checked={this.state.opposite} onChange={this.handleOpposite} type="checkbox" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="customOpposite">Opposite</label>
          </div>
          <div className="custom-control custom-checkbox mr-2">
            <input id="customCollapse" checked={this.state.collapse} onChange={this.handleCollapse} type="checkbox" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="customCollapse">Collapse</label>
          </div>
        </div>

        <div className="form-row justify-content-center mt-1">
        <div className="custom-control custom-checkbox mr-2">
          <input id="customCascade" checked={this.state.cascade} onChange={this.handleCascade} type="checkbox" className="custom-control-input" />
          <label className="custom-control-label" htmlFor="customCascade">Cascade</label>
        </div>
        <div className="custom-control custom-checkbox mr-2">
          <input id="customText" checked={this.state.text} onChange={this.handleText} type="checkbox" className="custom-control-input" />
          <label className="custom-control-label" htmlFor="customText">Text</label>
        </div>
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

  //function X() {
  //    return <div>XXXXX</div>;
  //  }
  //  class Y extends React.Component {
  //    render() {
  //      return <div>YYYYYYYY</div>;
  //    }
  //  }

  getProps(effect) {
    let props = effect === 'Reveal' ? ' effect="fadeInUp"' : this.transformRotate(this.state.dir).toLowerCase();
    if (effect === 'Reveal')
      return props;
    if (this.state.big && effect === 'Fade')
      props += ' big';
    if (this.state.opposite)
      props += ' opposite';
    if (this.state.cascade)
      props += ' cascade';
    if (this.state.collapse)
      props += ' collapse';
    if (this.state.out)
      props += ' when={this.state.show}';
    return props;
  }

  getText(effect) {
    if (this.state.cascade && effect !== 'Reveal')
      return this.state.text ? 'React Reveal' : `<div>
            <h2>React Reveal</h2>
            <h2>React Reveal</h2>
            <h2>React Reveal</h2>
          </div>`;
    return '<h1>React Reveal</h1>';
  }

  code( effect ) {
    return `// You can live edit this code below the import statements
import React from 'react';
import ${effect} from 'react-reveal/${effect}';

class ${effect}Example extends React.Component {
  ${ this.state.out && effect !== 'Reveal'? `constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ show: !this.state.show });
  }
  `:''}render() {
    return (
      ${this.state.out && effect !== 'Reveal'?`<${this.state.text?'h1':'div'}>
        <${effect}${this.getProps(effect)}>
          ${this.getText(effect)}
        </${effect}>
        <button
          className="btn btn-success my-5"
          type="button"
          onClick={this.handleClick}
        >
          { this.state.show ? 'Hide' : 'Show' } Message
        </button>
      </${this.state.text?'h1':'div'}>`:`<${this.state.text&& effect !== 'Reveal'?'h1':'div'}>
        <${effect}${this.getProps(effect)}>
          ${this.getText(effect)}
        </${effect}>
      </${this.state.text&& effect !== 'Reveal'?'h1':'div'}>`}
    );
  }
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
          <Editor
            importName={name}
            previewClass="mt-5 text-center"
            menu={this.menu()}
            //footer={<p>Try replacing “left” attribute wіth “right”, “top” or “bottom”  оf the {name} component </p>}
          >
            {this.code(name)}
          </Editor>
          <p className="lead mt-5">
            The following is the stress test for the chosen effect.
            A 100 paragraphs of lorem ipsum text will be revealed as you scroll down.
            To reset the test select an option from the button toolbar above.
            The following whitespace is intentionally left blank. Scroll down to begin stress test.
          </p>
        </div>
        <StressTest name={name} effect={effect} dir={this.state.dir} change={this.state.change} opposite={this.state.opposite} out={this.state.out} big={this.state.big} />
      </Page>
    );
  }

}


export default Common;


