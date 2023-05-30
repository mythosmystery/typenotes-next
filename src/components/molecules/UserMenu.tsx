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

export const UserMenu = () => {
  const toast = useToast()
  const router = useRouter()
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
          <MenuItem onClick={handleProfile}>profile</MenuItem>
          <MenuItem onClick={handleSettings}>settings</MenuItem>
          <MenuItem onClick={handleLogout}>log out</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}
