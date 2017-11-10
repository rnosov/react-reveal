/*
 * Sidebar Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Fade from 'react-reveal/Fade';
import responsive from 'react-reveal/responsive';

function Sidebar({ items, reveal, belowBreakpoint, isToggled, toggle }) {
  let button;
  if (belowBreakpoint)
      button = (
        <div className={ isToggled ? 'dropup' : '' }>
          <button
            style={{ width: '8rem' }}
            onClick={toggle}
            className={`mb-3 btn btn-outline-primary dropdown-toggle`}
            type="button"
          >
            Show { isToggled ? 'Less' : 'More' }
          </button>
        </div>
      );
  return (
    <div>
      {button}
      {reveal(
        <div className="list-group">
          {items}
        </div>
      )}
    </div>
  );
}

export default responsive(Sidebar, Fade, { bottom: true, cascade: true, force: true, duration: 1200 });
