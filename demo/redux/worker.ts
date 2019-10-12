import { createStore } from 'redux'
import reducer from './reducer'
import { expose, createProxyStore } from '../../src'

const store = createStore(reducer)
const proxyStore = createProxyStore(store)

expose(proxyStore, self)
