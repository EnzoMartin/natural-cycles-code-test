const expect = require('expect')
const Service = require('../service/service')

describe('main export', () => {
  it('exposes the Service class', () => {
    expect(typeof Service).toBe('function')
  })
})
