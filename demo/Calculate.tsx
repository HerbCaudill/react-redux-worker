import React from 'react'
import { actions } from './redux/actions'
import { State } from './redux/reducer'
import { Dispatch } from 'redux'

// When doing calculations in UI thread, React won't update at all if we don't do this
export const nextFrame = () => new Promise(ok => requestAnimationFrame(ok))

export const Calculate = ({ state, dispatch }: { state: State; dispatch: Dispatch }) => {
  const calculate = async () => {
    dispatch(actions.setBusy(true))
    await nextFrame()
    for (let i = 0; i < 10; i++) {
      dispatch(actions.nextPrime())
      await nextFrame()
    }
    dispatch(actions.setBusy(false))
  }
  const style = {
    button: {
      border: '2px solid',
      margin: '10px 0',
      padding: '10px 30px',
      borderRadius: '10px',
      cursor: 'pointer',
      outline: 'none',
      minWidth: '10em',
      ...(state.busy
        ? {
            background: '#008080bb',
            borderColor: '#008080',
            color: 'white',
          }
        : {
            background: '#00808022',
            borderColor: '#008080',
            color: '#008080',
          }),
    },
  }
  return (
    <div style={{ width: '12em' }}>
      <button onClick={calculate} style={style.button}>
        {state.busy ? 'Calculating...' : 'Calculate'}
      </button>
      {state.primes.map(p => (
        <div key={p}>{p}</div>
      ))}
    </div>
  )
}
