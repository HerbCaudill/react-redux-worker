import isEqual from 'lodash.isequal'
import { AnyAction, Store } from 'redux'
import { ProxyStore } from './ProxyStore'
import { uniqueId } from './uniqueId'

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
export const createProxyStore = <T extends unknown>(
  store: Store<T>
): ProxyStore<T> => {
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
