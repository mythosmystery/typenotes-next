import { useMutation } from '@apollo/client'
import {
  Button,
  Center,
  Input,
  Link,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react'
import NLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  RegisterMutation,
  Register as RegisterQuery
} from '../generated/graphql'
import { CenterLayout } from '../layouts/center'
import { loginUser } from '../state'

type RegisterFormInput = {
  username: string
  email: string
  fullName: string
  password: string
}

export default function Register() {
  const toast = useToast()
  const router = useRouter()
  const { register, handleSubmit } = useForm<RegisterFormInput>()
  const [registerUser] = useMutation<RegisterMutation>(RegisterQuery)
  const [show, setShow] = useState(false)

  const onSubmit: SubmitHandler<RegisterFormInput> = async data => {
    try {
      const {
        data: { register: res }
      } = await registerUser({
        variables: {
          data
        }
      })
      if (res.accessToken && res.refreshToken) {
        loginUser(res.user, res.accessToken, res.refreshToken)
        toast({
          title: 'Account created successfully',
          status: 'success',
          duration: 2000
        })
        router.push('/notes')
      } else {
        toast({
          title: 'Error',
          description: 'Error creating account',
          status: 'error',
          duration: 5000
        })
      }
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Error creating account',
        status: 'error',
        duration: 5000
      })
    }
  }

  return (
    <CenterLayout>
      <Text fontSize='4xl' mb={2}>
        Join Typenotes
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Input
            placeholder='Enter Username'
            type='text'
            name='username'
            {...register('username', { required: true })}
          />
          <Input
            placeholder='Enter Email'
            type='email'
            name='email'
            {...register('email', { required: true })}
          />
          <Input
            placeholder='Enter Name'
            type='text'
            name='fullName'
            {...register('fullName', { required: true })}
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
            Register
          </Button>
          <Text>
            Already have an account?
            <NLink href='/login'>
              <Link color='link' ml={2}>
                Login
              </Link>
            </NLink>
          </Text>
        </Stack>
      </form>
    </CenterLayout>
  )
}
