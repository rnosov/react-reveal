import React from 'react';
import Article from '../Article';
import Code from '../Code';
import Editor from '../examples/Editor';
import { Link } from 'react-router-dom';

function Tutorial() {
  return (
    <Article title="Working With Collections">
<p>
<code>react-reveal</code> has added a support
for <a href="https://github.com/reactjs/react-transition-group">react transition group</a> <code>2.x</code>!
You can use <code>react-reveal</code> elements such as <code>Fade</code>, <code>Zoom</code>, etc inside of <code>TransitionGroup</code> component
instead of native <code>Transition</code> or <code>CSSTransition</code> elements.
There are number of advantages of using <code>react-reveal</code> instead of <code>Transition</code> elements such as no
need of dealing with CSS any more, first class support for collapsing elements,
rich suite of different easy to use effects and so on.
Have a look at the live example of [todo app](/examples/advanced/todo/).
</p>
<p>
In order to use <code>TransitionGroup</code> with <code>react-reveal</code> you'll need to install <code>react-transition-group</code> first:
</p>
<pre>
<code>{
`# npm
npm install react-transition-group --save

# yarn
yarn add react-transition-group`}
</code>
</pre>
<p>
After that, you can import <code>TransitionGroup</code> and some effect from <code>react-reveal</code>:
</p>
<Code>
{
`
<pre class="language-jsx">
<code class="language-jsx line-numbers">import TransitionGroup from 'react-transition-group/TransitionGroup';
import Zoom from 'react-reveal/Zoom';
`
}
</Code>
<p>
Put the <code>TransitionGroup</code> somewhere in your <code>render</code> method.
For example, if you have a collection called <code>items</code> in your state and each item has a unique <code>id</code> field:
</p>

<Editor stacked previewClass="text-center mb-4">{
`// This example is live editable ( yes, it *really* is )
// you can click somewhere in this code block and start editing it
// and the output will be displayed under the code
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {id: 1, text: 'First Item'},
        {id: 2, text: 'Another Item'},
        {id: 3, text: 'Last One'},
      ],
    };
  }
  render() {
    return (
      <TransitionGroup>
        {this.state.items.map( item =><Zoom key={item.id}>{item.text}</Zoom> )}
      </TransitionGroup>
    );
  }
}
`
}</Editor>

<p>
As you modify <code>items</code> collection you should see entering or exiting animations.
Have a look at the <Link to="/examples/advanced/todo/">full example</Link>.
</p>

<p>
Most of <code>Transition</code> props are supported with the exceptions of callbacks.
</p>
    </Article>
  );
}

export default Tutorial;
