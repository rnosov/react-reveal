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
import responsive from './responsive';

function Sidebar({ mounted, items, reveal, belowBreakpoint, isToggled, toggle }) {
  let button;
  if (belowBreakpoint && items.length < 2)
    return <div />;
  if (belowBreakpoint)
      button = (
        <div className={ isToggled ? 'dropup' : '' }>
          <button
            style={{ width: '12rem' }}
            onClick={toggle}
            className={`mb-3 btn btn-outline-primary dropdown-toggle`}
            type="button"
          >
            { isToggled ? 'Hide' : 'Show' } Article Index
          </button>
        </div>
      );
  return (
    <div className={mounted || items.length > 1 ?undefined:'d-none d-md-block'}>
      {button}
      {reveal(
        <Fade appear={items.length>3}  bottom cascade force duration={300 + items.length*100}>
          <div className="list-group">
            {items}
          </div>
        </Fade>
      )}
    </div>
  );
}

export default responsive(Sidebar);
