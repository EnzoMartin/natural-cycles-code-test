const expect = require('expect')
const utils = require('../service/utils')

describe('utils module', () => {
  it('returns the current date in MySQL format', () => {
    expect(typeof utils.getDbDate).toBe('function')
    expect(typeof utils.getDbDate()).toBe('string')
    expect(
      /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/.test(
        utils.getDbDate()
      )
    ).toBe(true)
  })

  it('verifies that most emails are valid and returns true/false', () => {
    expect(typeof utils.verifyEmail).toBe('function')
    expect(utils.verifyEmail('test@test.com')).toBe(true)
    expect(utils.verifyEmail('tt@te.net')).toBe(true)
    expect(utils.verifyEmail('test@testcom')).toBe(false)
    expect(utils.verifyEmail('testtest.com')).toBe(false)
  })
})
