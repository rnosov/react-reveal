/*
 * Responsive Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { string, element, func } from 'prop-types';

function defaultHandler({ content }) {
  return content();
}

const
  propTypes = {
    above: func,
    breakpoint: string,
    below: func,
    children: element.isRequired,

  },
  defaultProps = {
    breakpoint: '768px',
    below: defaultHandler,
    above: defaultHandler,
  };

class Responsive extends React.Component {

  constructor(props) {
    super(props);
    this.mql = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.content = this.content.bind(this);
    //this.scrollNode = false;
    //this.scrollRef = this.scrollRef.bind(this);
    this.state = {
      match : true,
      isClicked: false,
    };
  }

  handleChange(e) {
    this.setState({ match: e.matches, isClicked: false });
  }

  //scrollRef(node) {
  //  this.scrollNode = node;
  //}


  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  newQuery(query) {
    this.unlisten();
    if ('matchMedia' in window) {
      this.mql = window.matchMedia(`(min-width: ${this.props.breakpoint})`);
      this.handleChange(this.mql);
      this.mql.addListener(this.handleChange);
    }
  }

  unlisten() {
    if (this.mql)
      this.mql.removeListener(this.handleChange);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidMount() {
    this.newQuery(this.props.query);
  }

  componentWillReceiveProps({ query }) {
    this.newQuery(query);
  }

  content({ effect, style, className, props } = {}) {
    const
      child = React.Children.only(this.props.children),
      grandChild = React.Children.only(child.props.children);
      //newProps = {...grandChild.props, ...props};
      //if (!this.state.match && !this.state.isClicked && this.scrollNode)
      //  this.scrollNode.scrollIntoView({ behavior: 'smooth' });
    return <child.type
      {...child.props}
      {...effect}
      {...this.props.effect?this.props.effect(this.state):void 0}
      collapse
      when={this.state.match || this.state.isClicked}
      children={
        <grandChild.type
          {...grandChild.props}
          style={{ ...grandChild.props.style, ...style }}
          className={ ((grandChild.props.className||'') + (grandChild.props.className&&className?' ':'') + (className||''))|| void 0}
          //style={{ ...newProps.style, ...style }}
          //className={ (newProps.className||'') + (newProps.className&&className?' ':'') + (className||'')}
          onClick={this.handleClick}
          {...props}
          children={grandChild.props.children}
        />
      }
    />;
  }

  render() {
    const Func = this.props[this.state.match?'above':'below'];
    return <Func
      {...this.props}
      content={this.content}
      isToggled={this.state.isClicked}
      toggle={this.handleClick}
      //scrollRef={this.scrollRef}
    />;
  }

}

Responsive.propTypes = propTypes;
Responsive.defaultProps = defaultProps;
export default Responsive;
