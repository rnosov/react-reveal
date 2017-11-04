/*
 * HamburgerSkin Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

function HamburgerSkin({ content, icon, isActive, styles } ) {
  if (isActive) {
    //we're below breakpoint, hamburger is active
    return(
      <div style={styles.container} /* className="your-class" */>
        {icon({ style: styles.icon /* className: 'your-class' */ })}
        {content({ style: styles.activeContent /* className: 'your-class' */ })}
      </div>
    );
  }
  return content({ style: styles.inactiveContent /* className: 'your-class' */ });
}

export default HamburgerSkin;
