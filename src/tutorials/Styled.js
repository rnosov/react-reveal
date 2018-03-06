import React from 'react';
import Article from '../Article';
//import Code from '../Code';
import Editor from '../examples/Editor';
//import { Link } from 'react-router-dom';

function Tutorial() {
  return (
    <Article title="Working With Styled Components">
<p>
If you're using <a href="https://www.styled-components.com/">styled components</a> then you can use <code>react-reveal</code> to inject reveal functionality,
enter and leave animations for transition groups or make carousels out of styled components.
<code>react-reveal</code> has <code>withReveal</code> higher order function that can do just that.
</p>

<Editor stacked previewClass="text-center mb-4">{
`// This example is live editable
import makeCarousel from 'react-reveal/makeCarousel';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';

class Example extends React.Component {
  render() {
    const Title = withReveal(styled.h1\`
      font-size: 1.5em;
      text-align: center;
      color: palevioletred;

    \`, <Fade left/>);
    return (
      <Title>React Reveal</Title>
    );
  }
}
`
}</Editor>
    </Article>
  );
}

export default Tutorial;
