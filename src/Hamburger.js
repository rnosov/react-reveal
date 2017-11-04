/*
 * Hamburger Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { string, element, func } from 'prop-types';
import Skin from './lib/HamburgerSkin';
import Icon from './lib/HamburgerIcon';
import { animation, ie10 } from './lib/globals';

const
  propTypes = {
    skin: func,
    breakpoint: string,
    children: element.isRequired,
    size: string,
    color: string,
    bgColor: string,
  },
  defaultProps = {
    skin: Skin,
    icon: Icon,
    breakpoint: '768px',
    size: '28px',
    color: '#fff',
    bgColor: '#808080',
  };

class Hamburger extends React.Component {

  constructor(props) {
    super(props);
    this.mql = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.icon = this.icon.bind(this);
    this.content = this.content.bind(this);
    this.state = {
      match : true,
      isClicked: false,
    };
  }

  handleChange(e) {
    this.setState({ match: e.matches, collapse: !e.matches });
  }

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  newQuery(query) {
    this.componentWillUnMount();
    if ('matchMedia' in window) {
      this.mql = window.matchMedia(`(min-width: ${this.props.breakpoint})`);
      this.handleChange(this.mql);
      this.mql.addListener(this.handleChange);
    }
  }

  icon(props) {
    return this.props.icon( this.state.isClicked, this.props.size, this.props.color,
                            this.props.bgColor, animation, this.handleClick, props, );
  }

  componentWillUnMount() {
    if (this.mql)
      this.mql.removeListener(this.handleChange);
  }

  componentDidMount() {
    this.newQuery(this.props.query);
  }

  componentWillReceiveProps({ query }) {
    this.newQuery(query);
  }

  content({ style, className, ...props } = {}) {
    const
      child = React.Children.only(this.props.children),
      grandChild = React.Children.only(child.props.children),
      newProps = {...grandChild.props, ...props};
    return <child.type
      {...child.props}
      disabled={this.state.match}
      collapse
      force
      when={this.state.match || this.state.isClicked}
      children={
        <grandChild.type
          {...newProps}
          style={{ ...newProps.style, ...style }}
          //className={ newProps.className ? newProps.className + ' ' + className : className }
          className={ (newProps.className||'') + (newProps.className&&className?' ':'') + (className||'')}
          children={grandChild.props.children}
          onClick={this.handleClick}
        />
      }
    />;
  }

  flex(mainAxis = 'row') {
    return {
      display: ie10 ? '-ms-flexbox' : 'flex',
      flexFlow: `${mainAxis} nowrap`,
      MsFlexFlow: `${mainAxis} nowrap`,
    }
  }

  getStyles() {
    return {
      container: {
        marginLeft: 'auto',
        paddingTop: '0.375rem' ,
        border: '1px solid transparent',
        marginTop: '-2.5rem' ,
        width: '100%  ',
        marginRight: 0,
        ...this.flex('column')
      },
      icon: {
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: this.props.bgColor,
        height: this.props.size,
        width: this.props.size,
        alignSelf: 'flex-end',
      },
      activeContent: {
        marginTop: '0.375rem'
      },
      inactiveContent: this.flex('row'),
    };
  }

  render() {
    return <this.props.skin
      {...this.props}
      isActive={!this.state.match}
      content={this.content}
      icon={this.icon}
      handleClick={this.handleClick}
      styles={this.getStyles()}
      flex={this.flex}
      ie10={ie10}
    />;
  }

}

Hamburger.propTypes = propTypes;
Hamburger.defaultProps = defaultProps;
export default Hamburger;
