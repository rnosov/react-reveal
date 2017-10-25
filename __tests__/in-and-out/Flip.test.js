/*
 * Flip Component Test Suite
 *
 * Copyright © Roman Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Flip from '../../Flip';

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });


describe('Flip', () => {
  it('renders a initial view', () => {
    const content = shallow(
      <Flip bottom right>
        <div>Test test</div>
      </Flip>
    );
    expect(content.html()).toMatchSnapshot();
  });
});
