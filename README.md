# React Reveal

Easily add reveal animations to your React apps. [React Reveal](https://www.npmjs.com/package/react-reveal) is compatible with excellent [animate.css](https://daneden.github.io/animate.css/) library and [Create React App](https://github.com/facebookincubator/create-react-app) scaffolding. Following examples assume that you're using animate.css but you can replace it with any other CSS animation effects toolkit.

[Live Demo](https://www.solarleague.org/) - scroll down to see the reveal animation.

## tl;dr

In the command prompt run:

```sh
npm install react-reveal animate.css --save

```

Import all necessary modules:

```javascript
import Reveal from 'react-reveal'; // this package
import 'animate.css/animate.css'; // CSS animation effects library (you can use something else if you wish)
```

Wrap the jsx that you want to be revealed in your `render` method:

```javascript
<Reveal effect="animated fadeInUp"> // for a full list of effects visit the animate.css page
  <div>Markup that will be revealed on scroll</div>
</Reveal>
```

## Documentation

A simple way of using react-reveal is to simply replace a `div` tag in your JSX markup with the `Reveal` class. All props that do not belong to `Reveal` class will be passed down to a `div` tag (including className). For example:
```javascript

<div className="someClass">
  <p>Markup that will be revealed on scroll</p>
</div>

// Change div to Reveal and add a desired effect. 
// All other other props will be passed down 

<Reveal effect="animated fadeInUp" className="someClass">
  <p>Markup that will be revealed on scroll</p>
</Reveal>
```

### Properties

- `effect` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** This prop expects a string containing CSS animation effect. You can use any animate.css animations or use any other CSS based animations. Animate.css effects work by adding `animated` base class to the effect class name. **Required**.
- `fraction` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Maximum fraction of the revealed element height that can remain off screen before reveal animation is triggered. Should be some value between 0 to 1. Adjust it if the reveal animation is being triggered too late or too early. Defaults to `0.85` **Optional**.
- `ssr` **[bool](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Use this option to suppress flickering during server side rendering. Off by default. **Optional**.
- `throttleTimeout` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Timeout in milliseconds between running reveal event handler. Defaults to `66` **Optional**.
- `onReveal` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Function called once the element is revealed. **Optional**.

### Children

You must also pass at least one child to this component. **Required**.

### Unwanted Scrollbars

Some animation effects might create unwanted scrollbars for a short time. If you want to avoid it set `overflow` attribute of a containing div to `hidden`.
```javascript
<div style={{overflow: 'hidden'}}> //containing div
  <p>Some other content</p>  
  <Reveal effect="animated fadeInUp">
    <p>Markup that will be revealed on scroll</p>
  </Reveal>
</div>
```
You can also do it through CSS.

### Universal Rendering

This component is compatible with universal or server side rendering (SSR). You might want to enable ssr flag if you have any issues with flickering on page startup.

```javascript
<Reveal ssr effect="animated fadeInUp">
  <div>Markup that will be revealed on scroll</div>
</Reveal>
```

## Step by Step Instructions

In order to start from scratch we'll use Facebook React starter kit called [Create React App](https://github.com/facebookincubator/create-react-app). In the command prompt type:


```sh
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm install react-reveal animate.css --save
subl src/App.js #open with Sublime Text. Or use any other text editor.
npm start

```

Copy and paste the following code into app.js:

```javascript
import React, { Component } from 'react';
import Reveal from 'react-reveal'; 
import logo from './logo.svg';
import './App.css';
import 'animate.css/animate.css'; // CSS animation effects library

class App extends Component {
  render() {
    return (
      <div className="App" style={{overflow: 'hidden'}}>
        <Reveal effect="animated zoomIn" className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </Reveal>
        <Reveal effect="animated flipInY">
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </Reveal>
        {Array(100).fill(          
          <Reveal effect="animated fadeInLeft">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum fermentum massa, pharetra consectetur nisi pellentesque non. Quisque convallis sit amet ante a maximus. Fusce aliquam cursus eros, nec rutrum ante commodo non. Ut vitae viverra justo. Nam dignissim mollis aliquam. Cras pellentesque est at eros aliquet, sed vestibulum diam mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris posuere mauris nec lectus varius, vitae gravida nunc tempor. Mauris ut viverra dolor. Maecenas at faucibus tellus. Quisque gravida mi eget tortor porta, eu rhoncus dui blandit.
            </p>              
          </Reveal>                    
        )}
      </div>
    );
  }
}

export default App;
```

Then open [http://localhost:3000/](http://localhost:3000/) to see this example.

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
