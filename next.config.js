module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/gql',
        destination:
          process.env.NODE_ENV === 'production'
            ? process.env.CI
              ? 'https://typenotes.mythosmystery.dev/gql'
              : 'http://typenotes-server:4000/gql'
            : 'http://localhost:4000/gql'
      }
    ]
  }
  return {
    rewrites
  }
}
