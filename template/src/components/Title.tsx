import React from 'react'

import styles from './styles.module.scss'

// console.log(GLOBAL_API_HOST, GLOBAL_NODE_ENV, process.env.NODE_ENV)

export default class Title extends React.Component {
  render () {
    const { children } = this.props
    return (
      <div>
        <div className={styles.wrapper}>
          <span>I am </span>
          <span className={styles.content}>{children}</span>
        </div>
      </div>
    )
  }
}
