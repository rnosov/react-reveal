---
title: Transition Group
---

`react-reveal` has added a support for [react transition group](https://github.com/reactjs/react-transition-group) `2.x`! You can use `react-reveal` elements such as `Fade`, `Zoom`, etc inside of `TransitionGroup` component instead of native `Transition` or `CSSTransition` elements. There are number of advantages of using `react-reveal` instead of `Transition` elements such as no need of dealing with CSS any more, first class support for collapsing elements, rich suite of different easy to use effects and so on. Have a look at the live example of [todo app](/examples/advanced/todo/).

In order to use `TransitionGroup` with `react-reveal` you'll need to install `react-transition-group` first:
```sh
# npm
npm install react-transition-group --save

# yarn
yarn add react-transition-group
```

After that, you can import `TransitionGroup` and some effect from `react-reveal`:
```jsx
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Zoom from 'react-reveal/Zoom';

```

At last, you should stick the `TransitionGroup` somewhere in your `render` method. It assumes that you have a collection called `items` in your state and each item has a unique `id` field:

```jsx
<TransitionGroup>
{
  this.state.items.map( item => <Zoom collapse key={item.id}>{item}</Zoom> )
}
</TransitionGroup>
```

That's is it! As you modify `items` collection you should see entering or exiting animations.

Most of `Transition` props are supported with the exceptions of callbacks.
