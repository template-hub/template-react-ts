import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import Add from './utils/add'
import { bb } from './utils/constant'

// if (!PRODUCTION) {
//   console.log('---->', 'Dev log')
// }

console.log('hello there')

ReactDOM.render(<App />, document.getElementById('root'))

console.log('add', Add(1, bb))
