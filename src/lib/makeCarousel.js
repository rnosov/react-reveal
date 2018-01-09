/*
 * makeCarousel Higher Order Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { number, node, bool} from 'prop-types';
import swipedetect from './swipedetect';

function makeCarousel(WrappedComponent, config = {}) {

  //const { wait = 5000,  maxTurns = 2, } = config;

  return class extends React.Component {

    static get propTypes() {
      return {
        children: node.isRequired,
        defaultWait: number,
        maxTurns: number,
        swipe: bool,
      };
    }

    static get defaultProps() {
      return {
        defaultWait: config.defaultWait || 5000,
        maxTurns: config.maxTurns || 2,
        swipe: config.swipe || true,
      };
    }

    constructor(props) {
      super(props);
      this.state = {
        //next: React.Children.count(this.props.children) - 1,
        current: 0,
        next: 1,
        backwards: false,
        swap: false
      };
      this.turn = 0;
      this.handleReveal = this.handleReveal.bind(this);
      this.handleSwipe = this.handleSwipe.bind(this);
      this.target = this.target.bind(this);
    }

    target({target}) {
      this.move(+target.getAttribute('data-position'));
    }

    handleReveal() {
      if (this.turn >= this.props.maxTurns)
        return;
      this.move(this.state.current + 1);
    }

    componentWillUnmount() {
      this.turn = -1;
    }

    move(newPos) {
      if (this.turn<0 || newPos === this.state.current)
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
        current: pos,
        next: this.state.current,
        backwards: newPos<this.state.current,
        swap: !this.state.swap
      });
    }

    handleSwipe(dir) {
      if (!this.props.swipe)
        return;
      if (dir === 'left')
        this.move(this.state.current + 1);
      else if (dir === 'right')
        this.move(this.state.current - 1);
    }

    componentDidMount() {
      //swipedetect(this.node, this.handleSwipe );
      swipedetect(this.beforeNode, this.handleSwipe );
      swipedetect(this.afterNode, this.handleSwipe );
    }

    render() {
      const { children } = this.props,
        arr = React.Children.toArray(children),
        count = arr.length;
      if (count<2)
        return children;
      let { swap, next, current, backwards } = this.state;
      current %= count; next %= count;
      let before = arr[swap ? next : current];
      let after  = arr[swap ? current : next];

      return (
        <WrappedComponent
          {...this.props}
          position={current}
          handleClick={this.target}
          total={count}
          children={[
            <div ref={ node => this.beforeNode = node } key={1} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: swap ? 1 : 2 }}>
              <before.type
                    wait={this.props.defaultWait}
                    {...before.props}
                    opposite
                    when={!swap}
                    mirror={backwards}
                    onReveal={!swap ? this.handleReveal : void 0}
                  />
            </div>,
            <div key={2} ref={ node => this.afterNode = node } style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: swap ? 2 : 1 }}>
              <after.type
                    wait={this.props.defaultWait}
                    {...after.props}
                    opposite
                    when={swap}
                    mirror={backwards}
                    onReveal={swap ? this.handleReveal : void 0}
                  />
            </div>
          ]}
        />
      );
    }

  };
}

export default makeCarousel;
