import React, { Component, Suspense } from 'react'
import { hot } from 'react-hot-loader'

import './styles.scss'

const Title = React.lazy(() => import(/* webpackChunkName: 'lazy' */ './components/Title'))

class App extends Component {
  render () {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Title>MAKEUP</Title>
        </Suspense>
        <div className='main'>
          <div>hello</div>
        </div>
      </div>
    )
  }
}

export default hot(module)(App)
