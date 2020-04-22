const { sum, sayHello } = require('../functions')

test('Adds 1 and 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('Adds 6 and 12 to equal 18', () => {
  expect(sum(6, 12)).toBe(18)
})

test('sayHello says hello', () => {
  expect(sayHello()).toBe('hello')
})

test('test deep equality', () => {
  const data = { one: 1 }
  data['two'] = 2
  expect(data).toEqual({ one: 1, two: 2 })
})

test('can use toEqual matcher on arrays', () => {
  const data = [1, 2, 3]
  expect(data).toEqual([1, 2, 3])
})

const names = ['Andrew', 'Becca', 'Scott']

test('names includes Scott', () => {
  expect(names).toContain('Scott')
})

test('names does not include Brandon', () => {
  expect(names).not.toContain('Brandon')
})

test('true is truthy', () => {
  expect(true).toBeTruthy()
})
