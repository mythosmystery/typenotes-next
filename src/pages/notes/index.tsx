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
  Heading,
  Icon,
  IconButton,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import { ArrowForwardIcon, AddIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { CenterLayout } from '../../layouts/center'
import { Titlebar } from '../../components/atoms/Titlebar'
import { MarkdownPreview } from '../../components/molecules/MarkdownPreview'
import { gql, useQuery } from '@apollo/client'
import { GetMe, GetMeQuery, Note } from '../../generated/graphql'
export default function Notes() {
  const router = useRouter()
  const [selectedNote, setSelectedNote] = useState<Partial<Note>>(null)
  const { data, error, loading } = useQuery<GetMeQuery>(GetMe)
  if (error || !data?.results) {
    return (
      <CenterLayout>
        <Text>Error: {error?.message}</Text>
      </CenterLayout>
    )
  }

  const { results } = data

  return (
    <CenterLayout>
      <Titlebar />
      <Box
        justifyContent='space-between'
        alignItems='start'
        display='flex'
        w='100vw'
      >
        <Box
          justifyContent='center'
          display='flex'
          flexDir='column'
          minW='300px'
          px={6}
        >
          <Text textAlign='center' fontSize='2xl' color='gray.500'>
            {results.fullName.split(' ')[0]}'s Notes
          </Text>
          <Divider />
          <Box
            display='flex'
            flexDir='row'
            justifyContent='center'
            alignItems='center'
            _hover={{ bg: 'brand', cursor: 'pointer' }}
            _active={{ bg: 'blue.400', cursor: 'pointer' }}
          >
            <AddIcon w={4} h={4} />
            <Text fontSize='xl' ml='3' my={4}>
              Create
            </Text>
          </Box>
          <Divider />
          {(results.notes || []).map((note: Note) => (
            <Box key={note._id}>
              <Text
                textAlign='center'
                // onClick={() => router.push(`/notes/${note._id}`)}
                onClick={() => setSelectedNote(note)}
                fontSize='xl'
                py={4}
                _hover={{ bg: 'brand', cursor: 'pointer' }}
              >
                {note.title}
              </Text>
              <Divider />
            </Box>
          ))}
        </Box>
        <Editable
          flex={1}
          defaultValue={'# Hello World!'}
          value={selectedNote?.body}
          onChange={e => setSelectedNote(note => ({ ...note, body: e }))}
        >
          <EditablePreview as={MarkdownPreview} />
          <EditableTextarea h='85vh' />
        </Editable>
      </Box>
    </CenterLayout>
  )
}
