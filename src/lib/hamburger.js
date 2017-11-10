/*
 * Hamburger Higher Order Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import responsive from './responsive';
import makeIcon from './HamburgerIcon';
import { animation } from './globals';

function hamburger(WrappedComponent, Effect, config) {

  let responsiveNode;

  function icon(iconProps) {
    if (!responsiveNode || responsiveNode.state.match)
      return void 0;
    return makeIcon(responsiveNode.state.isClicked, animation, responsiveNode.handleClick, iconProps);
  }

  const ResponsiveComponent = responsive(WrappedComponent, Effect, config);

  return function(props) {
    return (
      <ResponsiveComponent
        icon={icon}
        disableAboveBreakpoint
        {...props}
        ref={ (node) => responsiveNode = node }
      />
    );
  }

}

export default hamburger;
