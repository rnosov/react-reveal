/*
 * React Reveal Test Suite
 *
 * Copyright © Roman Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import Reveal from '../src/';


describe('Reveal', () => {
  it('renders a initial view', () => {
    const content = mount(
      <Reveal effect="123">
        <div>Test test</div>
      </Reveal>
    );
    expect(content.html()).toMatchSnapshot();
  });
});
