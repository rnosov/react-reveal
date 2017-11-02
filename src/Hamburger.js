/*
 * Hamburger Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { string, node, number, element } from 'prop-types';
import Skin from './lib/HamburgerSkin';

const
  propTypes = {
    skin: element,
    breakpoint: string,
    children: node.isRequired,
    size: number,
    color: string,
    bgColor: string,
  },
  defaultProps = {
    skin: <Skin />,
    breakpoint: '768px',
    size: 38,
    color: '#fff',
    bgColor: '#808080',
  };

class Hamburger extends React.Component {

  constructor(props) {
    super(props);
    this.mql = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  render() {
    let child = React.Children.only(this.props.children), { match } = this.state;
    child = //this.state.match
      //? <child.props.tag className={child.props.className}>{child.props.children}</child.props.tag>
      <child.type
          {...child.props}
          disabled={this.state.match}
          collapse
          force
          //bypass={true}
          when={this.state.match || this.state.isClicked}
        />;
    return <this.props.skin.type
      {...this.props.skin.props}
      api={{ child, match, toggle: this.state.isClicked, handleClick: this.handleClick, props: this.props }}
    />;
  }

}

Hamburger.propTypes = propTypes;
Hamburger.defaultProps = defaultProps;
export default Hamburger;
