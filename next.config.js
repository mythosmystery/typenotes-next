module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/gql',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'http://typenotes-server:4000/gql'
            : 'http://localhost:4000/gql'
      }
    ]
  }
  return {
    rewrites
  }
}
