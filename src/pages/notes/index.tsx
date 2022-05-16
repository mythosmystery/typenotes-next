import {
  AspectRatio,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Icon,
  IconButton,
  Text,
  Textarea,
  useDisclosure
} from "@chakra-ui/react"
import { useState } from "react"
import { ArrowForwardIcon, AddIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"
import { CenterLayout } from "../../layouts/center"
import { Titlebar } from "../../components/atoms/Titlebar"
import { MarkdownPreview } from "../../components/molecules/MarkdownPreview"
export default function Notes() {
  const notes = [
    { title: "Note 1", id: "asdasfasfa" },
    { title: "Note 2", id: "wieuoaiwue9" },
    { title: "Note 3", id: "jdawodwa" }
  ]
  const router = useRouter()
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <CenterLayout>
      <Titlebar />
      {/* <IconButton aria-label="open menu" icon={<ArrowForwardIcon />} onClick={onOpen} /> */}
      <Box justifyContent="space-between" alignItems="start" display="flex" w="100vw">
        <Box justifyContent="center" display="flex" flexDir="column" minW="300px" px={6}>
          <Text textAlign="center" fontSize="2xl" color="gray.500">
            My Notes
          </Text>
          <Divider />
          <Box
            display="flex"
            flexDir="row"
            justifyContent="center"
            alignItems="center"
            _hover={{ bg: "brand", cursor: "pointer" }}
            _active={{ bg: "blue.400", cursor: "pointer" }}
          >
            <AddIcon w={4} h={4} />
            <Text fontSize="xl" ml="3" my={4}>
              Create
            </Text>
          </Box>
          <Divider />
          {notes.map((note, i) => (
            <>
              <Text
                textAlign="center"
                key={note.id}
                onClick={() => router.push(`/notes/${note.id}`)}
                fontSize="xl"
                py={4}
                _hover={{ bg: "brand", cursor: "pointer" }}
              >
                {note.title}
              </Text>
              <Divider />
            </>
          ))}
        </Box>
        <Editable flex={1} defaultValue="<b>Hello World</b>">
          <EditablePreview as={MarkdownPreview} />
          <EditableTextarea h="85vh" />
        </Editable>
      </Box>
      {/* <Drawer placement="left" onClose={onClose} isOpen={isOpen} isFullHeight={false}>
        <DrawerContent>
          <DrawerHeader borderBlockEndWidth="1px">Notes</DrawerHeader>
          <DrawerBody>
            <p>Note 1</p>
            <p>Note 1</p>
            <p>Note 1</p>
            <p>Note 1</p>
            <p>Note 1</p>
            <p>Note 1</p>
            <p>Note 1</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}
    </CenterLayout>
  )
}
