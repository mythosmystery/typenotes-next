import { Box, Button, Center, Input, Link, LinkBox, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import NLink from "next/link"
import { PasswordInput } from "../components/atoms/PasswordInput"
import { CenterLayout } from "../layouts/center"
import { CgNotes } from "react-icons/cg"
import { useRouter } from "next/router"

export default function Login() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ email, password })
    router.push("/notes")
  }
  return (
    <CenterLayout>
      <Text fontSize="4xl" mb={2}>
        Welcome back!
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input placeholder="Enter Email" type="email" value={email} onChange={handleEmailChange} />
          <PasswordInput value={password} setValue={setPassword} />
          <Button type="submit" bg="brand">
            Login
          </Button>
          <Text>
            Don't have an account?
            <NLink href="/register">
              <Link color="link" ml={2}>
                Create one!
              </Link>
            </NLink>
          </Text>
        </Stack>
      </form>
    </CenterLayout>
  )
}
