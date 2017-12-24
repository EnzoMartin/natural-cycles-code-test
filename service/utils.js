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
}
