/*
 * Carousel Test Suite
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Carousel from '../Carousel';
import Fade from '../Fade';

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe('Carousel', () => {
  it('renders a initial view', () => {
    const content = shallow(
      <Carousel>
        <Fade>Test test</Fade>
        <Fade>Test test</Fade>
      </Carousel>
    );
    expect(content.html()).toMatchSnapshot();
  });
});
