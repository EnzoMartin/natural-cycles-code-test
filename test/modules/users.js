const expect = require('expect')
const sinon = require('sinon')
const uuid = require('uuid/v4')
const proxyquire = require('proxyquire').noCallThru()
const db = require('mysql').createPool({ host: 'localhost' })

const users = proxyquire('../../service/modules/users', {
  '../config': {
    db,
  },
})

describe('users database module', () => {
  let dbMock

  beforeEach(() => {
    dbMock = sinon.mock(db)
  })

  afterEach(() => {
    dbMock.restore()
  })

  it('returns the list of users', () => {
    dbMock.expects('query').once()
    users.get()

    dbMock.verify()
  })

  it('creates a new user if the email is valid', () => {
    dbMock.expects('query').once()
    users.create('email@email.com')

    dbMock.verify()
  })

  it('does not create a new user if the email is not valid', () => {
    dbMock.expects('query').never()
    const spy = sinon.spy()

    users.create('email', spy)

    dbMock.verify()
    expect(spy.called).toBe(true)
    expect(spy.args[0][0] instanceof Error).toBe(true)
  })

  it('deletes a user if the ID is valid', () => {
    dbMock.expects('query').once()
    users.remove(uuid())

    dbMock.verify()
  })

  it('does not delete a user if the ID is invalid', () => {
    dbMock.expects('query').never()
    const spy = sinon.spy()
    users.remove(1, spy)

    dbMock.verify()
    expect(spy.called).toBe(true)
    expect(spy.args[0][0] instanceof Error).toBe(true)
  })

  it('creates updates an existing user if the email & ID is valid', () => {
    dbMock.expects('query').once()
    users.update(uuid(), 'email@email.com')

    dbMock.verify()
  })

  it('does not update an existing user if the email is not valid', () => {
    dbMock.expects('query').never()
    const spy = sinon.spy()

    users.update(uuid(), 'email', spy)

    dbMock.verify()
    expect(spy.called).toBe(true)
    expect(spy.args[0][0] instanceof Error).toBe(true)
  })

  it('does not update an existing user if the ID is not valid', () => {
    dbMock.expects('query').never()
    const spy = sinon.spy()

    users.update(1, 'email', spy)

    dbMock.verify()
    expect(spy.called).toBe(true)
    expect(spy.args[0][0] instanceof Error).toBe(true)
  })
})
