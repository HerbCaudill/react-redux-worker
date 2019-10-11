import { AnyAction } from 'redux'
import { NEXT_PRIME, SET_BUSY } from './actions'
import { nextPrime } from '../lib/primes'

export type State = {
  prime: number
  primes: number[]
  busy: boolean
}

const initialState = {
  prime: 861504408610801,
  primes: [],
  busy: false,
}

function reducer(state: State = initialState, action: AnyAction) {
  switch (action.type) {
    case NEXT_PRIME: {
      const next = nextPrime(state.prime)
      return {
        ...state,
        prime: next,
        primes: [...state.primes, next],
      }
    }
    case SET_BUSY: {
      const { value } = action.payload
      return {
        ...state,
        busy: value,
      }
    }
    default:
      return state
  }
}

export default reducer
