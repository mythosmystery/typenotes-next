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
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { ArrowForwardIcon, AddIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { CenterLayout } from '../../layouts/center'
import { Titlebar } from '../../components/atoms/Titlebar'
import { MarkdownPreview } from '../../components/molecules/MarkdownPreview'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  GetMe,
  GetMeQuery,
  Note,
  NoteUpdate,
  NoteUpdateMutation
} from '../../generated/graphql'
import { debounce } from 'lodash'
import { Event } from 'ws'

export default function Notes() {
  const router = useRouter()
  const [selectedNote, setSelectedNote] = useState<Partial<Note>>(null)

  const { data, error, loading } = useQuery<GetMeQuery>(GetMe)
  const [updateNote] = useMutation<NoteUpdateMutation>(NoteUpdate)

  const noteUpdate = useCallback(debounce(noteUpdateHandler, 2000), [])

  useEffect(() => {
    if (data?.me?.notes?.length > 0) {
      console.log(data.me.notes)
      setSelectedNote({
        ...data.me.notes[0]
      })
    }
  }, [data?.me?.notes])

  if (error || !data?.me) {
    return (
      <CenterLayout>
        <Text>Error: {error?.message}</Text>
      </CenterLayout>
    )
  }

  async function noteUpdateHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    console.log(e.target.value)
    if (!selectedNote?._id) return

    const { data, errors } = await updateNote({
      variables: {
        id: selectedNote._id,
        body: e.target.value
      }
    })
    if (errors) {
      console.error(errors)
    }
    if (data) {
      console.log(data)
    }
  }

  return (
    <CenterLayout>
      <Titlebar />
      <Box
        justifyContent='space-between'
        alignItems='start'
        display='flex'
        w='100vw'
      >
        <Editable
          flex={1}
          defaultValue={'# Hello World!'}
          value={selectedNote?.body}
          onChange={e => setSelectedNote(note => ({ ...note, body: e }))}
        >
          <EditablePreview as={MarkdownPreview} />
          <EditableTextarea
            h='85vh'
            mx='24'
            py='8'
            _focus={{
              ring: 'none',
              border: 'none',
              outline: 'none'
            }}
            onChange={noteUpdate}
          />
        </Editable>
      </Box>
    </CenterLayout>
  )
}
