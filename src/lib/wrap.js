/*
 * React-reveal Wrap Helper
 *
 * Copyright © Roman Nosov 2018
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import RevealBase from '../RevealBase';

export default function wrap(props, factory, children) {
  if (React.Children.count(children) === 1)
    return  <RevealBase {...props} in={factory(false)} out={factory(true)} children={children} />
  children = React.Children.map(children, child =>
    <RevealBase {...props} in={factory(false)} out={factory(true)} children={child} />
  );
  return 'Fragment' in React ? <React.Fragment>{children}</React.Fragment> : <span>{children}</span>;
}
