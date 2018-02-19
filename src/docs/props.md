---
title: Components Props
---

You can use the following props with any `react-reveal` component ( such as `Fade`, `Zoom`, etc ).

- `duration` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Duration of the reveal animation in milliseconds. Defaults to `1000` milliseconds. **Optional**.
```jsx
<Zoom duration={3000}>
    <p>Markup that will be revealed first</p>
</Zoom>
```
- `delay` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Delay before the start of reveal animation in milliseconds. Can be handy if several reveals are happening at approximately same time and you want to space them out a bit. **Optional**.
```jsx
<Zoom delay={4000}>
    <p>Markup that will be revealed a bit later</p>
</Zoom>
```
- `left` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Sets the origin of the reveal animation to left. Defaults to false. **Optional**.
- `right` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Sets the origin of the reveal animation to right. Defaults to false. **Optional**.
- `top` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Sets the origin of the reveal animation to top. Defaults to false. **Optional**.
- `bottom` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Sets the origin of the reveal animation to bottom. Defaults to false. **Optional**.
- `count` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number of times the reveal animation is repeated. Defaults to 1. **Optional**.
- `forever` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Loop the reveal animation forever. Defaults to false. **Optional**.
- `mirror` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Swaps animation origin from `left`  to `right` and `top` to `bottom`. Defaults to false. **Optional**.
- `opposite` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Generate exit animation in the direction opposite to entering animation. By defaults exit animation will be in the same direction. **Optional**.
- `distance` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Experimental feature that only works with `Fade` for now. Sets a travelling distance for the revealed element. Must be a string specifying CSS length such as `100px`, `1.2em`, `50%` and so on. By default effects are normally using hardcoded values such as `100%`. Use this prop as a last resort only.  **Optional**. **Avoid**.
- `spy`: Any change in this prop value will cause the element to be revealed again. It makes sense to set it to some state variable. Disables the initial reveal animation (use `appear` prop to reenable it). **Optional**.
- `when`: If this prop evaluates to a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value then the element will be revealed when scrolled into a viewport. If the value is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) then the element will be hidden upon entering a viewport. Disables the initial reveal animation (use `appear` prop to reenable it). [See detailed docs](/docs/when/).This prop is `true` by default. **Optional**.
- `in`: same as `when` prop. It is added for compatibility with `react-transition-group`.
- `appear`: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** This prop is used if the revealed element in the [transition group](/docs/transition-group/) or if an element has `when`, `in` or `spy` props. It `true` then the initial reveal animation will be shown. Defaults to `false`.  **Optional**.
- `enter`: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Enables enter animation when the revealed element is in the [transition group](/docs/transition-group/). Defaults to `true`. **Optional**.
- `exit`: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Enables exit animation when the revealed element is in the [transition group](/docs/transition-group/). Defaults to `true`. **Optional**.
- `timeout`: same as `duration` prop. It is added for compatibility with `react-transition-group`.
- `mountOnEnter`: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Mounts child component only when `when` or `in` prop is truthy. Defaults to `false`. **Optional**.
- `unmountOnExit`: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Unmounts child component only when `when` or `in` prop is falsy. Defaults to `false`. **Optional**.
- `force`: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Sets the origin of the reveal animation to bottom. Defaults to false. **Optional**.
- `disabled`: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Disables all reveal effects. Defaults to false. **Optional**.
- `refProp`: **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** If you're using `react-reveal` component with a custom React component (like a `NavLink` from React Router) you must specify prop name that would be allow access to the DOM. Typically it would be something like `innerRef`. By default it is `ref`. **Optional**.
- `innerRef`: **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** This prop is used to expose DOM ref. **Optional**.
- `cascade`: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** [See cascade docs](/docs/cascade/). Defaults to false. **Optional**.
- `collapse`: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** [See collapse docs](/docs/when/). Defaults to false. **Optional**.

- `fraction` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Fraction of the revealed element height that must be visible in order for reveal animation to trigger. Should be some value between 0 to 1. Defaults to `0.2` meaning that at least 20% of the element height must be visible before the reveal. For elements taller than a viewport, height is limited to the height of a viewport. **Optional**.
- `wait`: **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Waiting time in milliseconds before `onReveal` event is fired. Defaults to 0. **Optional**.
- `onReveal` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Function called once the element is revealed.  **Optional**.
This prop can be used to generate events for web analytics tools (like Google analytics) in order to get fine grained reports. For example, you can log exactly whether a particular markup was seen by user:
```jsx
<Fade onReveal={ () => analyticsFunc('element revealed')  }>
    <p>Markup that will be revealed</p>
</Fade>
```


## Children

You should pass at least one child to `react-reveal` components. **Required**.

