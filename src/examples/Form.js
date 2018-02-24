/*
 * Form errors Example Component For react-reveal
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

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      change: false,
      collapse: true,
      disabled: false,
    };
    this.collapse = this.collapse.bind(this);
    this.without = this.without.bind(this);
    this.disable = this.disable.bind(this);
  }

  componentWillReceiveProps() {
      this.setState({ change: !this.state.change});
  }

  collapse() {
    this.setState({ collapse: true, disabled: false, change: !this.state.change});
    Page.event('collapse');
  }

  without() {
    this.setState({ collapse: false, disabled: false, change: !this.state.change});
    Page.event('without');
  }
  disable() {
    this.setState({ disabled: !this.state.disabled, collapse: false, change: !this.state.change});
    Page.event('disable');
  }

  menu() {
    return (
      <div>
        <div className="btn-toolbar justify-content-center mb-2" role="toolbar">
          <div className="btn-group" role="group">
            <button onClick={ this.collapse } type="button" className={`btn ${!this.state.disabled && this.state.collapse === true ? 'btn-info' : 'btn-secondary'}`}>Collapse</button>
            <button onClick={ this.without } type="button" className={`btn ${!this.state.disabled && this.state.collapse === false ? 'btn-info' : 'btn-secondary'}`}>Without Collapse</button>
            <button onClick={ this.disable } type="button" className={`btn ${this.state.disabled ? 'btn-info' : 'btn-secondary'}`}>Disable animations</button>
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
    return `// You can live edit this code below the import statements
import React from 'react';
import Fade from 'react-reveal/Fade';

class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state={};
  }
  makeField(id, col, name) {
  const
    value = this.state[id] || '',
    invalid = !!(value.length % 2), // check if odd
    className = 'form-control' + (invalid?' is-invalid':'');
    return(
      <div className={\`col-md-$\{col} mb-3\`}>
        <label>{name}</label>
        <input
          type="text"
          className={className}
          data-id={id}
          placeholder={name}
          value={value}
          onChange={this.handleChange}
        />
        {/* The next line is where you specify that the
            error message should be shown only
            when the 'invalid' variable is true    */}
        <Fade bottom${this.state.collapse?' collapse':''} when={invalid}${this.state.disabled?' disabled':''}>
          <div className="invalid-feedback"${this.state.disabled?'':`
            //Boostrap 4 uses some CSS tricks to simplify
            //error handling but we're doing it differently
            //so the next line disables these tricks
            style={{ display: 'block' }}
          `}>
            Oh no, the number of characters is odd
          </div>
        </Fade>
      </div>
    );
  }
  handleChange({ target }) {
    this.setState({
      [target.getAttribute('data-id')]: target.value
    });
  }
  render() {
    return (
      <form autoComplete="off">
        <div className="form-row">
          {this.makeField('f1',4, 'First nаme')}
          {this.makeField('f2',4, 'Lаst name')}
          {this.makeField('f3',4, 'Usernаme' )}
        </div>
        <div className="form-row">
          {this.makeField('f4',6, 'Citу')}
          {this.makeField('f5',3, 'Stаte')}
          {this.makeField('f6',3, 'Ziр')}
        </div>
        <button className="btn btn-success" type="button">
          Submit form
        </button>
        <small className="form-text text-muted">
          This button does nothing and is here
          just for the demo.
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
    return (
      <Page scroll title="Form error example">
        <Editor menu={this.menu()}>{this.code()}</Editor>
      </Page>
    );
  }

}

export default Example;
