import { Button, Center, Input, Link, Stack, Text } from "@chakra-ui/react"
import NLink from "next/link"
import { useState } from "react"
import { CgNotes } from "react-icons/cg"
import { PasswordInput } from "../components/atoms/PasswordInput"
import { CenterLayout } from "../layouts/center"

export default function Register() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const handleEmailChange = e => {
    setEmail(e.target.value)
  }
  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ email, password, name })
  }
  return (
    <CenterLayout>
      <Text fontSize="4xl" mb={2}>
        Join Typenotes
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input placeholder="Enter Email" value={email} type="email" name="email" onChange={handleEmailChange} />
          <Input placeholder="Enter Name" value={name} type="text" name="name" onChange={handleNameChange} />
          <PasswordInput value={password} setValue={setPassword} />
          <Button type="submit" bg="brand">
            Register
          </Button>
          <Text>
            Already have an account?
            <NLink href="/login">
              <Link color="link" ml={2}>
                Login
              </Link>
            </NLink>
          </Text>
        </Stack>
      </form>
    </CenterLayout>
  )
}
