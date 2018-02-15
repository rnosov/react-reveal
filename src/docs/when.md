---
title: when Prop
---

Check the [form example](/examples/advanced/form/) to get the idea what it's all about.

Perhaps the most interesting `react-reveal` prop is a `when` prop. It controls whether the reveal action would be triggered or not. Suppose you have a form field and that might generate error message. You might want to gently ease in the error message in case of an error and ease it out once the error is gone.
`when` prop would be a kind of on/off switch that is controlling whether to show error or not.

```jsx
<Zoom when={false}>
  <h1>You won't see me, but I will still take space on screen</h1>
</Zoom>

<Zoom when={true}>
  <h1>I will be seen</h1>
</Zoom>
```

In other words `when` prop is controlling whether to trigger reveal effect or not. By default, `when` prop is `true`. Once you use this prop it disables the initial reveal animation. In order to trigger reveal effect you'll need to change it to an opposing value ( `true` to `false` or vice versa ). If you still need the initial animation use `appear` prop. If you initialize `when` prop to a falsey value then the element will be hidden until you set `when` prop to a truthy value.

The reveal action will occur whenever you change `when` prop from a falsy to a truthy value. Conversely, the conceal action will take place when you change `when` prop from a truthy to a falsy value. It probably makes sense to set this prop to a variable from the component state.

## Collapse

Another prop that you'll probably would want to use with it is `collapse`. The issue is that in the concealed state ( `when={false}` ) the element would be still taking valuable screen real estate. The `collapse` prop would make sure that it won't be taking space when it's not in use. This is very useful for all sorts of things like menus, error messages, list items ( especially on mobile or anywhere else where space is an issue ) .

```jsx
<Zoom when={false} collapse>
  <h1>You won't see me, and I will not take space on a screen</h1>
</Zoom>
```
