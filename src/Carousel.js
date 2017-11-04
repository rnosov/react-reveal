/*
 * Carousel Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { number, func, node} from 'prop-types';
import Skin from './lib/CarouselSkin';

const
  propTypes = {
    skin: func,
    children: node.isRequired,
    wait: number,
    maxTurns: number,
  },
  defaultProps = {
    skin: Skin,
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
    this.target = this.target.bind(this);
  }

  target({target}) {
    this.move(+target.getAttribute('data-position'));
  }

  handleReveal() {
    if (this.turn>=this.props.maxTurns)
      return;
    this.move(this.state.next + 1);
  }

  componentWillUnmount() {
    this.turn = -1;
  }

  move(newPos) {
    if (this.turn<0 || newPos === this.state.next)
      return;
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

  render() {
    const { children, ...props } = this.props,
      arr = React.Children.toArray(children),
      count = arr.length;
    if (count<2)
      return children;
    let { swap, prev, next, backwards } = this.state;
    next %= count; prev %= count;
    let before = arr[swap ? prev : next];
    let after  = arr[swap ? next : prev];
    return (
      <this.props.skin
        {...props}
        position={next}
        handleClick={this.target}
        total={count}
        prev={<before.type
                  wait={this.props.wait}
                  {...before.props}
                  opposite
                  when={!swap}
                  mirror={backwards}
                  onReveal={!swap ? this.handleReveal : void 0}
                />}
        next={<after.type
                  wait={this.props.wait}
                  {...after.props}
                  opposite
                  when={swap}
                  mirror={backwards}
                  onReveal={swap ? this.handleReveal : void 0}
                />}
      />
    );
  }

}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;
export default Carousel;
