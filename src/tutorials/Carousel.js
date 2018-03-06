import React from 'react';
import Article from '../Article';
import Code from '../Code';
import Editor from '../examples/Editor';
//import { Link } from 'react-router-dom';

function Tutorial() {
  return (
    <Article title="Making A Carousel">
<p>
One interesting feature of the <code>react-reveal</code> is that you can use it to create carousels.
Of course, there are many carousels available but if you're using <code>react-reveal</code> most of
the code is already there so there would be no need to add another depedency.
Instead of using massive JSON configs to customize every single aspect of a carousel, <code>react-reveal</code>
is using higher order component pattern to inject carousel functionality into your components!
So you could customize absolutely everything if you wish to. To make a carousel you'll need to import
a <code>makeCarousel</code> function first.
</p>

<Code>
{
`<pre class="language-jsx">
<code class="language-jsx">import makeCarousel from 'react-reveal/makeCarousel';
// we'll need the Slide component for sliding animations
// but you can use any other effect
import Slide from 'react-reveal/Slide';
// we'll use styled components for this tutorial
// but you can use any other styling options ( like plain old css )
import styled, { css } from 'styled-components';</code>
</pre>
`
}
</Code>
<p>
  Then you'll need to write a UI for the carousel. It's not as difficult as it sounds.
  Let's start with a very simple Carousel without any UI at all.
</p>

<Editor noInline stacked previewClass="text-center mb-4">{
`const Container = styled.div\`
  border: 1px solid red;
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 150px;
\`;
const CarouselUI = ({ children }) => <Container>{children}</Container>;
const Carousel = makeCarousel(CarouselUI);

render (
  <Carousel defaultWait={1000} /*wait for 1000 milliseconds*/ >
    <Slide right>
      <div>
        <h1>Slide 1</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
    <Slide right>
      <div>
        <h1>Slide 2</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
  </Carousel>
);
`
}</Editor>

<p>
  Let's add directonal arrows that would help us to navigate carousel.
  <code>makeCarousel</code> inject props <code>position</code> and <code>handleClick</code>
  that we'll be using. <code>position</code> is the current slide position and
  <code>handleClick</code> is the event handler that moves carousel. The position which carousel is
  being moved to is taken from <code>data-position</code> attribute.


</p>

<Editor noInline stacked previewClass="text-center mb-4">{
`const width = '300px', height='150px';
const Container = styled.div\`
  border: 1px solid red;
  position: relative;
  overflow: hidden;
  width: $\{width};
  height: $\{height};
\`;
const Arrow = styled.div\`
  text-shadow: 1px 1px 1px #fff;
  z-index: 100;
  line-height: $\{height};
  text-align: center;
  position: absolute;
  top: 0;
  width: 10%;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  $\{props => props.right ? css\`left: 90%;\` : css\`left: 0%;\`}
\`;
const CarouselUI = ({ position, handleClick, children }) => (
  <Container>
      {children}
      <Arrow onClick={handleClick} data-position={position - 1}>{'<'}</Arrow>
      <Arrow right onClick={handleClick} data-position={position + 1}>{'>'}</Arrow>
  </Container>
);
const Carousel = makeCarousel(CarouselUI);

render (
  <Carousel>
    <Slide right>
      <div>
        <h1>Slide 1</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
    <Slide right>
      <div>
        <h1>Slide 2</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
    <Slide right>
      <div>
        <h1>Slide 3</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
  </Carousel>
);
`
}</Editor>

<p>
Here is the full template ( with the dots ) that you can use. The beauty of it is that you can configure each
  and every aspect of the carousel.
</p>

<Editor noInline stacked previewClass="text-center mb-4">{
`const width = '300px', height='150px';
const Container = styled.div\`
  border: 1px solid red;
  position: relative;
  overflow: hidden;
  width: $\{width};
\`;
const Children  = styled.div\`
  width: $\{width};
  position: relative;
  height: $\{height};
\`;
const Arrow = styled.div\`
  text-shadow: 1px 1px 1px #fff;
  z-index: 100;
  line-height: $\{height};
  text-align: center;
  position: absolute;
  top: 0;
  width: 10%;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  $\{props => props.right ? css\`left: 90%;\` : css\`left: 0%;\`}
\`;
const Dot = styled.span\`
  font-size: 1.5em;
  cursor: pointer;
  text-shadow: 1px 1px 1px #fff;
  user-select: none;
\`;
const Dots = styled.span\`
  text-align: center;
  width: $\{width};
  z-index: 100;
\`;
const CarouselUI = ({ position, total, handleClick, children }) => (
  <Container>
    <Children>
      {children}
      <Arrow onClick={handleClick} data-position={position - 1}>{'<'}</Arrow>
      <Arrow right onClick={handleClick} data-position={position + 1}>{'>'}</Arrow>
    </Children>
    <Dots>
      {Array(...Array(total)).map( (val, index) =>
        <Dot key={index} onClick={handleClick} data-position={index}>
          {index === position ? '● ' : '○ ' }
        </Dot>
      )}
    </Dots>
  </Container>
);
const Carousel = makeCarousel(CarouselUI);

render (
  <Carousel>
    <Slide right>
      <div>
        <h1>Slide 1</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
    <Slide right>
      <div>
        <h1>Slide 2</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
    <Slide right>
      <div>
        <h1>Slide 3</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
  </Carousel>
);
`
}</Editor>

<p>
There are several props that you can use with your new carousel:
</p>
<ul>
  <li><code>defaultWait</code> - a number of milliseconds that carousel should wait before moving to the next slide.
  You can override it individually for every slide by using <code>wait</code> prop. Defaults to 5000.</li>
  <li><code>maxTurns</code>- a number of turns of a carousel. Defaults to 5.</li>
  <li><code>swipe</code> - a boolean value indicating whether to enable swipe gestures on mobile. Defaults to true</li>
</ul>

    </Article>
  );
}

export default Tutorial;
