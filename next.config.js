module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/query',
        destination: 'http://typenotes-server:3001/query'
      }
    ]
  }
  return {
    rewrites
  }
}
