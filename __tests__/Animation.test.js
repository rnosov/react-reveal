/*
 * Animation Test Suite
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Animation from '../Animation';

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Animation', () => {
  it('renders a initial view', () => {
    const content = shallow(
      <Animation steps={Animation.step("1", 1000).step("2", 2000)}>
        <div>Test test</div>
      </Animation>
    );
    expect(content.html()).toMatchSnapshot();
  });
});
