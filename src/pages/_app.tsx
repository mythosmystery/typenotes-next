import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { DarkModeSwitch } from '../components/atoms/DarkModeSwitch'
import { Breadcrumbs } from '../components/atoms/Breadcrumbs'
import 'highlightjs/styles/atom-one-dark.css'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../boot/apollo'
import { UserMenu } from '../components/molecules/UserMenu'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <UserMenu />
        <Breadcrumbs />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
