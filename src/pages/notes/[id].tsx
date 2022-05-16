import { Box, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { CenterLayout } from "../../layouts/center"

export default function NoteById() {
  const router = useRouter()
  return (
    <CenterLayout>
      <Box>
        <Text>Note by id {router.query.id}</Text>
      </Box>
    </CenterLayout>
  )
}
