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
    [db.addIndex.bind(db, 'users', 'deletedAt', 'deletedAt')],
    callback
  )
}

exports.down = function(db, callback) {
  async.series([db.removeIndex.bind(db, 'users', 'deletedAt')], callback)
}

exports._meta = {
  version: 1,
}
