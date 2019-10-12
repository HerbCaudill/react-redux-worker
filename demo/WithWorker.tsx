import React from 'react'
import { useDispatch, useSelector } from '../src'
import { State } from './redux/reducer'
import { Calculate } from './Calculate'

export function WithWorker() {
  const state = useSelector((s: State) => s)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>With worker</h2>
      <Calculate state={state} dispatch={dispatch} />
    </div>
  )
}
