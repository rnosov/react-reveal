---
title: Common Effects
---

Here is the list of different effects reveal effects. Every component can have a number of different attributes (like left or right versions). See [examples](/examples/common/) for details. You can also use the rest of component [props](/docs/props/).

### Fade

[Live demo](/examples/common/Fade)

```jsx
import Fade from 'react-reveal/Fade';

<Fade>
  <h1>
    Your content goes here
  </h1>
</Fade>
```

### Flip

[Live demo](/examples/common/Flip)

```jsx
import Flip from 'react-reveal/Flip';

<Flip>
  <h1>
    Your content goes here
  </h1>
</Flip>
```

### Rotate

[Live demo](/examples/common/Rotate)

```jsx
import Rotate from 'react-reveal/Rotate';

<Rotate>
  <h1>
    Your content goes here
  </h1>
</Rotate>
```

### Zoom

[Live demo](/examples/common/Zoom)

```jsx
import Zoom from 'react-reveal/Zoom';

<Zoom>
  <h1>
    Your content goes here
  </h1>
</Zoom>
```

### Bounce

[Live demo](/examples/common/Bounce)

```jsx
import Bounce from 'react-reveal/Bounce';

<Bounce>
  <h1>
    Your content goes here
  </h1>
</Bounce>
```

### Slide

[Live demo](/examples/common/Slide)

```jsx
import Slide from 'react-reveal/Slide';

<Slide>
  <h1>
    Your content goes here
  </h1>
</Slide>
```

### Roll

[Live demo](/examples/common/Roll)

```jsx
import Roll from 'react-reveal/Roll';

<Roll>
  <h1>
    Your content goes here
  </h1>
</Roll>
```

### LightSpeed

[Live demo](/examples/common/LightSpeed)

```jsx
import LightSpeed from 'react-reveal/LightSpeed';

<LightSpeed>
  <h1>
    Your content goes here
  </h1>
</LightSpeed>
```

## Unwanted Scrollbars

Please note that some reveal effects might create unwanted scrollbars for a short time. 
If you want to avoid it set `overflow` attribute of a containing div to `hidden`.

```jsx
<div style={{overflow: 'hidden'}}>
  <Fade right big>
    <p>Markup that will be revealed on scroll</p>
  </Fade>
</div>
```

You can also do it using CSS.
