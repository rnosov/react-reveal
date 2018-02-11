/*
 * React Reveal Test Suite
 *
 * Copyright © Roman Nosov 2016, 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Reveal from '../Reveal';

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Reveal', () => {
  it('renders a initial view', () => {
    const content = shallow(
      <Reveal effect="123" >
        <div>Test test</div>
      </Reveal>
    );
    expect(content.html()).toMatchSnapshot();
  });
});
