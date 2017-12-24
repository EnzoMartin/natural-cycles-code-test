const config = require('./config')

const express = require('express')
const async = require('async')
const next = require('next')

// Routes
const users = require('./modules/users')

// Middleware imports
const bunyan = require('express-bunyan-logger')
const session = require('express-session')
const Store = require('express-mysql-session')(session) // TODO: Move to Redis if added later

// Configuration
const { service, logger, db, storeConfig, signals } = config
const app = next(config.next)
const handle = app.getRequestHandler()

class Service {
  constructor() {
    this.log = logger.child({ logger: 'service' })

    app
      .prepare()
      .then(() => {
        this.server = express()

        this.store = new Store(storeConfig, db)

        // Handle the Docker kill signals and attempt a graceful shutdown
        signals.forEach(signal => {
          process.once(signal, () => {
            this.stop()
          })
        })

        this.setupMiddleware()
        this.setupRoutes()
        this.start()
      })
      .catch(err => {
        this.log.error({ err }, 'Encountered an error trying to start service')
      })
  }

  setupMiddleware() {
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
    this.server.set('trust proxy', 1)
  }

  setupRoutes() {
    this.server.get('/users', (req, res) => {
      users.get((err, data) => {
        if (err) {
          req.log.error({ err }, 'Failed to fetch users from database')
          res.status(500)
          data = []
        }

        app.render(req, res, '/users', data)
      })
    })

    this.server.post('/users', (req, res) => {
      return res.json(users.create(req.body))
    })

    this.server.put('/users/:id', (req, res) => {
      return res.json(users.update(req.params.id, req.body))
    })

    this.server.delete('/users/:id', (req, res) => {
      return res.json(users.remove(req.params.id))
    })

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
