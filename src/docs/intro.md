---
title: Introduction
---

[React Reveal](https://www.npmjs.com/package/react-reveal) is a dead simple way to add some cool reveal on scroll animations to your React app. If you're using `0.x` version check out the [migrating docs](/docs/migrating/).

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

Import effects from [React Reveal](https://www.npmjs.com/package/react-reveal) to your project. Lets try `Zoom` effect first.

```javascript
import Zoom from 'react-reveal/Zoom';
```

Place the following code somewhere in your `render` method: 

```jsx
<Zoom>
  <p>Markup that will be revealed on scroll</p>
</Zoom>
```

You should see zooming animation that reveals text inside the tag. You can change this text to any JSX you want. If you place this code further down the page you'll notice that it'll appear as scroll the page.

## Examples

Have a look at [demos](/examples/) to see what kind of effects are possible.

## Server Side Rendering

`react-reveal` will try to autodetect server side rendering (SSR) and apply gentle fade out effect on the initial render. 
