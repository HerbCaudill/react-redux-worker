import { ProxyStore } from './ProxyStore'
import * as Comlink from 'comlinkjs'

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
export const expose = <T>(
  proxyStore: ProxyStore<T>,
  context: Comlink.Endpoint | Window
): void => {
  Comlink.expose({ ...proxyStore }, context)
}
