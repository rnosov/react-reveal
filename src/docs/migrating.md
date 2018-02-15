---
title: Migrating
---

If you've been using `react-reveal` version `0.x` it would be a good idea to migrate to version `1.1`.
There are 2 major differences.
- As the `react-reveal` now includes a lot of new effects it would be much more efficient to include each effect separately so instead of using named imports like following
```jsx
import { Zoom } from 'react-reveal';
```
you should import each effect directly
```jsx
import Zoom from 'react-reveal/Zoom';
```
- `react-reveal`  used to wrap it's children in a `div` tag. This behaviour is deprecated in `1.x`. As of `1.1` `react-reveal` will attach a reveal effect to each child. 

In other words

```jsx
<Zoom>
  <div>First Child</div>
  <div>Second Child</div>
</Zoom>
```

will be equivalent to 

```jsx
<Zoom><div>First Child</div></Zoom>
<Zoom><div>Second Child</div></Zoom>  
```
if you don't want this to happen you should pass only a single child to `react-reveal` elements:

```jsx
<Zoom>
  <div>
    <div>First Child</div>
    <div>Second Child</div>
  </div>
</Zoom>
```
