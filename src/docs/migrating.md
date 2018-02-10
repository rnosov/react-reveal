---
title: Migrating
---

If you've been using `react-reveal` version `0.x` it would be a good idea to migrate to version `1.0`.
There are 2 major differences.
- As the `react-reveal` now includes a lot of new effects it would be much more efficient to include each effect separately so instead of using named imports like following
```jsx
import { Fade } from 'react-reveal';
```
you should import each effect directly
```jsx
import Fade from 'react-reveal/Fade';
```
- `react-reveal`  used to wrap it's children in a `div` tag. This behaviour is deprecated in `1.0`. You should manually wrap children in a tag of your choosing (such as `div`). `react-reveal` expects only a single child! For compatibility reasons, if you pass more than one child to `react-reveal`  it will still wrap it in a `div` tag but you'll get a warning in the console. You should regularly inspect the console and make sure that you're only passing a single child to `react-reveal` like so:

```jsx
<Fade>
  <div>Single child only</div>
</Fade>
```

