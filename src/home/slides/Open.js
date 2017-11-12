import React from 'react';
import withReveal from 'react-reveal/withReveal';
import Fade from 'react-reveal/Fade';
import bg from '../assets/3.jpg';

function Open({ reveal }) {
  return reveal(<img alt="" src={bg} />);
}

export default withReveal(Open, Fade, { right: true, duration: 1000 });
