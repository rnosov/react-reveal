/*
 * Todo Example Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Editor from './Editor';
import Page from '../Page';

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      change: false,
      collapse: true,
      enter: true,
      exit: true,
      appear: false,
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentWillReceiveProps() {
      this.setState({ change: !this.state.change});
  }

  handleCheck(event) {
    const name = event.currentTarget.getAttribute('id');
    this.setState({ [name]: !this.state[name], change: !this.state.change});
    Page.gtag('event', name, {'event_category' : 'examples',});
  }

  menu() {
    return (
      <div>
        <h3 className="text-center">
          Todo Example
        </h3>
        <div className="btn-toolbar justify-content-center mb-2" role="toolbar">
          <div className="form-row justify-content-center mt-1">
            <div className="custom-control custom-checkbox mr-2">
              <input id="appear" checked={this.state.appear} onChange={this.handleCheck} type="checkbox" className="custom-control-input" />
              <label className="custom-control-label" htmlFor="appear">Appear</label>
            </div>
            <div className="custom-control custom-checkbox mr-2">
              <input id="enter" checked={this.state.enter} onChange={this.handleCheck} type="checkbox" className="custom-control-input" />
              <label className="custom-control-label" htmlFor="enter">Enter</label>
            </div>
            <div className="custom-control custom-checkbox mr-2">
              <input id="exit" checked={this.state.exit} onChange={this.handleCheck} type="checkbox" className="custom-control-input" />
              <label className="custom-control-label" htmlFor="exit">Exit</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input id="collapse" checked={this.state.collapse} onChange={this.handleCheck} type="checkbox" className="custom-control-input" />
              <label className="custom-control-label" htmlFor="collapse">Collapse</label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  code( effect ) {
    return `// You can live edit this code below the import statements
import React from 'react';
import Fade from 'react-reveal/Fade';
import TransitionGroup from 'react-transition-group/TransitionGroup';

class TodoExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.state={
      todo: '',
      todos: [
        'item 1',
        'item 2',
        'item 3',
        'item 4',
      ].map( (text, id) => ({ id, text }) ),
    };
    this.state.id = this.state.todos.length;
  }
  add(event) {
    event.preventDefault();
    this.setState({
      id: this.state.id + 1,
      todos: [
        ...this.state.todos,
        { id: this.state.id, text: this.state.todo || '-' }
      ],
      todo: '',
    });
  }
  remove(event) {
    this.setState({ todos: this.state.todos.filter( item =>
      item.id !== +event.currentTarget.getAttribute('data-id')
    )});

  }
  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  render() {
    return (
      <form onSubmit={this.add} autoComplete="off">
        <div className="col-md-10 mb-2">
          <TransitionGroup
            component="ul"
            className="list-group"${this.state.appear?`
            appear={true}`:''}${!this.state.enter?`
            enter={false}`:''}${!this.state.exit?`
            exit={false}`:''}
          >
            {this.state.todos.map( (item) =>
              <Fade key={item.id}${this.state.collapse?' collapse':''} bottom>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {item.text}
                  <button
                    data-id={item.id}
                    onClick={this.remove}
                    type="button"
                    className="close"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </li>
              </Fade>
            )}
          </TransitionGroup>
        </div>
        <div className="col-md-7">
          <div className="input-group mt-4 mb-1">
            <input
              type="text"
              className="form-control"
              id='todoField'
              placeholder='Todo item'
              name='todo'
              value={this.state.todo}
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <button
                onClick={this.add}
                className="btn btn-outline-success"
                type="button"
              >
                Add Item
              </button>
            </div>
          </div>
          <small id="emailHelp" className="form-text text-muted">
            Item Count: {this.state.todos.length}
          </small>
        </div>
      </form>
    );
  }
}

export default TodoExample;
${this.state.change?'':' '}
`
  }

  render() {
    return (
      <Page scroll title="Todo example">
        <Editor menu={this.menu()}>{this.code()}</Editor>
      </Page>
    );
  }

}

export default Example;
