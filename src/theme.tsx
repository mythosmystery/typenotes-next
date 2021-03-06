import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const fonts = { mono: `'Menlo', monospace`, sans: `'Raleway', sans-serif`, body: `'Raleway', sans-serif` }

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em"
})

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8"
      },
      heroGradientStart: {
        default: "#f02ffa",
        _dark: "#fa2f7a"
      },
      heroGradientEnd: {
        default: "#0ac2bf",
        _dark: "#392ffa"
      },
      brand: {
        default: "#0ac2bf",
        _dark: "#392ffa"
      },
      link: {
        default: "#f02ffa",
        _dark: "#fa2f7a"
      }
    },
    radii: {
      button: "12px"
    }
  },
  colors: {
    black: "#16161D"
  },
  fonts,
  breakpoints
})

export default theme
