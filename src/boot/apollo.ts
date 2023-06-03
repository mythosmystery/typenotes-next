import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  ServerError
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { globalState, logoutUser } from '../state'
import Router from 'next/router'

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors)
  }
  if (networkError) {
    const { statusCode, response, message } = networkError as ServerError
    console.log('networkError', networkError)
    if (statusCode === 401) {
      logoutUser()
      Router.push('/login')
    }
    if (statusCode === 500) {
      Router.push('/server-error')
    }
  }
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
  link: ApolloLink.from([errorLink, link]),
  cache: new InMemoryCache()
})
