/*
 * Code Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Prism from 'prismjs';
import { withRouter } from 'react-router-dom';

import 'prismjs/components/prism-jsx.min';
import 'prismjs/themes/prism.css';
import 'github-markdown-css';

class Code extends React.Component {

  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  handleLink(e) {
    const href = e.target.getAttribute('href');
    if (href[0]==='/') {
      this.props.history.push(e.target.getAttribute('href'));
      e.preventDefault();
      return false;
    }
    return true;
  }

	componentDidMount() {
    window.document.querySelectorAll('code').forEach((block) => {
			Prism.highlightElement(block);
		});
    window.document.querySelectorAll('.markdown-body a').forEach((block) => {
      block.onclick = this.handleLink;
    });
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={{__html: this.props.children}} />
		);
	}

}

export default withRouter(Code);
