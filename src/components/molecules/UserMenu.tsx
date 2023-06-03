import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
  Icon,
  useColorMode,
  useToast
} from '@chakra-ui/react'
import { SettingsIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { logoutUser } from '../../state'
import { useRouter } from 'next/router'
import { useHookstate } from '@hookstate/core'
import { globalState } from '../../state'

export const UserMenu = () => {
  const toast = useToast()
  const router = useRouter()
  const state = useHookstate(globalState)
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  function handleProfile() {
    toast({
      title: 'Coming Soon!',
      description: 'This feature is not yet implemented',
      status: 'info',
      duration: 5000,
      isClosable: true
    })
  }
  function handleSettings() {
    toast({
      title: 'Coming Soon!',
      description: 'This feature is not yet implemented',
      status: 'info',
      duration: 5000,
      isClosable: true
    })
  }
  function handleLogout() {
    logoutUser()
    router.push('/')
  }

  return (
    <Box position='fixed' top={4} right={3}>
      <Menu>
        <MenuButton as={Button} children={<SettingsIcon />} />
        <MenuList>
          <MenuItem onClick={toggleColorMode}>
            {isDark ? <SunIcon color='brand' /> : <MoonIcon color='brand' />}
            <Text ml={4} size='xs'>
              toggle dark mode
            </Text>
          </MenuItem>
          {state.authenticated.get() ? (
            <>
              <MenuItem onClick={handleProfile}>profile</MenuItem>
              <MenuItem onClick={handleSettings}>settings</MenuItem>
              <MenuItem onClick={handleLogout}>log out</MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => router.push('/login')}>log in</MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  )
}
