import * as React from 'react'
import { useStore } from './hooks'
import { StateContext } from './StateContext'
import { StoreContext } from './StoreContext'

interface ProviderProps {
  children: React.ReactNode
  fallback?: JSX.Element
}

const empty = <></>

export async function getProvider(worker: Worker) {
  return function Provider({ children, fallback = empty }: ProviderProps) {
    const [state, store] = useStore(worker)

    const provider = (
      <StoreContext.Provider value={store}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </StoreContext.Provider>
    )

    return state ? provider : fallback
  }
}
