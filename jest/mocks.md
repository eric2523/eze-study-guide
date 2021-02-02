# Mock Functions
Mock functions allows us to use a dummy to hide the actual implementation of a code. For example if we had an API function, querying the db would be wasteful. We can use a mock function to fake the API and return value. Mock functions have properties that allow for capturing of calls, instances, and allowing test-time configuration of return values.

## Using a Mock Function
This example is an implementation of `forEach` which invokes a callback for each ele in array. We can inspect the mock's state to check for expectations. 
```js
const myForEach = (array, cb) => {
  for(const item of array) {
    cb(item)
  }
}

const mockCallBack = jest.fn( x => x * 2 )
myForEach([1, 2], mockCallBack);

// Mock fn is called twice 
expect(mockCallBack.mock.calls.length).toBe(2);

// First argument of first call to be 1
expect(mockCallBack.mock.calls[0][0]).toBe(1);

// First argument of second call to be 2
expect(mockCallBack.mock.calls[1][0]).toBe(2);

// Return value of first call is 2
expect(mockCallBack.mock.results[0].value).toBe(2)
```