/* eslint-disable no-process-env */

const dotenv = require('dotenv')
const bunyan = require('bunyan')
const Promise = require('bluebird')

dotenv.config()

// Promises suck but Bluebird makes them suck less
Promise.promisifyAll(require('mysql/lib/Connection').prototype)
Promise.promisifyAll(require('mysql/lib/Pool').prototype)
Promise.promisifyAll(require('next'))

const mysql = require('mysql')
const pjson = require('../package.json')
const env = process.env.NODE_ENV
const isDev = env !== 'production'
const maxAge = 1209600000 // 2 weeks

const logger = bunyan.createLogger({
  name: pjson.name,
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
})

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
})

module.exports = {
  env,
  isDev,
  signals: ['SIGTERM', 'SIGINT'],
  logger,
  db,
  service: {
    port: process.env.PORT || 3000,
    cookie: {
      secret: 'iloveunicorns', // They're fabulous
      secure: !isDev,
      httpOnly: true,
      maxAge,
      resave: true,
      saveUninitialized: false,
    },
  },
  next: {
    dev: isDev,
    dir: './client',
  },
  storeConfig: {
    createDatabaseTable: false,
    expiration: maxAge,
  },
}
