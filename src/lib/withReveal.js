/*
 * withReveal Auxiliary Function For Making react-reveal Higher Order Components
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

function withReveal(WrappedComponent, effect) {
  let refProp = undefined;
  if (typeof WrappedComponent === 'function' && typeof WrappedComponent.styledComponentId === 'string')
    refProp = "innerRef";
  return function({
    force,
    mountOnEnter,
    unmountOnExit,
    opposite,
    mirror,
    wait,
    onReveal,
    in: inProp,
    when,
    spy,
    collapse,
    onExited,
    enter,
    exit,
    appear,
    //disableObserver,
    ...props
  }) {
    return (
      <effect.type
        force={force}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        opposite={opposite}
        mirror={mirror}
        wait={wait}
        onReveal={onReveal}
        in={inProp}
        when={when}
        spy={spy}
        collapse={collapse}
        onExited={onExited}
        enter={enter}
        exit={exit}
        appear={appear}
        //disableObserver={disableObserver}
        {...effect.props}
        refProp={refProp}
      >
        <WrappedComponent {...props} />
      </effect.type>
    );
  }

}

export default withReveal;
