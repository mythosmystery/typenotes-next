import {
  Box,
  Button,
  Center,
  Input,
  Link,
  LinkBox,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import NLink from 'next/link'
import { CenterLayout } from '../layouts/center'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { Login, LoginMutation } from '../generated/graphql'
import { globalState, loginUser } from '../state'
import { useHookstate } from '@hookstate/core'
import { SubmitHandler, useForm } from 'react-hook-form'

type LoginFormInput = {
  email: string
  password: string
}

export default function LoginPage() {
  const toast = useToast()
  const router = useRouter()
  const [login] = useMutation<LoginMutation>(Login)
  const [show, setShow] = useState(false)
  const { register, handleSubmit } = useForm<LoginFormInput>()

  const onSubmit: SubmitHandler<LoginFormInput> = async ({
    email,
    password
  }) => {
    try {
      const { data } = await login({
        variables: {
          data: { email, password }
        }
      })
      const res = data?.login
      if (res?.accessToken && res?.refreshToken) {
        loginUser(res.user, res.accessToken, res.refreshToken)
        toast({
          title: 'Logged in successfully',
          status: 'success',
          duration: 2000
        })
        router.push('/notes')
      } else {
        toast({
          title: 'Error',
          description: 'Invalid email or password',
          status: 'error',
          duration: 5000
        })
      }
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        status: 'error',
        duration: 5000
      })
    }
  }
  return (
    <CenterLayout>
      <Text fontSize='4xl' mb={2}>
        Welcome back!
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Input
            placeholder='Enter Email'
            type='email'
            {...register('email', { required: true })}
          />
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
              name='password'
              {...register('password', { required: true })}
            />
            <InputRightElement width='4.5rem'>
              <Button
                h='1.75rem'
                size='sm'
                color='gray.700'
                onClick={() => setShow(!show)}
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
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
