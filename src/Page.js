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
//import Fade from 'react-reveal/Fade';
import Helmet from 'react-helmet';

const trackingId = 'UA-113142916-1',
      currentVer = '1.28';
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

let refresh = false;
window.setInterval( () => refresh = true, 1800000);

class Page extends React.Component {

  static async fetchVer()
  {
    if (refresh){
      refresh = false;
      try {
        const response = await fetch('/manifest.json');
        const json = await response.json();
        Page.gtag('event','version check', { 'event_category' : 'page', 'event_label' : currentVer });
        if (parseFloat(json.version) > parseFloat(currentVer))
          window.location.reload(true);
      }
      catch(e) {
        console.log('Version error:', e.toString());
        Page.gtag('event','version error', { 'event_category' : 'errors', 'event_label' : e.toString() });
      }
    }
  }

	componentDidMount() {
    if (this.props.scroll) //&& window.pageYOffset > 100)
    	Page.scroll();
    Page.gtag('config', trackingId, {
      send_page_view: true,
      page_path: document.location.pathname,
      page_title: this.props.title,
      page_referrer: document.referrer,
    });
    Page.fetchVer();
	}

	static gtag() {
    //console.log(arguments);
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
			//<Fade disabled={!this.props.animate} force>
	  	//</Fade>
    const { className, title, children } = this.props;
    return (
        <div className={className}>
          <Helmet title={title} />
          {children}
        </div>
		);
	}

}

if (process.env.NODE_ENV === 'production') {
  let script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + trackingId;//UA-107416457-1";
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  Page.gtag('js', new Date());
  Page.gtag('config', trackingId, { 'send_page_view': false });
  Page.gtag('event', `App Load (${currentVer})`, {'non_interaction': true } );
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;
export default Page;
