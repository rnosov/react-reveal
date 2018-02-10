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
    Page.gtag('event','error', { 'event_category' : 'errors', 'event_label' : error.toString() });
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
