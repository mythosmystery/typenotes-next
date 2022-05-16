import { ChakraProvider } from "@chakra-ui/react"

import theme from "../theme"
import { AppProps } from "next/app"
import { DarkModeSwitch } from "../components/atoms/DarkModeSwitch"
import { Breadcrumbs } from "../components/atoms/Breadcrumbs"
import "highlightjs/styles/atom-one-dark.css"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <DarkModeSwitch />
      <Breadcrumbs />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
