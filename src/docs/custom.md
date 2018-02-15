---
title: Custom CSS effects
---

If you want to use a custom CSS effect ( from animate.css for example) you'll need to import the `Reveal` class first.

```javascript
import Reveal from 'react-reveal/Reveal';
```

Then set the `effect` prop to a desired CSS animation class name. 

```jsx
<Reveal effect="fadeInUp">
  <p>Markup that will be revealed on scroll</p>
</Reveal>
```

You may also specify leaving animation class using `effectOut` prop. 

```jsx
<Reveal effect="fadeInUp" effectOut="fadeOutLeft">
  <p>Markup that will be revealed on scroll</p>
</Reveal>
```

`react-reveal` overrides a duration and delay of a custom effect (sets it to 1000 milliseconds by default) so you would need set the `duration` and `delay` prop if you want to customize it.

You can also use the rest of the [props](/docs/props). In addition there are out versions of some props: `durationOut`, `delayOut`, `countOut`, `foreverOut`

Have a look at this [example](/examples/common/custom/).

