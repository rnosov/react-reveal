/*
 * Pulse Component Test Suite
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Pulse from '../../Pulse';

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Pulse', () => {
  it('renders a initial view', () => {
    const content = shallow(
      <Pulse>
        <div>Test test</div>
      </Pulse>
    );
    expect(content.html()).toMatchSnapshot();
  });
});
