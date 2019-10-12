import { createStore } from 'redux'
import reducer from './reducer'
import { expose, createProxyStore } from 'react-redux-worker'

const store = createStore(reducer)
const proxyStore = createProxyStore(store)

expose(proxyStore, self)
