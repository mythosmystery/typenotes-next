import {
  Box,
  Button,
  Center,
  Input,
  Link,
  LinkBox,
  Stack,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import NLink from 'next/link'
import { PasswordInput } from '../components/atoms/PasswordInput'
import { CenterLayout } from '../layouts/center'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { Login, LoginMutation } from '../generated/graphql'
import { globalState, loginUser } from '../state'
import { useHookstate } from '@hookstate/core'

export default function LoginPage() {
  const router = useRouter()
  const [login] = useMutation<LoginMutation>(Login)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {
      data: { login: res }
    } = await login({
      variables: {
        data: { email, password }
      }
    })
    if (res.accessToken && res.refreshToken) {
      loginUser(res.user, res.accessToken, res.refreshToken)
      router.push('/notes')
    } else {
      console.error('Error logging in')
    }
  }
  return (
    <CenterLayout>
      <Text fontSize='4xl' mb={2}>
        Welcome back!
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input
            placeholder='Enter Email'
            type='email'
            value={email}
            onChange={handleEmailChange}
          />
          <PasswordInput value={password} setValue={setPassword} />
          <Button type='submit' bg='brand'>
            Login
          </Button>
          <Text>
            Don't have an account?
            <NLink href='/register'>
              <Link color='link' ml={2}>
                Create one!
              </Link>
            </NLink>
          </Text>
        </Stack>
      </form>
    </CenterLayout>
  )
}
