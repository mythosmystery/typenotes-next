module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/gql',
        destination: 'http://localhost:4000/gql'
        // destination: 'http://typenotes-server:4000/gql'
      }
    ]
  }
  return {
    rewrites
  }
}
