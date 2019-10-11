import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Calculate } from './Calculate'
import { State } from './redux/reducer'

export function WithoutWorker() {
  const state = useSelector((s: State) => s)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Without worker</h2>
      <Calculate state={state} dispatch={dispatch} />
    </div>
  )
}
