/*
 * ErrorBoundary Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Page from './Page';

class ErrorBoundary extends React.Component {

  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true });
    console.log('Error Boundary:', error.toString(), info);
    Page.event('error: ' + error.toString());
  }

  render () {
    if (this.state.hasError) {
      return(
        <div>
          <h1>Something went wrong.</h1>
          <p>You can try to refresh the page or try to use this site with javascript disabled.</p>
        </div>
      );
    }
    return this.props.children;
  }

}

export default ErrorBoundary;
