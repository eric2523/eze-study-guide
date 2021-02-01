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