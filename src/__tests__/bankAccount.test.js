import bankAccount from '../bankAccount'

describe('Test bankAccount methods and properties', () => {
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

  test('withdrawMoney should correctly alter balance', () => {
    bankAccount.withdrawMoney(2000)
    expect(bankAccount.balance).toBe(-1000)
  })
})
