module.exports = {
  get: () => {
    return [
      {
        id: 'id',
        email: 'a@a.com',
      },
      {
        id: 'id3',
        email: 'a@a.com',
      },
      {
        id: 'id1',
        email: 'a@a.com',
      },
      {
        id: 'id2',
        email: 'a@a.com',
      },
      {
        id: 'id5',
        email: 'a@a.com',
      },
      {
        id: 'id6',
        email: 'a@a.com',
      },
      {
        id: 'id8',
        email: 'a@a.com',
      },
    ]
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
