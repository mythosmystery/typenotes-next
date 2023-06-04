import { Box, Heading, Text, Flex, Editable } from '@chakra-ui/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { apolloClient } from '../../boot/apollo'
import { MarkdownPreview } from '../../components/molecules/MarkdownPreview'
import { GetNoteById, GetNoteByIdQuery } from '../../generated/graphql'
import { CenterLayout } from '../../layouts/center'

export const getServerSideProps: GetServerSideProps<{
  note?: GetNoteByIdQuery['noteById']
  error?: string
}> = async context => {
  const id = context.params.id as string
  try {
    const { data } = await apolloClient.query<GetNoteByIdQuery>({
      query: GetNoteById,
      variables: { id }
    })
    if (!data) {
      return {
        props: { error: 'An error occurred' }
      }
    }
    return {
      props: { note: data.noteById }
    }
  } catch (e) {
    return {
      props: { error: e.message }
    }
  }
}

export default function NoteById({
  note,
  error
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (error || !note) {
    return (
      <CenterLayout>
        <Box>
          <Text>{error || 'An error occurred'}</Text>
        </Box>
      </CenterLayout>
    )
  }
  return (
    <CenterLayout>
      <Flex direction='column' pt={16}>
        <Heading textAlign='center' mb={4}>
          {note.title}
        </Heading>
        <Editable onClick={() => null}>
          <MarkdownPreview isFixed={true}>{note.body}</MarkdownPreview>
        </Editable>
      </Flex>
    </CenterLayout>
  )
}
