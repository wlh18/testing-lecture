const { sum, sayHello } = require('../functions')

test('adds 1 + 1 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('sayHello says hello', () => {
  expect(sayHello()).toBe('hello')
})

test('object assignment', () => {
  const data = { one: 1 }
  data['two'] = 2
  expect(data).toEqual({ one: 1, two: 2 })
})

test('Expect true to be truthy', () => {
  expect(true).toBeTruthy()
})

let names = ['andrew', 'matias', 'scott', 'cole']

test('Expect names to contain andrew', () => {
  expect(names).toContain('andrew')
})

test('Add 1 and 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
  expect(sum(1, 2)).not.toBeNaN()
})

test('Names contains andrew and not brandon', () => {
  expect(names).toContain('andrew')
  expect(names).not.toContain('brandon')
})
