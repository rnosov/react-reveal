/*
 * navMap Auxiliary Function For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

export default function navMap({ prefix = '/', linkClass = 'list-group-item list-group-item-action', itemClass = false, }, navs) {
	return navs.map( ({ title, to, rootPrefix }, index) => {
		to = to || title.replace(/\s+/g, '-').toLowerCase();
		const link = index
	  	?	<NavLink
	  			key={index}
	  		  to={ `${prefix}${to}/` }
	  		  className={linkClass}
	  		  activeClassName="active"
	  		>
	  		  {title}
	  		</NavLink>
	  	: <IndexLink
	  			key={index}
	  			prefix={prefix}
	  			to={to}
	  		  rootPrefix={ rootPrefix }
	  		  className={linkClass}
	  		  activeClassName="active"
	  		>
	  			{title}
	  		</IndexLink>

	  ;
	  return itemClass ? <li key={index} className={itemClass}>{link}</li> : link;
	});
}

function IndexLink({ rootPrefix, prefix, to, className, activeClassName, ...props }) {
	return <Route
					exact
	  		  path={ rootPrefix || `${prefix}(${to}.*)?` }
	  		  children={ ({match}) => (
	  		  	<Link
	  		  		{...props}
	  		  		className={className + (match? ' ' +activeClassName:'')} to={prefix+to+'/'}
	  		  	/>
	  		  )}
	  		/>;
}
