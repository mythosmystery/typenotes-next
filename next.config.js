module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/query',
        destination: 'http://typenotes-server:3001/query'
      },
      {
        source: '/gql',
        destination: 'http://typenotes-server:3001/gql'
      }
    ]
  }
  return {
    rewrites
  }
}
