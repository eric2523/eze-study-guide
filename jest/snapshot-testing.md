# Snapshot Testing
## Why snapshot testing?
* **No flakiness**: Because the tests are run in a command line runner instead of a real browser or phone, test runner doesn't have to wait for builds, spawn browsers, load a page and drive the UI to get a component into expected state. 
* **Fast iteration speed**
* **Easy to debug**: Easy to step into integration test rather than trying to recreate screenshot test scenario. 

Typical snapshot test case renders a UI component, takes a snapshot, then compares it to a reference snapshot file stored elsewhere. Test will fail if snapshots don't match: either change is unexpected, or ref snapshot needs to be updated to match new UI component. 

Instead of rendering the the GUI which would require building the entire app, can use a test render to generate a serializable value for React tree. In other words, isntead fo excecuting some code and comparing the output against a value provided by a dev, output is compared to a reference snapshot file. Consider the example below. 
```js
import React from 'react';
import renderer from 'react-test-renderer';
import Link from '../Link.react';

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

FIrst time the test is run, Jest creates a snapshot file that looks like: 
```js
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```

Be sure to commit this snapshot file. On subsequent test runs, Jest will compare the rendered output to this snapshot file. Note that the snapshot is directly scoped to the data you render. This implies that even if any other file has missing props, the component thats being tested will still pass as it is scoped only to that tested component. Also, rendering the same component with different props in other snapshot tests will not affect the first one, as the tests don't know about each other. Click [here](https://jestjs.io/blog/2016/07/27/jest-14.html) for a more in-depth example from Jest docs. 

## When to use Snapshot Testing? 
### Snapshot tests are a complement for conventional tests not a replacement 
Classic assertion based tests are perfect for testing clearly defined behavior that is expected to remain relatively stable. 

Snapshot tests are great for testing less clearly defined behavior that may change often. 

Snapshot tests preserve a starting point, but don't give any indication of developer intent to future devs. Unlike traditional tests, snapshot tests don't provide specific guidance for what the original dev expected beyond the "actual behavior". That's not something you want for your critical application logic, especially complicated logic with many subtle cases. 

### Snapshop tests work well with auto-mocking 
One problem with tests that rely on generating DOM in React is many components are actually made up of smaller components, that often use complicated logic to determine what to render. If we fully render everything, we're beginning to move away from the concept of a "unit test" as we are dependent upon another component's functionality. If we mock child components and helper functions, we can focus tests to only change based on logic of the individual component. 

## Inline Snapshots
Inline snapshots behave exactly like external snapshots(`.snap` files). Only difference is snapshot values are written back into source code. Means you get the benefit of automatically generated snapshots without having to reference an external file. Be sure to have Prettier installed. 

## Property Matchers
Often there are fields in the object that are generated dynamically like (IDs and Dates). If you try to snapshot these they will fail everytime as the output of these fields are different everytime. For these cases, Jest provides a matcher for different properties. These matchers are checked before snapshot is written or tested and then saved to snapshot file instead of the received value. 
```js
it('will check the matchers and pass', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot({
    // matchers right here 
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});

// Snapshot
exports[`will check the matchers and pass 1`] = `
Object {
  "createdAt": Any<Date>,
  "id": Any<Number>,
  "name": "LeBron James",
}
`;
```