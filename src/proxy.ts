import * as Comlink from 'comlinkjs'

let lastId = 0
export const uniqueId = () => ++lastId
