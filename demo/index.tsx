import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { getProvider } from 'react-redux-worker'

import reducer from './redux/reducer'
import { WithoutWorker } from './WithoutWorker'
import { WithWorker } from './WithWorker'
import { Clock } from './Clock'

const start = async () => {
  // Set up proxy provider
  const worker = new Worker('./redux/worker.ts')
  const ProxyProvider = await getProvider(worker)

  // Set up regular provider
  const store = createStore(reducer)
  const RegularProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  ReactDOM.render(
    <div>
      <Clock></Clock>
      <p>Use the buttons to find a few large prime numbers.</p>
      <p>Without a worker, notice how the animation stops updating smoothly.</p>
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
