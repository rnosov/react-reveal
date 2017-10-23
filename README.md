# React Reveal

## Introduction
[React Reveal](https://www.npmjs.com/package/react-reveal) is a dead simple way to add some cool reveal on scroll animations to your React app. It's less than 2kb gzipped and written for React from scratch in ES6. If you like this package don't forget to star the [Github repository](https://github.com/rnosov/react-reveal)!

## Demo 

- [Live demo](https://rnosov.github.io/react-reveal-demo/)

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

You should see zooming animation that reveals text inside the tag. You can change this text to any JSX you want. If you place this code further down the page you'll notice that it'll appear as scroll the page.


### List Of Reveal Effects

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

### Cascading effects 

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

### Effect Props

- `duration` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Duration of the reveal animation in milliseconds. Ignored for effects based on CSS animation classes. Defaults to `1000` milliseconds. **Optional**.
- `delay` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Delay before the start of reveal animation in milliseconds. Can be handy if several reveals are happening at approximately same time and you want to space them out a bit. Defaults to `66` seconds ( small delay is used to throttle reveal events). Anything higher than that should be generally okay. **Optional**.
- `tag` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** HTML tag which is used for Reveal container. Defaults to `div`. **Optional**.
- `className` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** CSS class name. **Optional**.
- `style` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/object)** Style Object. **Optional**.
- `fraction` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Fraction of the revealed element height that must be visible in order for reveal animation to trigger. Should be some value between 0 to 1. Defaults to `0.2` meaning that at least 20% of the element height must be visible before the reveal. For elements taller than a viewport, height is limited to the height of a viewport. **Optional**.
- `onReveal` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Function called once the element is revealed.  **Optional**.

### Children

You should pass at least one child to `react-reveal` components. **Required**.

### Universal Rendering

`react-reveal` will try to autodetect server side rendering (SSR) and apply gentle fade out effect on the initial render. 


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
