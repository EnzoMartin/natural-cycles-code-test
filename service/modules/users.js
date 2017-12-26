const uuid = require('uuid/v4')

const { getDbDate, verifyEmail, verifyUUid } = require('../utils')
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
      id: uuid(),
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

    if (verifyUUid(id)) {
      return db.query(
        'UPDATE users SET modifiedAt = ?, deletedAt = ? WHERE id = ?',
        [dateTime, dateTime, id],
        callback
      )
    } else {
      return callback(new Error('ID is not valid'))
    }
  },
  /**
   * Update an existing user
   * @param {String} id
   * @param {String} email
   * @param {Function} callback
   * @returns {*}
   */
  update: (id, email, callback) => {
    if (verifyUUid(id)) {
      if (verifyEmail(email)) {
        return db.query(
          'UPDATE users SET email = ?, modifiedAt = ? WHERE id = ?',
          [email, getDbDate(), id],
          callback
        )
      } else {
        return callback(new Error('Email is not valid'))
      }
    } else {
      return callback(new Error('ID is not valid'))
    }
  },
}
