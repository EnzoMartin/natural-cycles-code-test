const async = require('async')

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
