import * as Comlink from 'comlinkjs'
import { useContext, useEffect, useState } from 'react'
import { AnyAction, Dispatch } from 'redux'
import { ProxyStore } from './proxy'
import { StoreContext } from './StoreContext'
import { StateContext } from './StateContext'
type Selector<T> = (state: T) => any

export function useStore<T>(worker: Worker): [T | null, ProxyStore<T>] {
  const [state, setState] = useState<T | null>(null)
  const proxyStore: ProxyStore<T> = Comlink.proxy(worker) as any

  // get current state then subscribe to it
  useEffect(() => {
    proxyStore.getState().then(async (s: T) => setState(s))
    proxyStore.subscribe(Comlink.proxyValue((s: T) => setState(s)))
  }, []) // only on first render

  return [state, proxyStore]
}

export const useSelector = <T extends unknown>(selector: Selector<T>): any => {
  const state = useContext(StateContext)
  return selector(state)
}

export const useDispatch = <A extends AnyAction>(): Dispatch<A> =>
  useContext(StoreContext).dispatch
