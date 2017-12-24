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
})
