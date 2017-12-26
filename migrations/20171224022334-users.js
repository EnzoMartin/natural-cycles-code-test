const async = require('async')
const uuid = require('uuid/v4')
const { getDbDate } = require('../service/utils')

let dbm
let type
let seed

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function(db, callback) {
  async.series(
    [
      db.createTable.bind(db, 'users', {
        id: { type: 'char(36)', primaryKey: true, notNull: true },
        email: { type: 'varchar(255)', notNull: true },
        createdAt: {
          type: 'datetime',
          notNull: true,
          defaultValue: 'CURRENT_TIMESTAMP',
        },
        modifiedAt: {
          type: 'datetime',
          notNull: true,
          defaultValue: 'CURRENT_TIMESTAMP',
        },
        deletedAt: { type: 'datetime' },
      }),
      db.insert.bind(
        db,
        'users',
        ['id', 'email'],
        [uuid(), 'picard@hogwarts.com']
      ),
      db.insert.bind(
        db,
        'users',
        ['id', 'email'],
        [uuid(), 'riddick@mylittlepony.com']
      ),
      db.insert.bind(
        db,
        'users',
        ['id', 'email'],
        [uuid(), 'logan@mordor.com']
      ),
      db.insert.bind(
        db,
        'users',
        ['id', 'email'],
        [uuid(), 'starlord@zune.com']
      ),
      db.insert.bind(
        db,
        'users',
        ['id', 'email'],
        [uuid(), 'marco@italianstallions.com']
      ),
      db.insert.bind(
        db,
        'users',
        ['id', 'email', 'deletedAt'],
        [uuid(), 'tammy@birdperson.com', getDbDate()]
      ),
    ],
    callback
  )
}

exports.down = function(db, callback) {
  async.series([db.dropTable.bind(db, 'users')], callback)
}

exports._meta = {
  version: 1,
}
