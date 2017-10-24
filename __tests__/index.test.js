/*
 * index Test Suite
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Reveal, { Zoom, Fade, Flip, Rotate } from '../';

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe('index', () => {
  it('renders a initial view', () => {
    const content = shallow(
      <Reveal effect="some-effect" className="someClass" style={{ border: '1px solid red'}} props={{src: '/example.com'}}>
        <Zoom> Zoom Test test</Zoom>
        <Fade> Fade Test test</Fade>
        <Flip>Flip Test test</Flip>
        <Rotate> Rotate Test test</Rotate>
      </Reveal>
    );
    expect(content.html()).toMatchSnapshot();
  });
});
