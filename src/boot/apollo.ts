import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { globalState } from '../state'

const forwardLink = new ApolloLink((operation, forward) => {
  operation.setContext({})
  return forward(operation).map(response => {
    const context = operation.getContext()
    const token = context.response.headers.get('X-Access-Token')
    if (token) {
      globalState.token.set(token)
      globalState.authenticated.set(true)
      if (!response.data?.me)
        apolloClient.refetchQueries({ include: ['GetMe'] })
    }
    return response
  })
})

const httpLink = createHttpLink({
  uri: '/gql'
})

const authLink = setContext((_, { headers }) => {
  const token = globalState.token.get() || ''
  const refreshToken = globalState.refreshToken.get() || ''
  return {
    headers: {
      ...headers,
      'x-access-token': `Bearer ${token}`,
      'x-refresh-token': `Bearer ${refreshToken}`
    }
  }
})

const link = ApolloLink.from([authLink, forwardLink, httpLink])

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
