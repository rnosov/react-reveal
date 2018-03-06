---
title: Higher Order Components
---

If you ever find yourself constantly keep using same `<Fade />`, `<Zoom />` and other effects with a particular component you can directly inject `react-reveal` functionality into the component. You'd
do it with a higher order function called `withreveal`. In order to use it, you have to import it first alongside with a desired effect (will use `Fade` as example):

```jsx
import makeCarousel from 'react-reveal/makeCarousel';
import Fade from 'react-reveal/Fade';
```

then use it like so
```jsx
const NewComponent = withReveal(OldComponent, <Fade left />);
```

Now `NewComponent` will be automatically wrapped with `<Fade left />` effect. 
The good thing about it is that you can now use `NewComponent` as if it was `react-reveal` component 
( say in transition groups or carousels ). `withReveal` will intelligently remap props of `NewComponent` to make it possible. The following props will be extracted and passed to the chosen `react-reveal` effect:

- force
- mountOnEnter
- unmountOnExit
- opposite
- mirror
- wait
- onReveal
- in
- when
- spy
- collapse
- onExited
- enter
- exit
- appear

`withReveal` will wrap your component in a `div` tag for it to work. If you don't want that 
then you can [expose DOM ref](https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) to `react-reveal`. You do that by using `refProp` prop. Consider following custom React Component:

```jsx
function OldComponent({ innerRef, className, style }) {
  return (<div ref={innerRef} className={className} style={style}>Some content</div>);
}
```

And then you can inject reveal functionality using following code:

```jsx
const NewComponent = withReveal(OldComponent, <Fade left refProp="innerRef" />);
```

In this case, `react-reveal` will not insert any tags and will use the exposed HTML element. Many React components such as, Styled Components or React Router links already expose their refs via `innerRef` prop.
Styled Components will be detected automatically and `refProp` will be set accordingly.


