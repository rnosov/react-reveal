/*
 * Article Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Page from './Page';
import Code from './Code';

function Article({ title, content, children }) {
  return (
    <Page scroll className='markdown-body' title={title} style={{minHeight: '100vh'}}>
      <h1>{title}</h1>
      {content ? (<Code>{content}</Code>) : children}
    </Page>
  );
}

export default Article;
