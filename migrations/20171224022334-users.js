const async = require('async')
const uuid = require('uuid')

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
        [uuid.v4(), 'picard@hogwarts.com']
      ),
      db.insert.bind(
        db,
        'users',
        ['id', 'email'],
        [uuid.v4(), 'riddick@mylittlepony.com']
      ),
      db.insert.bind(
        db,
        'users',
        ['id', 'email'],
        [uuid.v4(), 'logan@mordor.com']
      ),
      db.insert.bind(
        db,
        'users',
        ['id', 'email'],
        [uuid.v4(), 'starlord@zune.com']
      ),
      db.insert.bind(
        db,
        'users',
        ['id', 'email'],
        [uuid.v4(), 'marco@italianstallions.com']
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
