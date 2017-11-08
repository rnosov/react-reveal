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

You can liven it up a bit by using `cascade` prop ( even without breaking you markup ):

```jsx
import Fade from 'react-reveal/Fade'; 

<Fade bottom cascade tag="ul" className="some-class">
  <li>First Item</li>
  <li>Another Item</li>
  <li>Last Item</li>
</Fade>
```