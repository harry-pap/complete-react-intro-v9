* useState
Track state changes - here go values that are updated via events(maybe through websockets too)

* useEffect
Run side effect function (optionally for when a value changes). 
It's wrapped in useEffect, so that it won't run every time the component is rendered(which is constantly)
Can add values, for which the component will be re-calculated, for every state change.

*
