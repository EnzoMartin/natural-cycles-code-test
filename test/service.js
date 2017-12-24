const expect = require('expect')
const Service = require('../service/service')

describe('service module', () => {
  it('exposes the Service class', () => {
    expect(typeof Service).toBe('function')
  })
})
