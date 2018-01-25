# React Reveal

## Introduction
[React Reveal](http://www.react-reveal.com) is a dead simple way to add some cool reveal on scroll animations to your React app. It's less than 2kb gzipped and written for React from scratch in ES6. If you like this package don't forget to star the [Github repository](https://github.com/rnosov/react-reveal)!

## Demo 

- [Live examples](http://www.react-reveal.com/examples/)

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


## Documentation

For a full documentation please visit [online docs](http://www.react-reveal.com/docs/).

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
