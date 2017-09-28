# React Reveal

## Introduction
[React Reveal](https://www.npmjs.com/package/react-reveal) is the easiest way to add reveal on scroll animation to your React app. It's only 1.5kb gzipped and has no external dependencies apart from React, Proptypes and Babel Runtime (it's very likely you already have them). It's specifically written for React in ES6. If you like this project don't forget to star it on Github!

[Live Demo](https://www.solarleague.org/) - scroll down to see the reveal animation.

## Quick Start

In the command prompt run:

```sh
npm install react-reveal --save

```

Import [React Reveal](https://www.npmjs.com/package/react-reveal) in to your project:

```javascript
import Reveal from 'react-reveal';
```

Place the following code somewhere in your `render` method:

```jsx
<Reveal />
```

You should see a lorem ipsum text and a gentle fade in animation that reveals it. It might a bit difficult to see what is actually happening so let's make it a little bit more obvious.

```jsx
<div>
  {Array(100).fill(void 0).map( (val, index) =>  <Reveal key={index} /> )}
</div>
```

Scroll down to see the reveal effect. It should be a lot clearer by now what is happening. Now, showing lorem ipsum text is not very helpful by itself so lets try to make it a bit more useful.

To do this just wrap the jsx that you want to be revealed in the`Reveal` tag:

```jsx
<Reveal>
  <p>Markup that will be revealed on scroll</p>
</Reveal>
```

You can also multiply it a few times to make the reveal effect more pronounced. `key` prop is needed by the React as the element is being repeated.

```jsx
<div>
  {Array(100).fill(void 0).map( (val, index) =>  
    <Reveal key={index}> 
      <p>Markup that will be revealed on scroll</p>  
    </Reveal>
  )}
</div>
```

It does start looking like something you could use, doesn't it? 
However, the plain fade in effect might a bit bland. Let's make it something more cool. 
Introducing the `effect` property. Hopefully, it should be the only `Reveal` property that you'll have to learn. We'll make text rotate using `rotate(360deg)` transform function. 

```jsx
<Reveal effect={{ transform: "rotate(360deg)" }}>  
  <p>Markup that will be revealed on scroll</p>  
</Reveal>
```

Or with the repeated list

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
This animation might a bit over the top so here is the list of other transformations loosely based 
on [animate.css](https://daneden.github.io/animate.css/) for you to try:

| Description        | Example                                                                  |
| ------------------ | ------------------------------------------------------------------------ |
| Plain Fade         | `<Reveal />` |
| Slide in down      | `<Reveal effect={{ transform: 'translate3d(0, -100%, 0)' }} />` |
| Slide in down big  | `<Reveal effect={{ transform: 'translate3d(0, -2000px, 0)' }} />` |
| Slide in left      | `<Reveal effect={{ transform: 'translate3d(-100%, 0, 0)' }} />` |
| Slide in right     | `<Reveal effect={{ transform: 'translate3d(100%, 0, 0)' }} />` |
| Slide in right big | `<Reveal effect={{ transform: 'translate3d(2000px, 0, 0)' }} />` |
| Slide in up        | `<Reveal effect={{ transform: 'translate3d(0, 100%, 0)' }} />` |
| Slide in up big    | `<Reveal effect={{ transform: 'translate3d(0, 2000px, 0)' }} />` |
| Zoom in            | `<Reveal effect={{ transform: 'scale3d(.3, .3, .3)' }} />`| 
| Zoom in down       | `<Reveal effect={{ transform: 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)' }} />`| 
| Flip               | `<Reveal effect={{ transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)' }} />` |
| Flip in Y axis     | `<Reveal effect={{ transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)' }} />` |
| Flip in X axis     | `<Reveal effect={{ transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)' }} />` |
| Rotate             | `<Reveal effect={{ transform: 'rotate(360deg)' }} />` |
| Counter rotate     | `<Reveal effect={{ transform: 'rotate(-200deg)' }} />` |
| Rotate down left   | `<Reveal effect={{ transform: 'rotate3d(0, 0, 1, -45deg)', transformOrigin: 'left bottom' }} />`|
| Rotate down right  | `<Reveal effect={{ transform: 'rotate3d(0, 0, 1, 45deg)' transformOrigin: 'right bottom' }} />`|
| Rotate up left     | `<Reveal effect={{ transform: 'rotate3d(0, 0, 1, 45deg)', transformOrigin: 'left bottom' }} />`|
| Rotate up right    | `<Reveal effect={{ transform: 'rotate3d(0, 0, 1, -90deg)', transformOrigin: 'right bottom' }} />`|

If you found some interesting effect do send them in and I will list it here. Also, If you need any bespoke animations in your React app I'm available for hire. The email to contact is rnosov@gmail.com

If you already have animations effects in your CSS then just set effect property to its class name. For example, if you're using [animate.css](https://daneden.github.io/animate.css/) try the following code: 

```jsx
<Reveal effect="animated fadeInUp">
  <p>Markup that will be revealed on scroll</p>
</Reveal>
```

Please note that some reveal effects might create unwanted scrollbars for a short time. 
If you want to avoid it set `overflow` attribute of a containing div to `hidden`.

```jsx
<div style={{overflow: 'hidden'}}>
  <Reveal effect={{ transform: 'translate3d(2000px, 0, 0)' }} >
    <p>Markup that will be revealed on scroll</p>
  </Reveal>
</div>
```

You can also do it using CSS.

## Documentation

A simple way of using react-reveal is to simply replace a `div` tag in your JSX markup with the `Reveal` class. All props that do not belong to `Reveal` class will be passed down to a `div` tag (including `className` and `style`). For example:

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

### Properties

- `effect` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** or **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/object)** This prop could be either an object describing a desired reveal effect (refer to the table above) or a string containing CSS animation class (for example "animated fadeInUp" from  animate.css). If you don't specify it a default fade in effect will apply. **Optional**.
- `transition` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Read about it [here](https://developer.mozilla.org/en-US/docs/Web/CSS/transition). Useful for adjusting animation duration (second value), easing curve (third value) or animation delay (last value) Defaults to `all 1s ease 0s`. **Optional**.
- `fraction` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Fraction of the revealed element height that must be visible in order for reveal animation to trigger. Should be some value between 0 to 1. Defaults to `0.20` meaning that at least 20% of the element must be visible before the reveal. **Optional**.
- `ssr` **[bool](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Use this option to suppress flickering during server side rendering. Off by default. **Optional**.
- `throttleTimeout` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Timeout in milliseconds between running reveal event handler. Defaults to `66` **Optional**.
- `onReveal` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Function called once the element is revealed. **Optional**.

### Children

You should pass at least one child to this component. If you don't do it then lorem ipsum placeholder text will be generated.

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

### `npm install`

Installs required node modules

### `npm run build`

Builds the package for production to the `dist` folder

### `npm test`

Runs tests

## License

Copyright © 2016 Roman Nosov. This source code is licensed under the MIT license.
