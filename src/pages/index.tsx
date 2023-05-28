import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Divider,
  Box,
  Button
} from '@chakra-ui/react'
import { useHookstate } from '@hookstate/core'
import { CenterLayout } from '../layouts/center'
import { globalState } from '../state'

const Index = () => {
  const state = useHookstate(globalState)
  const path = state.authenticated.get() ? '/notes' : '/login'
  return (
    <CenterLayout>
      <Text
        textAlign='center'
        fontSize='6xl'
        bgGradient='linear(to-l, heroGradientEnd, heroGradientStart)'
        bgClip='text'
      >
        Welcome to Typenotes!
      </Text>
      <Box maxW='50rem' px='2rem'>
        <Divider />
        <Text textAlign='center' fontSize='xl' mt={4}>
          Typenotes is a simple, open-source, and free online notes app. Make
          your knowledge come to life with this intuitive and beautiful
          interface. Organize and track your notes and tasks
        </Text>
      </Box>
      <Box pt='8'>
        <Button bg='brand' as={ChakraLink} href={path} w={64}>
          Get Started!
        </Button>
      </Box>
    </CenterLayout>
  )
}

export default Index
