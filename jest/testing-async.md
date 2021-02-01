# Testing Asynchronous 
## Callbacks
Callbacks are the most common async pattern. By default, Jest tests complete once they reach the end of the execution. The code below will **NOT** work as intended. In the code below, the test will complete as soon as `fetchData` completes, before ever calling the callback. 
```js
// BAD FUNCTION
test("data is pb and jam", () => {
  function callback(data) {
    expect(data).toBe("pb and jam")
  }

  fetchData(callback)
})
```
We can pass in a second argument to test, `done`, which tells Jest to wait until `done` is called before finishing the test. 

If `done()` is never called, test will fail with timeout error. If the `expect` statement fails, it throws an error and `done()` is not called. If we want to get the error message in the test we need to use a `try..catch` and pass the error to `catch` block to `done`.
```js
test("data is pb and jam", done => {
  function callback(data) {
    try {
      expect(data).toBe("pb and jam")
      done()
    } catch (error) {
      done(error)
    }
  }

  fetchData(callback)
})
```

## Promises 
Return a promise from your test, and Jest will wait for that promise to resolve. If the promise is rejected, the test will automatically fail. 

Be sure to return promise - if we omit our test will complete before promise from function resolves and then() has a chance to execute callback. 
```js
test("data is pb", () => {
  return functionThatReturnsPromise().then( data => {
    expect(data).toBe("pb")
  })
})
```

If you expect a promise to be rejected, use `.catch` method. Make sure to add `expect.assertions` to verify a certain num of assertions are called. Otherwise, a fulfilled promise would not fail the test. 
```js
test("fetch fails with error", () => {
  expect.assertions(1)
  // careful: notice the implicit return 
  return fetchData().catch( e => expect(e).toMatch('error'))
})
```

## .resolves / .rejects
Jest will wait for the promises to resolve or reject. 

When using `.resolves`, Jest will wait for promise to resolve. If its rejected, the test will automatically fail. Works analogically with `.reject`, Jest will wait for promise to be rejected, if it resolves the test will fail. 

```js
test("data is pb", () => {
  // MAKE SURE WE RETURNING 
  return expect(fetchData()).resolves.toBe("pb")
})

test("fails with some message", () => {
  return expect(fetchData()).rejects.toMatch("message")
})
```

## Async / Await 
To write async tests, use `async` keyword in front of callback function passed to `test`. Async and await are effectively syntactic sugar for promises example above. Prob wont use this that much, promises are awesome imo. 
```js
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```