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
      currentVer = '1.37';
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
        Page.event('version-check:' + currentVer);
        if (parseFloat(json.version) > parseFloat(currentVer))
          window.location.reload(true);
      }
      catch(e) {
        console.log('Version error:', e.toString());
        Page.event('version-error:' + e.toString());
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
    //Page.clicky(document.location.pathname, this.props.title, 'pageview');
    Page.fetchVer();
	}

  static event(title) {
    Page.clicky('#' + document.location.pathname, title);
  }

  static clicky(href, title, type) {
    if (window.clicky)
      window.clicky.log(href, title, type);
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
    const { className, title, children, style } = this.props;
    return (
        <div className={className} style={style}>
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

  window.clicky_site_ids = window.clicky_site_ids || [];
  window.clicky_site_ids.push(101102816);
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//static.getclicky.com/js';
  ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( s );
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;
export default Page;
