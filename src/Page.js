/*
 * Page Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { string, bool } from 'prop-types';
import Fade from 'react-reveal/Fade';
import Helmet from 'react-helmet';

const
  propTypes = {
    title: string.isRequired,
    scroll: bool,
    animate: bool,
  },
  defaultProps = {
  	//code: true,
    //	title: 'Untitled',
  };

class Page extends React.Component {

	componentDidMount() {
    if (this.props.scroll) //&& window.pageYOffset > 100)
    	Page.scroll();
    Page.gtag('event', this.props.title);
	}

	static gtag() {
  	if (window.dataLayer)
    	window.dataLayer.push(arguments);
	}

  static smoothScroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(Page.smoothScroll);
        window.scrollTo (0,currentScroll - (currentScroll/5));
      }
  }

  static scroll() {
    if ('requestAnimationFrame' in window)
      Page.smoothScroll();
    else
      window.scrollTo (0, 0);
  }

	render() {
		const { className, title, children } = this.props;
		return (
			<Fade disabled={!this.props.animate} force>
    		<div className={className}>
	  			<Helmet title={title} />
					{children}
			  </div>
	  	</Fade>
		);
	}

}

if (process.env.NODE_ENV === 'production') {
  let script = document.createElement('script');
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=UA-113142916-1";//UA-107416457-1";
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  Page.gtag('js', new Date());
  Page.gtag('config', 'UA-113142916-1');
  Page.gtag('event', 'App Load (1.0)');
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;
export default Page;
