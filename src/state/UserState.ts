import { globalState } from '.'
import { Note } from '../generated/graphql'

export interface UserState {
  _id: string
  email: string
  fullName: string
  username: string
  selectedNote?: Partial<Note>
}
