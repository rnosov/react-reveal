---
title: Base Props
---

## Effect Props

- `duration` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Duration of the reveal animation in milliseconds. Ignored for effects based on CSS animation classes. Defaults to `1000` milliseconds. **Optional**.
- `delay` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Delay before the start of reveal animation in milliseconds. Can be handy if several reveals are happening at approximately same time and you want to space them out a bit. Defaults to `66` seconds ( small delay is used to throttle reveal events). Anything higher than that should be generally okay. **Optional**.
- `tag` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** HTML tag which is used for Reveal container. Defaults to `div`. **Optional**.
- `className` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** CSS class name. **Optional**.
- `style` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/object)** Style Object. **Optional**.
- `fraction` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Fraction of the revealed element height that must be visible in order for reveal animation to trigger. Should be some value between 0 to 1. Defaults to `0.2` meaning that at least 20% of the element height must be visible before the reveal. For elements taller than a viewport, height is limited to the height of a viewport. **Optional**.
- `onReveal` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Function called once the element is revealed.  **Optional**.

## Children

You should pass at least one child to `react-reveal` components. **Required**.

## Timing Of Reveals

If several of Reveal effects are likely to happen simultaneously you might want for them to happen sequentially. In such case, you should use `delay` prop. You can also adjust a duration of effect animation by using `duration` prop. Both `delay` and `duration` are specified in a number of milliseconds.

```jsx
<Zoom delay={500} duration={3000}>
  <p>Markup that will be revealed first</p>
</Zoom>
<Zoom delay={4000}>
  <p>Markup that will be revealed a bit later</p>
</Zoom>
```


## Web Analytics

`react-reveal` can be used to generate events for web analytics tools (like Google analytics) in order to get fine grained reports. For example, you can log exactly whether a particular markup was seen by user:

```jsx
<Fade onReveal={ () => analyticsFunc('element revealed')  }>
  <p>Markup that will be revealed</p>
</Fade>
```
