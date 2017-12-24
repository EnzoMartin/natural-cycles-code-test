module.exports = {
  /**
   * Get the current date in MySQL datetime format
   * @returns {string}
   */
  getDbDate: () => {
    return new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
  },
  /**
   * Verify email is more or less valid
   * @param {String} email
   * @returns {boolean}
   */
  verifyEmail: email => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)
  },
}
