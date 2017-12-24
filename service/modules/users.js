const uuid = require('uuid')

const { getDbDate, verifyEmail } = require('../utils')
const { db } = require('../config')

module.exports = {
  /**
   * Get all non-deleted users
   * @param {Function} callback
   * @returns {*}
   */
  get: callback => {
    return db.query(
      'SELECT id, email FROM users WHERE deletedAt IS NULL ORDER BY email',
      callback
    )
  },
  /**
   * Add a new user
   * @param {String} email
   * @param {Function} callback
   * @returns {*}
   */
  create: (email, callback) => {
    const data = {
      email,
      id: uuid.v4(),
    }

    if (verifyEmail(email)) {
      return db.query('INSERT INTO users SET ?', data, callback)
    } else {
      return callback(new Error('Email is not valid'))
    }
  },
  /**
   * Soft delete a user
   * @param {String} id
   * @param {Function} callback
   * @returns {*}
   */
  remove: (id, callback) => {
    const dateTime = getDbDate()

    return db.query(
      'UPDATE users SET updatedAt = ?, deletedAt = ? WHERE id = ?',
      [dateTime, dateTime, id],
      callback
    )
  },
  /**
   * Update an existing user
   * @param {String} id
   * @param {String} email
   * @param {Function} callback
   * @returns {*}
   */
  update: (id, email, callback) => {
    if (verifyEmail(email)) {
      return db.query(
        'UPDATE users SET email = ?, updatedAt = ? WHERE id = ?',
        [email, getDbDate(), id],
        callback
      )
    } else {
      return callback(new Error('Email is not valid'))
    }
  },
}
