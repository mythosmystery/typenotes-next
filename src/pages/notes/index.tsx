import {
  Box,
  Editable,
  EditablePreview,
  EditableTextarea,
  Text,
  useToast
} from '@chakra-ui/react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
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
import { NoteTree } from '../../components/molecules/NoteTree'
import { debounce } from 'lodash'

export default function Notes() {
  const toast = useToast()
  const [selectedNote, setSelectedNote] = useState<Partial<Note>>(null)

  const { data, error, loading } = useQuery<GetMeQuery>(GetMe)
  const [updateNote] = useMutation<NoteUpdateMutation>(NoteUpdate)

  const noteUpdate = useCallback(debounce(noteUpdateHandler, 5000), [])

  useEffect(() => {
    if (data?.me?.notes?.length > 0) {
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
      toast({
        title: 'Error updating note',
        description: errors[0].message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
    if (data) {
      toast({
        title: 'Note saved',
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
        isClosable: true
      })
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
        <NoteTree />
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
