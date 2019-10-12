import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import { getProvider } from '../src' // replace with 'react-redux-worker'

import { Clock } from './Clock'
import { WithoutWorker } from './WithoutWorker'
import { WithWorker } from './WithWorker'

const start = async () => {
  // Set up proxy provider
  const worker = new Worker('./redux/worker.ts')
  const ProxyProvider = getProvider(worker)

  // Set up regular provider
  const RegularProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  ReactDOM.render(
    <div>
      <Clock></Clock>
      <p>Use the buttons to find a few large prime numbers.</p>
      <p>
        Without a worker, notice how the animation stops updating every time the
        app calculates a new prime.
      </p>
      <div style={{ display: 'flex' }}>
        {/* using redux-workerized */}
        <ProxyProvider>
          <WithWorker />
        </ProxyProvider>

        {/* using regular redux */}
        <RegularProvider>
          <WithoutWorker />
        </RegularProvider>
      </div>
    </div>,
    document.querySelector('.root')
  )
}

start()
