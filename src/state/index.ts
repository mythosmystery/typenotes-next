import { hookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'
import { UserState } from './UserState'

export class State {
  user: UserState | null
  token: string | null
  refreshToken: string | null
  authenticated: boolean

  constructor() {
    this.user = null
    this.token = null
    this.refreshToken = null
    this.authenticated = false
  }
}

const getInitialState = (): State => new State()

export const globalState = hookstate<State>(
  getInitialState(),
  typeof localStorage !== 'undefined'
    ? localstored({ key: 'typenotes-state' })
    : undefined
)

export function loginUser(
  user: UserState,
  token: string,
  refreshToken: string
) {
  globalState.user.set(user)
  globalState.token.set(token)
  globalState.refreshToken.set(refreshToken)
  globalState.authenticated.set(true)
}

export function logoutUser() {
  globalState.user.set(null)
  globalState.token.set(null)
  globalState.refreshToken.set(null)
  globalState.authenticated.set(false)
}
