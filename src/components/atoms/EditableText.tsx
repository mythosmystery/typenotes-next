import {
  Editable,
  EditableInput,
  EditablePreview,
  Button,
  useEditableControls,
  Input,
  InputGroup,
  InputRightElement,
  Flex
} from '@chakra-ui/react'

import { CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react'

interface EditableTextProps {
  category: string
  callback: (value: string, oldValue: string) => void
}

export const EditableText = ({ category, callback }: EditableTextProps) => {
  const [value, setValue] = useState(category)
  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls()
    return (
      <>
        {isEditing ? (
          <Button size='xs' {...getSubmitButtonProps()}>
            <CheckIcon />
          </Button>
        ) : null}
      </>
    )
  }

  return (
    <Editable
      ml={2}
      mt={2}
      value={value}
      onChange={e => setValue(e)}
      onSubmit={e => callback(e, category)}
    >
      <EditablePreview />
      <InputGroup>
        <InputRightElement>
          <EditableControls />
        </InputRightElement>
        <Input variant='flushed' as={EditableInput} />
      </InputGroup>
    </Editable>
  )
}
