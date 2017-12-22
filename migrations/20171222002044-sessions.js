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
      db.createTable.bind(db, 'sessions', {
        session_id: { type: 'varchar(128)', primaryKey: true, notNull: true },
        expires: { type: 'int(11)', notNull: true },
        data: { type: 'text' },
      }),
    ],
    callback
  )
}

exports.down = function(db, callback) {
  async.series([db.dropTable.bind(db, 'sessions')], callback)
}

exports._meta = {
  version: 1,
}
