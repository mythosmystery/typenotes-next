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
  useToast
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NoteCreate, NoteCreateMutation } from '../../generated/graphql'
import { useMutation } from '@apollo/client'

type NoteCreateInput = {
  title: string
  category: string
  isPublic: boolean
}

export const NoteTree = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit } = useForm<NoteCreateInput>()
  const [noteCreate] = useMutation<NoteCreateMutation>(NoteCreate)
  const btnRef = React.useRef()

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

  return (
    <>
      <Flex align='center' justify='center' w={40} mt={4}>
        <Button variant='outline' ref={btnRef} onClick={onOpen}>
          <AddIcon />
        </Button>
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
