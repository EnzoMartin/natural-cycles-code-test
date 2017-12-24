const { db } = require('../config')

module.exports = {
  get: callback => {
    db.query(
      'SELECT id, email FROM users WHERE deletedAt IS NULL ORDER BY email',
      callback
    )
  },
  create: () => {
    return [
      {
        id: 'new',
        email: 'new@new.com',
      },
    ]
  },
  remove: () => {
    return true
  },
  update: () => {
    return {
      id: 'id',
      email: 'modified@new.com',
    }
  },
}
