/*
 * Zoom Component Test Suite
 *
 * Copyright © Roman Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Zoom from '../../Zoom';

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe('Zoom', () => {
  it('renders a initial view', () => {
    const content = shallow(
      <Zoom bottom right>
        <div>Test test</div>
      </Zoom>
    );
    expect(content.html()).toMatchSnapshot();
  });
});
