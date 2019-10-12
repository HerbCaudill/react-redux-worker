## react-redux-worker

Run a [Redux](https://redux.js.org) store in a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

### Why

If you're doing any sort of computationally expensive work in your Redux reducers or middleware, it
can slow down your

### How it works

![demo](./img/react-redux-worker.svg)

### Running the demo

```
yarn
yarn demo
```

Then open http://localhost:1234 in a browser. You should see this:

![demo](./img/demo.gif)

### Usage

### Prior art

Based on [redux-workerized](https://github.com/mizchi/redux-workerized) by [@mizchi](https://github.com/mizchi/)

### License

MIT
