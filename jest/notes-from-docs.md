# Intro
Jest uses "matchers" to test values. Each test is a function that takes two args, an error message and a callback. 
## Common Matchers
Can use exact equality. 

**expect** returns an "expectation" object. With this obj, we can call matchers on them like `toBe`. `toBe` uses `Object.is` to test exact equality. To check values of an object, use `toEqual` instead.
```js
  test('two plus two is four', () => {
    expect(2 + 2).toBe(4)
  })

  test('object assignment', () => {
    const someObject = { a: 1 };
    someObject["b"] = 2;
    expect(someObject).toEqual({ a: 1, b: 2 })
  })

  // Can also check for opposte with .not
  test('one plus two is not zero', () => {
    expect(1 + 2).not.toBe(0)
  })
```

## Truthiness
Jest has explicit helpers for different falsy values such as `null`, `undefined`, and `false`.
* `toBeNull` matches only `null`
* `toBeUndefined` matches only `undefined`
* `toBeDefined` is opposite of `toBeUndefined`
* `toBeTruthy` matches any truthy 
* `toBeFalsy` matches any falsly 

## Numbers 
There are many matchers for comparison of numbers. Note that `toBe` and `toEqual` are equivalent for numbers. For floats, use `toBeCloseTo`. 
```js
  test("two plus two", () => {
    const value = 2 + 2
    expect(value).toBeGreaterThan(3)
    expect(value).toBeGreaterThanOrEqual(3.5)
    expect(value).toBeLessThan(5)
    expect(value).toBeLessThanOrEqual(4.5)

    // toBe and toEqual are same
    expect(value).toBe(4)
    expect(value).toEqual(4)
  })

  test("adding float numbers", () => {
    const value = 0.25 + 0.25
    // expect(value).toBe(0.5) // this wont work bc of rounding 
    expect(value).toBeCloseTo(0.5) // this wil work 
  })
```

## Strings
Can use `toMatch` to compare strings to regexp 
```js
  test("there is no I in team", () => {
    expect('team').not.toMatch(/I/)
  })
```

## Array and iterables
Can check if an array or iterable contains a particular item using `toContain`
```js
const shoppingList = [
  "diapers",
  "peanuts",
  "chips",
  "shrimp"
]

test("don't forget shrimp!", () => {
  expect(shoppingList).toContain("shrimp")
  expect(new Set(shoppingList)).toContain("shrimp")
})
```