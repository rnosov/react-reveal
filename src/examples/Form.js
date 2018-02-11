/*
 * Carousel Example Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Editor from './Editor';
import Page from '../Page';
//import Fade from 'react-reveal/Fade';

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      change: false,
      collapse: true,
    };
    this.collapse = this.collapse.bind(this);
    this.without = this.without.bind(this);

  }

  componentWillReceiveProps() {
      this.setState({ change: !this.state.change});
  }

  collapse() {
    this.setState({ collapse: true, change: !this.state.change});
    Page.gtag('event','collapse', {'event_category' : 'examples',});
  }

  without() {
    this.setState({ collapse: false, change: !this.state.change});
    Page.gtag('event','without', {'event_category' : 'examples',});
  }

  menu() {
    return (
      <div>
        <div className="btn-toolbar justify-content-center mb-2" role="toolbar">
          <div className="btn-group" role="group">
            <button onClick={ this.collapse } type="button" className={`btn ${this.state.collapse === true ? 'btn-primary' : 'btn-secondary'}`}>Collapse</button>
            <button onClick={ this.without } type="button" className={`btn ${this.state.collapse === false ? 'btn-primary' : 'btn-secondary'}`}>Without Collapse</button>
          </div>
        </div>
        <p>
          This an example form which designed to showcase error handling.
          This form doesn't really like when text fields contain strings with a odd number
          of characters and thus error messages could be triggered very easily.
          Try entering some text in the fields to see error message animations. <Link to="/docs/when/">Read More</Link>

        </p>
      </div>
    );
  }

  code( effect ) {
    return `// You can edit this code below the import statements
import React from 'react';
import Fade from 'react-reveal/Fade';

class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state={};
  }
  makeField(id, col, name) {
    const value = this.state[name] || '';
    const invalid = !!(value.length % 2);
    return(
      <div className={\`col-md-$\{col} mb-3\`}>
        <label htmlFor={id}>{name}</label>
        <input
          type="text"
          className={'form-control'+(invalid?' is-invalid':'')}
          id={id}
          placeholder={name}
          name={name}
          value={value}
          onChange={this.handleChange}
        />
        <Fade bottom${this.state.collapse?' collapse':''} when={invalid}>
          <div
            className="invalid-feedback"
            //Boostrap 4 uses some CSS tricks to simplify
            //error handling but we're doing it differently
            //so the next line disables these tricks
            style={{ display: 'block' }}
          >
            Oh no, the number of characters is odd
          </div>
        </Fade>
      </div>
    );
  }
  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  render() {
    return (
      <form>
        <div className="form-row">
          {this.makeField('f1',4, 'First name')}
          {this.makeField('f2',4, 'Last name')}
          {this.makeField('f3',4, 'Username' )}
        </div>
        <div className="form-row">
          {this.makeField('f4',6, 'City')}
          {this.makeField('f5',3, 'State')}
          {this.makeField('f5',3, 'Zip')}
        </div>
        <button className="btn btn-primary" type="button">
          Submit form
        </button>
        <small id="emailHelp" className="form-text text-muted">
          This button does nothing and is here just for demo.
        </small>
      </form>
    );
  }
}

export default FormExample;
${this.state.change?'':' '}
`
  }

  render() {
    const name = "Form error example";
    return (
      <Page scroll title={name}>
        <Editor importName={name} menu={this.menu()}>{this.code()}</Editor>
      </Page>
    );
  }

}

export default Example;
