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
import 'prismjs/components/prism-jsx.min';
import 'prismjs/themes/prism.css';
import 'github-markdown-css';

class Code extends React.Component {

	componentDidMount() {
    window.document.querySelectorAll('code').forEach((block) => {
			Prism.highlightElement(block);
		});
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={{__html: this.props.children}} />
		);
	}

}

export default Code;
