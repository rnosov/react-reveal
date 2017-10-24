/*
 * Flash Component Test Suite
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Flash from '../../Bounce';

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe('Flash', () => {
  it('renders a initial view', () => {
    const content = shallow(
      <Flash>
        <div>Test test</div>
      </Flash>
    );
    expect(content.html()).toMatchSnapshot();
  });
});
