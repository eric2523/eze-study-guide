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

## `.mock` property
This property is where state is saved (function calls, return values, value of `this`). Beause it tracks the value of `this` we're able to inspect these instances. 
```js
const myMock = jest.fn()
const a = new myMock();
const b = {}
const bound = myMock.bind(b)
bound() 

console.log(myMock.mock.instances); // => [ <a>, <b> ]
```

Below are some example use cases and how to index into different function calls. 
```js
// The function was called exactly once
expect(someMockFunction.mock.calls.length).toBe(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toEqual('test');
```

## Mock Return Values
Mock functions can be used to inject test values into code. 
```js
const myMock = jest.fn();
console.log(myMock()) // => undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce("a").mockReturnValue(true);

for(let i = 0; i <= 3; i++){
  console.log(myMock()); // => 10, "a", true, true  
}
```

Mock functions are also very useful in code that uses functional continuation-passing style (CPS). CPS is using the return value of a previous computation to the next computation. Think of the reduce function which sets the return value of the previous computation to the acc of the next. 
```js
const filterTestFunc = jest.fn(); 

filterTestFunc.mockReturnValueOnce(true).mockReturnValueOnce(false)

const result = [11, 12].filter( num => filterTestFunc(num))
console.log(result); // => [11]

console.log(filterTestFunc.mock.calls[0][0]); // => 11 
console.log(filterTestFunc.mock.calls[0][1]); // => 12 
```

## Mocking Modules 
Suppose we have a class that fetches users through an API and uses axios to make this request call. Testing the API call is inefficient and slow. Instead, we can use a Mock function to mock the axios module/request.
```js
// users.js 
import axios from 'axios';

class Users {
  static getAllUsers() {
    return axios.get('/users.json').then( res => res.data );
  }
}

export default Users; 

// users.test.js 
import axios from 'axios';
import Users from './users';

jest.mock('axios')

test("should fetch all users", () => {
  const users = [
    { name: "Bob" },
    { name: "Eric" }
  ]
  const res = { data: users }
  axios.get.mockResolvedValue(res) 

  return Users.all().then(data => expect(data).toEqual(users))
})
```

## Mocking Implementation
Sometimes you need to go beyond just mocking the return value. Sometimes you want to mock the entire implementation. You can do this with `jest.fn` but using `mockImplementation` is useful when you're trying to mock a module. 
```js
// foo.js
module.exports = function () {
  // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```

Can use `mockImplementationOnce` to produce diff results. When it runs out it will use the default implementation set with `jest.fn` (if its defined). 
```js
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```

Jest has a syntactic sugar to mock a function to return this:
```js
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};
```

## Mock Names
Can optionally provide name to get better error messages. It will display the mock name instead of just "jest.fn()". 
```js
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```

Check out the docs [here](https://jestjs.io/docs/en/mock-functions) and scroll to bottom for some custom matchers Jest provides. 