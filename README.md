# Unit testing/React component testing

## Learning objectives

[Lecture Repo](https://github.com/andrewwestenskow/unit-testing-lecture) <br>

> Checkout to branch `completed` for finished version.<br>

[Mini project](https://github.com/DevMountain/unit-testing-mini-new) <br>
[Afternoon Project](https://github.com/DevMountain/unit-testing-afternoon-new)

- Students can perform unit tests using Jest.
  - Become familiar with the common matchers [Link](https://jestjs.io/docs/en/expect)
    - toBe
    - toEqual
    - not
    - toContain (arrays)
    - toHaveLength
- Students can test React components.
  - Students can test both regular and async components
  - Students can use spyOn and act to control when assertions are run

## Lecture

- Why are we teaching testing?
  - Group project requirements (5 unit tests and 5 mocked components)
  - TDD (Test driven development) [Image](https://miro.medium.com/max/996/1*pP8Ks6tlt718jJg3fqrtvw.jpeg)
  - There is a need for developers who know how to test
    - Podium is a big local company that does entirely test driven development
  - Benefits of unit testing
    - You know what you expect to happen from the start (Debugging in an isolated environment)
    - Documentation for your project
    - Allows you to find holes in your logic you might not have otherwise found

### Jest [Link](https://jestjs.io/)

- Jest is a unit testing library. It allows us to test functions, also known as performing unit tests.
- Jest comes out of the box with create-react-app.
  - With cra, all of our tests need to be located in the src folder, these will not be compiled on build.

1. Create a `__tests__` folder and a `functions.js` file in the src folder.
   > The functions file is for showing off jest functionality. These functions can come from anywhere
2. Create the following functions in the `functions.js` file.

```js
module.exports = {
  sum(a, b) {
    return a + b
  },
  sayHello() {
    return 'hello'
  },
}
```

3. Create a `functions.test.js` file in the `__tests__` folder. Add the following code:

```js
//Import our functions to test
const { sum, sayHello } = require('../functions.js')

// Basic test example
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
  //To be is for simple values
})

// expect gives us access to certain methods to validate return values
test('sayHello says hello', () => {
  expect(sayHello()).toBe('hello')
})
```

> Test is given to us by Jest, it sets up a test block and takes two arguments: a description of the test and a callback function where our assertions will run.
>
> Expect will invoke whatever we pass it and pass the return value to the next function. We can assert things about the returned values which will cause our test to pass or fail. This is done through matchers.

Test the following to show matchers:

```js
// Checking the value of an object
test('object assignment', () => {
  const data = { one: 1 }
  data['two'] = 2
  expect(data).toEqual({ one: 1, two: 2 })
  //toEqual is for more complex values, can check objects
})

test('Expect true to be truthy', () => {
  expect(true).toBeTruthy()
})

//Checking an array contains an items
let names = ['John', 'Ariel', 'Zach']
// let names = [{id: 1, name: 'John'}]

test('Names contains Ariel', () => {
  expect(names).toContain('Ariel')
})
```

> You should also add a couple of more tests to existing blocks to show off the `not` matcher.

```js
test('Add 1 and 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
  expect(sum(1, 2)).not.toBeNaN()
})

test('Names contains Becca', () => {
  expect(names).toContain('Becca')
  expect(names).not.toContain('Preston')
})
```

> [Show off other matchers](https://jestjs.io/docs/en/expect)

> There is a better way to group tests together, a `describe` block. This functions like a test block but holds related tests.

Show setup and teardown of tests:

```js
let bankAccount = {
  balance: 1000,
  depositMoney(amount) {
    this.balance += amount
  },
  withdrawMoney(amount) {
    this.balance -= amount
  },
}

// Grouping tests together
describe('Bank account methods and properties', () => {
  //There is also: beforeAll, afterAll, afterEach
  beforeEach(() => {
    bankAccount.balance = 1000
  })
  test('Initial balance is 1000', () => {
    expect(bankAccount.balance).toBe(1000)
  })
  test('depositMoney should correctly alter balance', () => {
    bankAccount.depositMoney(2000)
    expect(bankAccount.balance).toBe(3000)
  })
  test('withDraw should correctly alter balance', () => {
    bankAccount.withdrawMoney(2000)
    expect(bankAccount.balance).toBe(-1000)
  })
})
```

## Testing React

You can also test entire React components, we'll make sure that our components are displaying what we want them to. This is called mocking your components.

Use the following code:

```js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Header from '../Header'

it('Does not show dropdown when mounted', () => {
  //render will render the component onto the dom and allow us to test it.  It will return an object with a number of properties.

  //To query by test id we have to give it a test id in this format : data-testid
  const { queryByTestId } = render(<Header />)
  //Another option is getBy but since we don't know if there will be a value, we should use queryBy
  const dropdown = queryByTestId('dropdown')

  expect(dropdown).not.toBeTruthy()
  //We expect the dropdown to not be rendered so it should not be truthy.
})

it('Shows dropdown when hamburger is clicked', () => {
  const { container, getByTestId } = render(<Header />)
  //Container has information about the html element.  getByTestId is similar to queryByTestId but will return an error if no match is found

  const hamburger = getByTestId('hamburger-button')

  fireEvent.click(hamburger)

  expect(container.textContent).toContain('Dropdown menu')
})
```

### Async component testing

Often we need to test components that have async logic, ie network calls:

```js
import React from 'react'
import { render, act } from '@testing-library/react'
//act will assure that all 'units' of interaction inside of your component (like data fetching, user events, rendering) are completed before you run any assertions.

//Because our component is making a request, we need to wrap our initial rendering of Todos in an async version of Todos
import axios from 'axios'
import Todos from '../Components/Todos'

it('Renders todos', async () => {
  let component
  //Initializes a variable for us to test later.

  jest
    .spyOn(axios, 'get')
    //spyOn watches the axios object and tracks any calls to the get method
    .mockImplementation(() =>
      //mockImplementation intercepts those calls and replaces the functionality with what I say.
      Promise.resolve({ data: [{ id: 1, title: 'test title' }] })
    )

  await act(async () => {
    const { container } = render(<Todos />)
    component = container
    //Grabs the dom container from the Todos component and reassigns it to the component variable
  })

  expect(component.textContent).toContain('test title')
})
```
