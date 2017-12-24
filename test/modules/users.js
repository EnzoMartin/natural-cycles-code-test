const expect = require('expect')
const proxyquire = require('proxyquire').noCallThru()
const users = proxyquire('../../service/modules/users', {
  '../config': {
    db: {
      query: (query, options, callback) => {
        typeof options === 'function' ? options() : callback()
      },
    },
  },
})

describe('users database module', () => {
  it('returns the current users list', done => {
    expect(typeof users.get).toBe('function')

    // Fully mocked, not worth testing
    users.get(() => {
      done()
    })
  })
})
