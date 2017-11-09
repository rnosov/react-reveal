---
title: Introduction
---

[React Reveal](https://www.npmjs.com/package/react-reveal) is a dead simple way to add some cool reveal on scroll animations to your React app. It's less than 2kb gzipped and written for React from scratch in ES6. If you like this package don't forget to star the [Github repository](https://github.com/rnosov/react-reveal)!

`react-reveal` will try to autodetect server side rendering (SSR) and apply gentle fade out effect on the initial render. 

## Installation

In the command prompt run:

```sh
npm install react-reveal --save
```

Alternatively you may use `yarn`:

```sh
yarn add react-reveal
```

## Quick Start

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
