/*
 * Carousel Example Component For react-reveal
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
    };
  }

  componentWillReceiveProps() {
      this.setState({ change: !this.state.change});
  }



  menu() {
    return (
      <h3 className="text-center">
        Todo App example
      </h3>

    );
  }

  code( effect ) {
    return `// You can edit this code below the import statements
import React from 'react';
import Fade from 'react-reveal/Fade';

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
      ].map( (text, id) => ({ id, text, disabled: true }) ),
    };
    this.state.id = this.state.todos.length;
  }
  add(event) {
    event.preventDefault();
    this.setState({
      id: this.state.id + 1,
      todos: [...this.state.todos, { id: this.state.id, text: this.state.todo }],
      todo: '',
    });
  }
  remove(event) {
    this.setState({ todos: this.state.todos.filter( item => !item.remove).map( (item) => {
      return item.id === +event.currentTarget.getAttribute('data-id')
      ? { ...item, remove: true }
      : item
      ;
    })});
  }
  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  render() {
    return (
      <form onSubmit={this.add}>
        <ul className="list-group">
          {this.state.todos.map( (item) =>
            <Fade skipInitial={item.disabled} key={item.id} collapse bottom when={!item.remove}>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {item.text}
                <button data-id={item.id} type="button" onClick={this.remove} className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>

              </li>
            </Fade>
          )}
        </ul>
        <div className="col-md-6 mb-2">
          <label htmlFor='todoField'>{name}</label>
          <input
            type="text"
            className="form-control"
            id='todoField'
            placeholder='Todo item'
            name='todo'
            value={this.state.todo}
            onChange={this.handleChange}
          />
        </div>
        <p>Count: {this.state.todos.length}</p>
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
