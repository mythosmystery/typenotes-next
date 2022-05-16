import { Center, Stack } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Breadcrumbs } from "../components/atoms/Breadcrumbs"
import { DarkModeSwitch } from "../components/atoms/DarkModeSwitch"

export const CenterLayout = ({ children }) => {
  const router = useRouter()
  const path = router.pathname.split("/")
  return (
    <>
      <Head>
        <title>
          {path[1] ? path[path.length - 1][0].toUpperCase() + path[path.length - 1].slice(1) : "Home"} - Typenotes
        </title>
      </Head>
      <Center h="100vh" maxW="100vw" overflowX="hidden">
        <Stack align="center">{children}</Stack>
      </Center>
    </>
  )
}
