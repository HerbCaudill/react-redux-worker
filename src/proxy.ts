import * as Comlink from 'comlinkjs'
import { AnyAction } from 'redux'

export type ProxyStore<State, A extends AnyAction = AnyAction> = {
  getState(): Promise<State>
  dispatch(action: A): Promise<void>
  subscribe(
    listener: (state: State) => void,
    selector?: (root: State) => Promise<State> | State
  ): Promise<number>
  unsubscribe(listenerId: number): Promise<void>
}

let lastId = 0
export const uniqueId = () => ++lastId
