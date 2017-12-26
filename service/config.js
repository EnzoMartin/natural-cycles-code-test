/* eslint-disable no-process-env */

const bunyan = require('bunyan')
const Promise = require('bluebird')

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
  user: process.env.DB_USER || process.env.MYSQL_USER,
  password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD,
  port: process.env.DB_PORT || 3306,
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
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'thereisnospoon',
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
