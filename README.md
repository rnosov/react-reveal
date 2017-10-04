# React Reveal

## Introduction
[React Reveal](https://www.npmjs.com/package/react-reveal) is a dead simple way to add some cool reveal on scroll animations to your React app. It's less than 2kb gzipped and written for React from scratch in ES6. If you like this package don't forget to star the [Github project](https://github.com/rnosov/react-reveal)!

## Demo 

- [Live demo](https://rnosov.github.io/react-reveal-demo/)
- [Production site](https://www.solarleague.org/) 

## Documentation

### Installation

In the command prompt run:

```sh
npm install react-reveal --save
```

Alternatively you may use `yarn`:

```sh
yarn add react-reveal
```

### Quick Start

Import effects from [React Reveal](https://www.npmjs.com/package/react-reveal) to your project. 

```javascript
import { Fade, Flip, Rotate, Zoom } from 'react-reveal';
```

Lets try `Zoom` effect first. Place the following code somewhere in your `render` method: 

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

### List Of Reveal Effects

Here is the handy list of different effects for you to try. 
Some effects have attributes to them (like left or right versions). They can can be combined with other Reveal props (see docs further down).

```jsx
<Fade>Your content goes here</Fade>
<Fade down>Your content goes here</Fade>
<Fade down big>Your content goes here</Fade>
<Fade left>Your content goes here</Fade>
<Fade left big>Your content goes here</Fade>
<Fade right>Your content goes here</Fade>
<Fade right big>Your content goes here</Fade>
<Fade up>Your content goes here</Fade>
<Fade up big>Your content goes here</Fade>
<Flip>Your content goes here</Flip>
<Flip x>Your content goes here</Flip>
<Flip y>Your content goes here</Flip>
<Rotate>Your content goes here</Rotate>
<Rotate down left>Your content goes here</Rotate>
<Rotate down right>Your content goes here</Rotate>
<Rotate up left>Your content goes here</Rotate>
<Rotate up right>Your content goes here</Rotate>
<Zoom>Your content goes here</Zoom>
```

If you need any more bespoke animations in your React app then this the author of this package is available for hire. The email to contact is rnosov@gmail.com

### Reveal Waves

One cool feature of `react-reveal` is the ability to easily create wavelike reveal effects. It can be handy if you want animate some boring looking lists. Say you have list like this:

```jsx
<ul className="some-class">
  <li>First Item</li>
  <li>Another Item</li>
  <li>Last Item</li>
</ul>
```

You can liven it up a bit by using `wave` prop ( even without breaking you markup ):

```jsx
<Fade up wave tag="ul" className="some-class">
  <li>First Item</li>
  <li>Another Item</li>
  <li>Last Item</li>
</Fade>
```

### Timing Of Reveals

If several of Reveal effects are likely to happen simultaneously you might want for them to happen sequentially. In such case, you should use `delay` prop. You can also adjust a duration of effect animation by using `duration` prop. Both `delay` and `duration` are specified in a number of milliseconds.

```jsx
<Zoom delay={500} duration={3000}>
  <p>Markup that will be revealed first</p>
</Zoom>
<Zoom delay={4000}>
  <p>Markup that will be revealed a bit later</p>
</Zoom>
```

### Web Analytics

`react-reveal` can be used to generate events for web analytics tools (like Google analytics) in order to get fine grained reports. For example, you can log exactly whether a particular markup was seen by user:

```jsx
<Fade onReveal={ () => analyticsFunc('element revealed')  }>
  <p>Markup that will be revealed</p>
</Fade>
```

### Unwanted Scrollbars

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


### Reveal Props

- `effect` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** or **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/object)** This prop could be either an object describing a desired reveal effect  or a string containing CSS animation class (for example "animated fadeInUp" from  animate.css). If you don't specify it a default fade in effect will apply. **Optional**.
- `duration` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Duration of the reveal animation in milliseconds. Ignored for effects based on CSS animation classes. Defaults to `1000` milliseconds. **Optional**.
- `delay` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Delay before the start of reveal animation in milliseconds. Can be handy if several reveals are happening at approximately same time and you want to space them out a bit. Defaults to `66` seconds ( small delay is used to throttle reveal events). Anything higher than that should be generally okay. **Optional**.
- `wave` **[bool](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** or **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Can be used to create wave like animation effects. Makes sense if you're trying to Reveal a some kind of list and don't want reveal all items at once. If you set it to a number then this number will be a delay in milliseconds between each reveal. If you set to true then the delay will `200` milliseconds. Off by default. **Optional**.    
- `tag` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** HTML tag which is used for Reveal container. Defaults to `div`. **Optional**.
- `className` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** CSS class name. **Optional**.
- `style` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/object)** Style Object. **Optional**.
- `fraction` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Fraction of the revealed element height that must be visible in order for reveal animation to trigger. Should be some value between 0 to 1. Defaults to `0.2` meaning that at least 20% of the element must be visible before the reveal. **Optional**.
- `ssr` **[bool](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Use this option to suppress flickering during server side rendering. Off by default. **Optional**.
- `easing` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Easing function. Read more about [here](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function). Defaults to `ease`. **Optional**.
- `preventReveal` **[bool](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If true then reveal will be suppressed even if element is in view. It is useful for building animation sequences. Off by default. **Optional**.
- `onReveal` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Function called once the element is revealed.  **Optional**.

These props will work with both `<Reveal />` component and effect aliases ( `<Fade />`, `<Rotate />`, etc ) as well.

### Children

You should pass at least one child to this component. **Required**.

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
