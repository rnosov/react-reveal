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

//import 'prismjs/plugins/line-numbers/prism-line-numbers'
//import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

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

  static highlight() {
    const codes = window.document.querySelectorAll('pre>code');
    for (let i = 0, len = codes.length; i < len; i++)
      Prism.highlightElement(codes[i]);
    const linkes = window.document.querySelectorAll('.markdown-body a');
    for (let i = 0, len = linkes.length; i < len; i++)
      linkes[i].onclick = this.handleLink;
  }

  componentDidMount() {
    Code.highlight();


    //window.document.querySelectorAll('code').forEach((block) => {
    //  Prism.highlightElement(block);
    //});
    //window.document.querySelectorAll('.markdown-body a').forEach((block) => {
    //  block.onclick = this.handleLink;
    //});
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.children}} />
    );
  }

}

//window.setTimeout( Code.highlight, 30);

export default withRouter(Code);
