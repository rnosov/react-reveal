import React from 'react';
import Article from '../Article';
import Editor from '../examples/Editor';

function Tutorial() {
  return (
    <Article title="Quickstart">
<p>
In this tutorial we'll see how to use <code>react-reveal</code> with <code>Create React App</code>.
First, let's create a new project and install <code>react-reveal</code>:
</p>
<pre>
<code>
{`npx create-react-app my-app
cd my-app
npm i react-reveal --save
npm start`}
</code>
</pre>

<p>
Open <code>my-app/src/app.js</code> and you shoud see the following code:
</p>

<Editor stacked previewClass="text-center mb-4">{
`// This example is live editable
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
`
}</Editor>
<p>
Let's add a Zoom effect to the app header:
</p>


<Editor stacked previewClass="text-center mb-4">{
`// This example is live editable
import React, { Component } from 'react';
import logo from './logo.svg';
import Zoom from 'react-reveal/Zoom'; // Importing Zoom effect
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Zoom>{/*Using Zoom Effect*/}
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
        </Zoom>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
`
}</Editor>

<p>
This is it! Now you know how to add simple reveal effects to your app elements.
Check out other tutorials for more advanced usage.
</p>

    </Article>
  );
}

export default Tutorial;
