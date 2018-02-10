---
title: Cascading effects 
---
One cool feature of `react-reveal` is the ability to easily create cascading reveal effects. It can be handy if you want animate some boring looking lists. Say you have list like this:

```jsx
<ul className="some-class">
  <li>First Item</li>
  <li>Another Item</li>
  <li>Last Item</li>
</ul>
```

You can liven it up a bit by using `cascade` prop:

```jsx
import Fade from 'react-reveal/Fade'; 

<Fade top cascade>
  <ul className="some-class">
    <li>First Item</li>
    <li>Another Item</li>
    <li>Last Item</li>
  </ul>
</Fade>
```

You can also cascade reveal strings of text ( such as headings and so on ):

```jsx
import Fade from 'react-reveal/Fade'; 

<Fade top cascade>
  <h1>Text to reveal</h1>
</Fade>
```

Every letter will be revealed separately in a cascade.

Note that the `duration` prop will be doubled for the cascade effects. So the by default the overall duration will be 2000 milliseconds. If you set `duration` prop to 3000 milliseconds and enable cascade then the actual duration will be 6000 milliseconds.
