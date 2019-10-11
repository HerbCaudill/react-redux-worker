import isEqual from 'lodash.isequal'
import * as Comlink from 'comlinkjs'
import { AnyAction, Store } from 'redux'

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
const uniqueId = () => ++lastId

/**
 * Since our store is running in a worker process, we provide our application with a proxy
 * store that looks to it just like a garden-variety Redux store, except that everything is
 * asynchronous, since all communication with the worker is based on handling message events.
 *
 * Once created, the proxy needs to be exposed using the `expose` function:
 * ```js
 *   import {expose, createProxyStore} from '...'
 *   const store = createStore(reducer)
 *   const proxyStore = createProxyStore(store)
 *   expose(proxyStore, self)
 *```
 * @param store A regular Redux store created using `Redux.createStore`.
 */
export const createProxyStore = <T extends unknown>(store: Store<T>): ProxyStore<T> => {
  const listenerMap = new Map<number, Function>()
  return {
    async subscribe(onChangeHandler: Function): Promise<number> {
      const subscriptionId = uniqueId()
      let lastSnapshot = store.getState()
      const unsubscribe = store.subscribe(async () => {
        const newSnapshot = store.getState()
        if (!isEqual(lastSnapshot, newSnapshot)) {
          onChangeHandler(newSnapshot)
          lastSnapshot = newSnapshot
        }
      })
      listenerMap.set(subscriptionId, unsubscribe)
      return subscriptionId
    },

    async unsubscribe(subscriptionId: number) {
      const listener = listenerMap.get(subscriptionId)
      if (listener) listener()
      listenerMap.delete(subscriptionId)
    },

    async getState() {
      return store.getState()
    },

    async dispatch(action: AnyAction) {
      store.dispatch(action)
    },
  }
}

/**
 * Uses `Comlink` to expose a `proxyStore` as a worker.
 *
 * Example:
 * ```js
 *   import {expose, createProxyStore} from '...'
 *   const store = createStore(reducer)
 *   const proxyStore = createProxyStore(store)
 *   expose(proxyStore, self)
 *```
 * @param proxyStore A proxy store created using `createProxyStore`
 * @param context Typically `self` on a worker module
 */
export const expose = <T>(proxyStore: ProxyStore<T>, context: Comlink.Endpoint | Window): void => {
  Comlink.expose({ ...proxyStore }, context)
}
