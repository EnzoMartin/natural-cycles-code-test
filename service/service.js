const config = require('./config')

const express = require('express')
const async = require('async')
const next = require('next')
const multer = require('multer')

// Routes
const users = require('./modules/users')

// Middleware imports
const bunyan = require('express-bunyan-logger')
const session = require('express-session')
const Store = require('express-mysql-session')(session)
const bodyParser = require('body-parser')
const compression = require('compression')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Configuration
const { service, logger, db, storeConfig, signals, admin } = config
const app = next(config.next)
const handle = app.getRequestHandler()
const parseForm = multer()

class Service {
  constructor() {
    this.log = logger.child({ logger: 'service' })

    this.server = express()
    this.store = new Store(storeConfig, db)

    // Handle the Docker kill signals and attempt a graceful shutdown
    signals.forEach(signal => {
      process.once(signal, () => {
        this.stop()
      })
    })

    this.setupMiddleware()
    this.setupAuth()
    this.setupAuthRoutes()
    this.setupRoutes()
  }

  initialize() {
    app
      .prepare()
      .then(() => {
        this.start()
      })
      .catch(err => {
        this.log.error({ err }, 'Encountered an error trying to start service')
      })
  }

  setupAuth() {
    passport.use(
      new LocalStrategy({}, (username, password, done) => {
        if (username === admin.username && password === admin.password) {
          done(null, { username })
        } else {
          done(null, false)
        }
      })
    )

    passport.serializeUser((user, done) => {
      done(null, user)
    })

    passport.deserializeUser((user, done) => {
      done(null, user)
    })

    this.server.use(passport.initialize())
    this.server.use(passport.session())
  }

  setupMiddleware() {
    this.server.use(bodyParser.urlencoded({ extended: false }))
    this.server.use(bodyParser.json())

    this.server.use(
      compression({
        filter: function(req, res) {
          return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
        },
        level: 9,
      })
    )

    this.server.use(
      bunyan({
        logger: this.log,
        // Who hates console spam? Me!
        excludes: [
          'body',
          'req-headers',
          'res-headers',
          'user-agent',
          'response-hrtime',
        ],
      })
    )

    this.server.use(
      session({
        store: this.store,
        ...service.cookie,
      })
    )

    this.server.set('x-powered-by', false)
    this.server.set('trust proxy', 1)
  }

  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.session.redirectTo && req.session.redirectTo !== '/login') {
        const redirectTo = req.session.redirectTo
        delete req.session.redirectTo
        res.redirect(redirectTo)
      } else {
        next()
      }
    } else {
      req.session.redirectTo = req.originalUrl
      res.redirect('/login')
    }
  }

  ensureNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/users')
    } else {
      next()
    }
  }

  setupAuthRoutes() {
    this.server.get('/logout', this.ensureAuthenticated, (req, res) => {
      req.logout()
      return res.redirect('/login')
    })

    this.server.get('/login', this.ensureNotAuthenticated, (req, res) => {
      return app.render(req, res, '/login')
    })

    this.server.post(
      '/login',
      passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/login',
      })
    )
  }

  setupRoutes() {
    this.server.get('/', (req, res) => {
      res.redirect('/users')
    })

    this.server.get('/users', this.ensureAuthenticated, (req, res) => {
      users.get((err, data) => {
        if (err) {
          req.log.error({ err }, 'Failed to fetch users from database')
          res.status(500)
          data = []
        }

        app.render(req, res, '/users', data)
      })
    })

    this.server.post('/users', this.ensureAuthenticated, (req, res, next) => {
      users.create(req.body.email, err => {
        if (err) {
          req.log.error({ err }, 'Failed to create new user')
          res.status(500)
          res.redirect(`/users?error=true&email=${req.body.email}`)
        } else {
          res.redirect('/users')
        }

        next()
      })
    })

    this.server.put(
      '/users/:id',
      this.ensureAuthenticated,
      parseForm.array(),
      (req, res, next) => {
        users.update(req.params.id, req.body.email, err => {
          if (err) {
            req.log.error({ err, id: req.params.id }, 'Failed to update user')
            res.status(500)
          }

          res.json({ success: !err })
          next()
        })
      }
    )

    this.server.delete(
      '/users/:id',
      this.ensureAuthenticated,
      (req, res, next) => {
        users.remove(req.params.id, err => {
          if (err) {
            req.log.error({ err, id: req.params.id }, 'Failed to delete user')
            res.status(500)
          }

          res.json({ success: !err })
          next()
        })
      }
    )

    this.server.get('*', (req, res) => {
      return handle(req, res)
    })
  }

  stop() {
    this.log.info('Attempting to shut down service gracefully')

    async.parallel(
      [
        callback => {
          this.store.close(callback)
        },
        callback => {
          db.end(callback)
        },
      ],
      err => {
        if (err) {
          this.log.error({ err }, 'Failed to shutdown gracefully')
          process.exit(1)
        } else {
          this.log.info('Graceful shutdown complete')
          process.exit(0)
        }
      }
    )
  }

  start() {
    this.server.listen(service.port, err => {
      if (err) {
        this.log.error({ err }, 'Service failed to start')
        throw err
      } else {
        this.log.info(`Service started on http://localhost:${service.port}`)
      }
    })
  }
}

module.exports = Service
