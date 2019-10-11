import { AnyAction } from 'redux'

// Constants

export const NEXT_PRIME = 'counter/next-prime'
export const SET_BUSY = 'counter/set-busy'

export interface Action extends AnyAction {}

export const actions: { [key: string]: (...args: any[]) => Action } = {
  nextPrime: () => ({ type: NEXT_PRIME }),
  setBusy: (value: boolean) => ({ type: SET_BUSY, payload: { value } }),
}
