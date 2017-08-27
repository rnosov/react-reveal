# React Reveal

Easily add reveal animation to any React component. It is compatible with the excellent [animate.css](https://daneden.github.io/animate.css/) library but you can use any CSS based animations.

[Live Demo](https://www.solarleague.org/) - scroll down to see the reveal animation.

## tl;dr

In the command prompt run:

```sh
npm install react-reveal animate.css --save

```

Import all necessary modules:

```javascript
import Reveal from 'react-reveal'; // this package
import 'animate.css/animate.css'; // CSS animation effects library
```

Wrap the jsx that you want to be revealed in your **render** method:

```javascript
<Reveal effect="animated fadeInUp">
  <div>Markup that will be revealed on scroll</div>
</Reveal>
```

## Documentation

### Properties

- `effect` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** This prop expects a string containing CSS animation effect. You can use any animate.css animations or use any other CSS based animations. If you're using animate.css don't forget to add *animated* base class. **Required**.
- `onReveal` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Function called once the element is revealed. **Optional**.
- `ssr` **[bool](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Use this option to suppress flickering during server side rendering. Off by default. **Optional**.

### Children

You must also pass at least one child to this component. **Required**.

### Universal Rendering

This component is compatible with universal or server side rendering (SSR). You might want to enable ssr flag if you have any issues with flickering on page startup.

```javascript
<Reveal ssr effect="animated fadeInUp">
  <div>Markup that will be revealed on scroll</div>
</Reveal>
```

## Step by Step Instructions

In order to start from scratch we'll use Facebook react starter kit called [Create React App](https://github.com/facebookincubator/create-react-app). In the command prompt type:


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
      <div className="App" style={{overflow: 'hidden'}}>>
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
