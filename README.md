# React Reveal

## Introduction

[React Reveal](https://www.react-reveal.com) is a dead simple way to add some cool reveal on scroll animations to your React app. Don't forget to star the [Github repository](https://github.com/rnosov/react-reveal) if you liked this package!

## Examples

A number of simple effect examples:
- [Fade](https://www.react-reveal.com/examples/Fade/)
- [Flip](https://www.react-reveal.com/examples/Flip/)
- [Rotate](https://www.react-reveal.com/examples/Rotate/)
- [Zoom](https://www.react-reveal.com/examples/Zoom/)
- [Bounce](https://www.react-reveal.com/examples/Bounce/)
- [Slide](https://www.react-reveal.com/examples/Slide/)
- [Roll](https://www.react-reveal.com/examples/Roll/)
- [LightSpeed](https://www.react-reveal.com/examples/LightSpeed/)

A more complicated example of [animated form errors](https://www.react-reveal.com/examples/advanced/form/).

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

You should see zooming animation that reveals text inside the tag. You can change this text to any JSX you want. If you place this code further down the page you'll see that it'd appear as you scroll down.

## Revealing React Components

You may just wrap your custom React component with the effect of your choosing like so:

```jsx
<Zoom>  
  <CustomComponent />
</Zoom>
```

In such case, in the resulting `<CustomComponent />` HTML markup will be wrapped in a `div` tag. If you would rather have a different HTML tag then wrap `<CustomComponent />` in a tag of your choosing:

```jsx
<Zoom>
  <section>
    <CustomComponent />   
  </section>
</Zoom>
```

or if you want to customize `div` props:

```jsx
<Zoom>
  <div className="some-class">
    <CustomComponent />   
  </div>
</Zoom>
```

If you don't want any tag at all then another option is to [expose DOM ref](https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) to `react-reveal`. You do that by using `refProp` prop. Consider following custom React Component:

```jsx
function CustomComponent({ innerRef }) {
  return <div ref={innerRef}>Some content</div>;
}
```

And then you can reveal using following code:

```jsx
<Zoom refProp="innerRef">
  <CustomComponent />   
</Zoom>
```

In this case, `react-reveal` will not insert any tags and will use the exposed HTML element. Some React components such as React Router links already expose their refs via `innerRef` prop:

```jsx
<Zoom refProp="innerRef">
  <Link to="/">Your Content</Link>
</Zoom>
```

## Revealing Images

If you want to reveal an image you can wrap `img` tag with with the desired `react-reveal` effect:

```jsx
<Zoom>
  <img height="300" width="400" src="https://source.unsplash.com/random/300x400" />
</Zoom>
```

It would be a very good idea to specify width and height of any image you wish to reveal.

## Children

Please be aware that `react-reveal` components ( such as `Fade`, `Zoom`, etc ) can only have a single child. If you want to reveal several elements at once you'd need to wrap them in a container tag such as `div`.

## Server Side Rendering

`react-reveal` will try to autodetect server side rendering (SSR) and apply gentle fade out effect on the initial render. 

## Documentation

For a full documentation please visit [online docs](https://www.react-reveal.com/docs/).

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

Copyright © 2018 Roman Nosov. Project source code is licensed under the MIT license.
