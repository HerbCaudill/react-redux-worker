import { expose, createProxyStore } from '../../src' // replace with react-redux-worker
import { store } from './store'

const proxyStore = createProxyStore(store)
expose(proxyStore, self)
