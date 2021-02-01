# Setup and Teardown
Often we will need to set up some test or have some finishing work that needs to happen after the tests run. For example, add 5 users to a db and then remove the 5 users from db. 

## Repeating Setup for Tests
`beforeEach` and `afterEach` is useful for work that needs to be done repeatedly. 

Example we have a test that interacts with a db of cities. We have a method `initCityDb()` that needs to be called before each test and a `clearCityDb()` that needs to run after each test. We can use `beforeEach` and `afterEach` to handle this logic: 
```js
beforeEach(() => {
  initCityDb();
})

afterEach(() => {
  clearCityDb();
})

test("city db has San Francisco", () => {
  // isCity is some other func that checks test db 
  expect(isCity("San Francisco")).toBeTruthy();
})
```

`beforeEach` and `afterEach` handles async in the same ways as tests. [Click here for async md](./testing-async.md)
```js
beforeEach(() => {
  return initCityDb(); 
})
```

## One-Time Setup
Lets say we want to query the db and the info isn't being changed but used for all tests, we can use `beforeAll` and `afterAll` to handle this. 
```js
beforeAll(() => {
  return initCityDb();
})

afterAll(() => {
  return clearCityDb();
})

test("cities have SF", () => {
  expect(isCity("SF")).toBeTruthy(); 
})
```

## Scoping
By default, `before` and `after` apply to all tests in file. Use `describe` to group. `before` and `after` only applies within the `describe` block scope. 
```js
// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```
Note that top-level `beforeEach` is executed before the one inside `describe`.
```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

## Order of execution of describe and test blocks
Jest executes all describe handlers in a test file *before* it executes any actual tests. This is another reason to do setup and teardown inside `before` and `after` handlers (will ensure it gets setup/teardown before/after tests vs setup/teardown during `describe` compilation)
```js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

## Some Advice
If a test is failing, first try running the test by itself using `test.only`. If it oftentimes fails when ran through a larger suite but succeeds on its own, theres a good chance some other test is interfering. 
