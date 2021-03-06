import { ApolloClient, ApolloLink, createHttpLink, HttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

// const authLink = new ApolloLink((operation, forward) => {
//   operation.setContext({

//   })
//   return forward(operation).map(response => {
//     const context = operation.getContext()
//     const token = context.response.headers.get("X-Token")
//     if (token) localStorage.setItem("token", token)
//     const refreshToken = context.response.headers.get("X-Refresh-Token")
//     if (refreshToken) localStorage.setItem("refresh_token", refreshToken)
//     return response
//   })
// })

const httpLink = createHttpLink({
  uri: "http://localhost:3001/query"
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")
  const refreshToken = localStorage.getItem("refreshToken")
  return {
    headers: {
      ...headers,
      "x-token": token,
      "x-refresh-token": refreshToken
    }
  }
})

const link = authLink.concat(httpLink)

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
