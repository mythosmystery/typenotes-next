import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  Input,
  useDisclosure,
  Flex,
  Switch,
  useToast,
  InputGroup,
  InputLeftElement,
  Editable,
  EditablePreview,
  EditableInput,
  Text
} from '@chakra-ui/react'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import React, { ChangeEvent, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Note,
  NoteCreate,
  NoteCreateMutation,
  NotesUpdateCategory,
  NotesUpdateCategoryMutation
} from '../../generated/graphql'
import { useMutation } from '@apollo/client'
import { useHookstate } from '@hookstate/core'
import { globalState } from '../../state'
import { debounce } from 'lodash'
import { EditableText } from '../atoms/EditableText'

type NoteCreateInput = {
  title: string
  category: string
  isPublic: boolean
}

interface NoteTreeProps {
  notes: Array<Partial<Note>>
}

export const NoteTree = ({ notes }: NoteTreeProps) => {
  const toast = useToast()
  const { user } = useHookstate(globalState)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit } = useForm<NoteCreateInput>()
  const [search, setSearch] = React.useState('')
  const btnRef = React.useRef()
  const searchUpdate = useCallback(debounce(searchUpdateHandler, 200), [])
  const [noteCreate] = useMutation<NoteCreateMutation>(NoteCreate, {
    refetchQueries: ['GetMe']
  })
  const [categoryUpdate] = useMutation<NotesUpdateCategoryMutation>(
    NotesUpdateCategory,
    {
      refetchQueries: ['GetMe']
    }
  )

  const reducedNotes = notes.filter(noteFilter).reduce(noteReducer, {})

  function searchUpdateHandler(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  const onSubmit: SubmitHandler<NoteCreateInput> = async data => {
    const {
      data: { noteCreate: res },
      errors
    } = await noteCreate({
      variables: {
        data
      }
    })
    if (res) {
      toast({
        title: 'Note created.',
        description: 'We have created your note for you.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      onClose()
    }
    if (errors) {
      console.error(errors)
      toast({
        title: 'An error occurred.',
        description: 'Unable to create note. ${errors[0].message}',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const handleClick = (note: Partial<Note>) => {
    const selectedNote = user.get().selectedNote
    const originalNote = notes.find(n => n._id === selectedNote._id)
    if (selectedNote.body !== originalNote?.body) {
      toast({
        title: 'Note not saved.',
        status: 'warning',
        duration: 5000
      })
      return
    }
    user.selectedNote.set(note)
  }

  function noteReducer(
    acc: { [key: string]: Array<Partial<Note>> },
    note: Partial<Note>
  ) {
    const key = note.category

    if (!acc[key]) {
      acc[key] = []
    }

    acc[key].push(note)

    return acc
  }

  function noteFilter(note: Partial<Note>): boolean {
    return (
      note.title?.toLowerCase().includes(search.toLowerCase()) ||
      note.body?.toLowerCase().includes(search.toLowerCase())
    )
  }

  async function handleCategoryUpdate(category: string, oldCategory: string) {
    const {
      data: { notesUpdateCategory: res },
      errors
    } = await categoryUpdate({
      variables: {
        newCategory: category,
        oldCategory
      }
    })
    if (res) {
      toast({
        title: `Updated category ${oldCategory} -> ${category} for ${res} notes`,
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    }
    if (errors) {
      console.error(errors)
      toast({
        title: 'An error occurred.',
        description: 'Unable to update category. ${errors[0].message}',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <>
      <Flex direction='column' w={40} mt={4}>
        <Flex align='center' justify='center' w={40} my={4}>
          <Button variant='outline' ref={btnRef} onClick={onOpen}>
            <AddIcon />
          </Button>
        </Flex>
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input
            onChange={searchUpdate}
            mx={3}
            mb={2}
            placeholder='search'
            variant='flushed'
          />
        </InputGroup>
        {Object.keys(reducedNotes).map(category => (
          <>
            <EditableText category={category} callback={handleCategoryUpdate} />
            {reducedNotes[category].map(note => (
              <Button
                onClick={() => handleClick(note)}
                my={2}
                size='lg'
                key={note._id}
                variant='link'
              >
                {note.title}
              </Button>
            ))}
          </>
        ))}
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>new note</DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              <Input
                mt={8}
                placeholder='enter your title'
                {...register('title', { required: true })}
              />
              <Input
                mt={8}
                placeholder='enter the category'
                {...register('category', { required: false })}
              />
              <Flex
                mt={8}
                align='center'
                justify='space-between'
                alignItems='center'
                h={12}
              >
                <Switch
                  colorScheme='blue'
                  size='lg'
                  {...register('isPublic')}
                />
                <p>make this note public</p>
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                cancel
              </Button>
              <Button colorScheme='blue' type='submit'>
                save
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  )
}
