# React Reveal

## Introduction
[React Reveal](https://www.npmjs.com/package/react-reveal) is a dead simple way to add some cool reveal on scroll animations to your React app. It's less than 2kb gzipped and has no external dependencies apart from React Proptypes and Babel Runtime (it's very likely you already have them). It's specifically written for React in ES6. If you like this package don't forget to star the [Github project](https://github.com/rnosov/react-reveal)!

## Demo 

- [Dedicated demo](https://rnosov.github.io/react-reveal-demo/)
- [Live production site](https://www.solarleague.org/) 

Scroll down to see the reveal animation on these sites.

## Quick Start

In the command prompt run:

```sh
npm install react-reveal --save

```

Alternatively you may use `yarn`:

```sh
yarn add react-reveal
```

Import a required effect from [React Reveal](https://www.npmjs.com/package/react-reveal) in to your project. We'll use `Zoom` effect in the following example:

```javascript
import { Zoom } from 'react-reveal';
```

Place the following code somewhere in your `render` method: 

```jsx
<Zoom>
  <p>Markup that will be revealed on scroll</p>
</Zoom>
``````

You should see zooming animation that reveals text inside the tag. You can change this text to any JSX you want. 

It might a bit difficult to see what is actually happening so let's make the effect a little bit more pronounced. Note that the `key` prop is needed by React as the element is being repeated.

```jsx
<div>
  {Array(100).fill(void 0).map( (val, index) =>  
    <Zoom key={index}>
      <p>Markup that will be revealed on scroll</p>
    </Zoom>
  )}
</div>
```

Scroll down to see the reveal effect. It should be a lot clearer by now what is happening. 

## List Of Reveal Effects

Here is the handy list of different effects for you to try. Don't forget to import them first!

| Effect           | Import                                         | Example Usage |
| ---------------- | --------------------------------------------   |----------------------------------------------------------|
| Fade             | `import { Fade } from 'react-reveal';`            |  `<Fade>Your content goes here</Fade>`|
| SlideDown        | `import { SlideDown } from 'react-reveal';`       |  `<SlideDown>Your content goes here</SlideDown>`|
| SlideDownBig     | `import { SlideDownBig } from 'react-reveal';`    |  `<SlideDownBig>Your content goes here</SlideDownBig>`|
| SlideLeft        | `import { SlideLeft } from 'react-reveal';`       |  `<SlideLeft>Your content goes here</SlideLeft>`|
| SlideRight       | `import { SlideRight } from 'react-reveal';`      |  `<SlideRight>Your content goes here</SlideRight>`|
| SlideRightBig    | `import { SlideRightBig } from 'react-reveal';`   |  `<SlideRightBig>Your content goes here</SlideRightBig>`|
| SlideUp          | `import { SlideUp } from 'react-reveal';`         |  `<SlideUp>Your content goes here</SlideUp>`|
| SlideUpBig       | `import { SlideUpBig } from 'react-reveal';`      |  `<SlideUpBig>Your content goes here</SlideUpBig>`|
| Flip             | `import { Flip } from 'react-reveal';`            |  `<Flip>Your content goes here</Flip>`|
| FlipY            | `import { FlipY } from 'react-reveal';`           |  `<FlipY>Your content goes here</FlipY>`|
| FlipX            | `import { FlipX } from 'react-reveal';`           |  `<FlipX>Your content goes here</FlipX>`|
| Rotate           | `import { Rotate } from 'react-reveal';`          |  `<Rotate>Your content goes here</Rotate>`|
| RotateDownLeft   | `import { RotateDownLeft } from 'react-reveal';`  |  `<RotateDownLeft>Your content goes here</RotateDownLeft>`|
| RotateDownRight  | `import { RotateDownRight } from 'react-reveal';` |  `<RotateDownRight>Your content goes here</RotateDownRight>`|
| RotateUpLeft     | `import { RotateUpLeft } from 'react-reveal';`    |  `<RotateUpLeft>Your content goes here</RotateUpLeft>`|
| RotateUpRight    | `import { RotateUpRight } from 'react-reveal';`   |  `<RotateUpRight>Your content goes here</RotateUpRight>`|
| Zoom             | `import { Zoom } from 'react-reveal';`            |  `<Zoom>Your content goes here</Zoom>`|

If you need any more bespoke animations in your React app then this the author of this package is available for hire. The email to contact is rnosov@gmail.com

Please note that some reveal effects might create unwanted scrollbars for a short time. 
If you want to avoid it set `overflow` attribute of a containing div to `hidden`.

```jsx
<div style={{overflow: 'hidden'}}>
  <SlideRightBig>
    <p>Markup that will be revealed on scroll</p>
  </SlideRightBig>
</div>
```

You can also do it using CSS.

## Documentation

### Reveal Component

By now you should be able to use this package without any problem. If you want to know how things work in detail then keep reading. 

To implement custom reveal effects we'll need the `Reveal` base component and its `effect` property. First, in order to use it we need to import it:

```javascript
import Reveal from 'react-reveal';
```

Lets try to implement custom rotation. We'll do this by using `rotate(360deg)` transform function: 

```jsx
<Reveal effect={{ transform: "rotate(360deg)" }}>  
  <p>Markup that will be revealed on scroll</p>  
</Reveal>
```

Or with the repeated list:

```jsx
<div style={{overflow: 'hidden'}}>
  {Array(100).fill(void 0).map( (val, index) =>  
    <Reveal effect={{ transform: "rotate(360deg)" }} key={index} > 
      <p>Markup that will be revealed on scroll</p>  
    </Reveal>
  )}
</div>
```

You can play with the `360deg` parameter to adjust the rotation angle. 

To learn more about transform functions go to its [MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function).

### CSS Based Animations

If you already have animations effects in your CSS then just set effect property to its class name. For example, if you're using [Animate.css](https://daneden.github.io/animate.css/) try the following code: 

```jsx
<Reveal effect="animated fadeInUp">
  <p>Markup that will be revealed on scroll</p>
</Reveal>
```


### Reveal Properties

- `effect` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** or **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/object)** This prop could be either an object describing a desired reveal effect  or a string containing CSS animation class (for example "animated fadeInUp" from  animate.css). If you don't specify it a default fade in effect will apply. **Optional**.
- `transition` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Read about it [here](https://developer.mozilla.org/en-US/docs/Web/CSS/transition). Useful for adjusting animation duration (second value), easing curve (third value) or animation delay (last value) Defaults to `all 1s ease 0s`. **Optional**.
- `fraction` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Fraction of the revealed element height that must be visible in order for reveal animation to trigger. Should be some value between 0 to 1. Defaults to `0.20` meaning that at least 20% of the element must be visible before the reveal. **Optional**.
- `ssr` **[bool](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Use this option to suppress flickering during server side rendering. Off by default. **Optional**.
- `throttleTimeout` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Timeout in milliseconds between running reveal event handler. Defaults to `66` **Optional**.
- `onReveal` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Function called once the element is revealed. **Optional**.

These props will work with effect aliases ( `<Zoom />`, `<Rotate />`, etc ) as well.

### Children

You should pass at least one child to this component. If you don't do it then lorem ipsum placeholder text will be generated.

### Other Props 

All props that do not belong to `Reveal` class will be passed down to a `div` tag (including `className` and `style`). For example:

```jsx

<div className="some-class">
  <p>Markup that will be revealed on scroll</p>
</div>
```

Change `div` to `Reveal` and add a desired effect. 
All other other props will be passed down 

```jsx
<Reveal className="some-class">
  <p>Markup that will be revealed on scroll</p>
</Reveal>
```

### Universal Rendering

This component is compatible with universal or server side rendering (SSR). You might want to enable ssr flag if you have any issues with flickering on page startup.

```jsx
<Reveal ssr>
  <div>Markup that will be revealed on scroll</div>
</Reveal>
```

## Forking This Package

Clone the this repository using the following command:

```sh
git clone https://github.com/rnosov/react-reveal.git
```

In the cloned directory, you can run following commands:

```sh
npm install
```

Installs required node modules

```sh
npm run build
```

Builds the package for production to the `dist` folder

```sh
npm test
```

Runs tests

## License

Copyright © 2017 Roman Nosov. Project source code is licensed under the MIT license.
