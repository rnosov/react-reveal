# React Reveal

[React Reveal](https://www.npmjs.com/package/react-reveal) is an attention management framework for your React app. The traditional way of calling attention to a certain element has been in-your-face method of placing it in a popup or putting it in a sticky navigation element like sticky headers, footers or sidebars. As the number of these elements proliferate, the app is at danger of starting to resemble a cockpit control panel of a jumbo jet. There should be a better way of managing a user attention and `react-reveal`  can do just that. 

Instead of trying to squeeze everything that requires attention into one screen, you can draw user attention to important bits as they scroll past. `react-reveal` provides a dead simple way to add cool reveal-on-scroll animations to your React app. In addition, it has a first class support for collapsing elements thereby abolishing the need for the universally hated popups.

The other problem many single page applications are facing is actually their speed. As you add and remove elements from the page transitions are often rough and jerky. `react-reveal` rich suite of effects could really smoothen these transitions to make for a modern and polished user experience.

`react-reveal` MIT licensed, supports server side rendering, won't mess your SEO, is compatible with [react transition group]((https://www.react-reveal.com/docs/transition-group/) and has a tiny footprint in application bundle.

Last but not least, do star the [Github repository](https://github.com/rnosov/react-reveal) if you liked this package!

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

Also, there are more complicated examples of [animated form errors](https://www.react-reveal.com/examples/advanced/form/) and a [todo app](https://www.react-reveal.com/examples/advanced/todo/).

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
function CustomComponent({ innerRef, className, style }) {
  return <div ref={innerRef} className={className} style={style}>Some content</div>;
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

`react-reveal` will attach a reveal effect to each child. In other words

```jsx
<Zoom>
  <div>First Child</div>
  <div>Second Child</div>
</Zoom>
```

will be equivalent to 

```jsx
<Zoom><div>First Child</div></Zoom>
<Zoom><div>Second Child</div></Zoom>  
```
if you don't want this to happen you should pass only a single child to `react-reveal` elements:

```jsx
<Zoom>
  <div>
    <div>First Child</div>
    <div>Second Child</div>
  </div>
</Zoom>
```


## Server Side Rendering

`react-reveal` supports server side rendering out of the box. In some cases, when the javascript bundle arrives much later than the HTML&CSS it might cause a flickering. `react-reveal` will try to autodetect this and apply gentle fadeout effect on the initial render to mitigate flickering. If you want you can disable the fadeout effect like so ( place this code somewhere near the entry point of your application):

```jsx
import {ssrFadeout} from 'react-reveal/globals';

ssrFadeout(false);
```

## Search Engine Optimisation 

`react-reveal` is regularly checked against googlebot in the Search Console to make sure that googlebot can see the content in the revealed elements. 

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
