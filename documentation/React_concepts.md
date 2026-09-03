* useState
Track state changes - here go values that are updated via events(maybe through websockets too)

* useEffect
Run side effect function (optionally for when a value changes). 
It's wrapped in useEffect, so that it won't run every time the component is rendered(which is constantly)
Can add values, for which the component will be re-calculated, for every state change.

* context
Only use it for app level data, like the theme, or the user info if they have logged in for example.

* routing
Pseudo routing in Single Page applications, so that back and forward will work

* TanStack query - replaces most of the `useEffect` use cases, used to cache data, etc. Anything related to consuming the backend

* Error boundaries - used so that our page won't blow up. For the most part use `react-error-boundary` instead
of manually writing them.

* Class components: old way of doing react, not deprecated, but not recommended either, they are present 
here for educational purposes. Can't call hooks directly from class components, need to pass the hook as `props`
in order to invoke them.
