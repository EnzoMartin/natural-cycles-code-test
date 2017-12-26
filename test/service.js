const expect = require('expect')
const sinon = require('sinon')

const Service = require('../service/service')

describe('service module', () => {
  it('exposes the Service class with an initialize method', () => {
    expect(typeof Service).toBe('function')
    expect(typeof new Service().initialize).toBe('function')
  })

  describe('Service class instance method', () => {
    let service
    let redirectSpy
    let nextSpy
    let res
    let request = {
      session: {},
      isAuthenticated: function() {
        return this.isAuthed
      },
    }

    before(() => {
      service = new Service()
    })

    beforeEach(() => {
      redirectSpy = sinon.spy()
      nextSpy = sinon.spy()

      res = {
        redirect: redirectSpy,
      }
    })

    describe('ensureAuthenticated', () => {
      it('passes on the request if it is authenticated', () => {
        const req = {
          ...request,
          isAuthed: true,
        }

        service.ensureAuthenticated(req, res, nextSpy)
        expect(nextSpy.calledOnce).toBe(true)
      })

      it('redirects the request to the previous page if newly authenticated', () => {
        const req = {
          ...request,
          session: {
            redirectTo: '/users',
          },
          isAuthed: true,
        }

        service.ensureAuthenticated(req, res, nextSpy)
        expect(nextSpy.notCalled).toBe(true)
        expect(redirectSpy.calledWith('/users')).toBe(true)
      })

      it('redirects the request to login if it is not authenticated', () => {
        const req = {
          ...request,
          session: {},
          originalUrl: '/custom',
          isAuthed: false,
        }

        service.ensureAuthenticated(req, res, nextSpy)
        expect(nextSpy.notCalled).toBe(true)
        expect(redirectSpy.calledWith('/login')).toBe(true)
        expect(req.session.redirectTo).toBe(req.originalUrl)
      })
    })

    describe('ensureNotAuthenticated', () => {
      it('passes on the request if it is not authenticated', () => {
        const req = {
          ...request,
          isAuthed: false,
        }

        service.ensureNotAuthenticated(req, res, nextSpy)
        expect(nextSpy.calledOnce).toBe(true)
      })

      it('redirects the request to users if it is authenticated', () => {
        const req = {
          ...request,
          isAuthed: true,
        }

        service.ensureNotAuthenticated(req, res, nextSpy)
        expect(nextSpy.notCalled).toBe(true)
        expect(redirectSpy.calledWith('/users')).toBe(true)
      })
    })
  })
})
