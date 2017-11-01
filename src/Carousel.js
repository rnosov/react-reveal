/*
 * Carousel Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { number, element, node} from 'prop-types';
import Skin from './lib/CarouselSkin';

const
  propTypes = {
    skin: element,
    children: node.isRequired,
    wait: number,
    maxTurns: number,
  },
  defaultProps = {
    skin: <Skin />,
    wait: 5000,
    maxTurns: 2,
  };

class Carousel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prev: React.Children.count(this.props.children) - 1,
      next: 0,
      backwards: false,
      swap: false
    };
    this.turn = 0;
    this.handleReveal = this.handleReveal.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.target = this.target.bind(this);
  }

  target({target}) {
    let newPos = +target.getAttribute('data-index');
    this.setState({
      next: newPos,
      prev: this.state.next,
      backwards: newPos<this.state.next,
      swap: !this.state.swap
    });
  }

  handleReveal() {
    if (this.turn>=this.props.maxTurns)
      return;
    this.next();
  }

  move(newPos) {
    let pos = newPos;
    const count = React.Children.count(this.props.children);
    if (newPos >= count) {
      this.turn++
      pos = 0;
    }
    else if (newPos < 0)
      pos = count -1;
    this.setState({
      next: pos,
      prev: this.state.next,
      backwards: newPos<this.state.next,
      swap: !this.state.swap
    });
  }
//  d = Date.now();
  next() {
//    console.log('next', ~~((-this.d + Date.now())/1000));
    this.move(this.state.next + 1);
  }

  prev() {
    this.move(this.state.next - 1);
  }

  render() {
    const children = React.Children.toArray(this.props.children),
          count = children.length;
    if (count<2)
      return <div>{children}</div>;
    let { swap, prev, next, backwards } = this.state;
    next %= count; prev %= count;
    let before = children[swap ? prev : next];
    let after  = children[swap ? next : prev];
    return (
      <this.props.skin.type {...this.props.skin.props} api={{
        position: next,
        handleClick: this.target,
        total: count,
        props: this.props,
        next: this.next,
        prev: this.prev,
      }}>
        <before.type
          wait={this.props.wait}
          {...before.props}
          style={{
            position: 'static',
            left: 0,
            top: 0,
          }}
          opposite
          when={!swap}
          mirror={backwards}
          onReveal={!swap ? this.handleReveal : void 0}
        />
        <after.type
          wait={this.props.wait}
          {...after.props}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
          }}
          opposite
          when={swap}
          mirror={backwards}
          onReveal={swap ? this.handleReveal : void 0}
        />
      </this.props.skin.type>
    );
  }

}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;
export default Carousel;
