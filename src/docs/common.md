---
title: Common Effects
---

Here is the handy list of different effects for you to try. 
Some effects have attributes to them (like left or right versions). They can can be combined with other props (see docs further down).

**Fade**
```jsx
// Don't forget to import the effect first! 
// It's more efficient to import it from a dedicated file
import Fade from 'react-reveal/Fade'; 

<Fade>Your content goes here</Fade>
<Fade bottom>Your content goes here</Fade>
<Fade bottom big>Your content goes here</Fade>
<Fade left>Your content goes here</Fade>
<Fade left big>Your content goes here</Fade>
<Fade right>Your content goes here</Fade>
<Fade right big>Your content goes here</Fade>
<Fade top>Your content goes here</Fade>
<Fade top big>Your content goes here</Fade>
```

**Flip**
```jsx
import Flip from 'react-reveal/Flip'; 

<Flip>Your content goes here</Flip>
<Flip x>Your content goes here</Flip>
<Flip y>Your content goes here</Flip>
```

**Rotate**
```jsx
import Rotate from 'react-reveal/Rotate'; 

<Rotate>Your content goes here</Rotate>
<Rotate bottom left>Your content goes here</Rotate>
<Rotate bottom right>Your content goes here</Rotate>
<Rotate top left>Your content goes here</Rotate>
<Rotate top right>Your content goes here</Rotate>
```

**Zoom**
```jsx
import Zoom from 'react-reveal/Zoom'; 

<Zoom>Your content goes here</Zoom>
```

If you need any more bespoke animations in your React app then this the author of this package is available for hire. The email to contact is rnosov@gmail.com

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
