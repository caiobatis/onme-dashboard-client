import React from 'react'
import classNames from 'classnames'
import Link from '../Link/Link'
import styles from './Logo.scss'

const Logo = props => {

  const _class = classNames(styles.logoLink, {
    [styles[props.type]]: props.type
  })
  
  return (
    <Link
      to={'/'}
      className={_class}
    >
      <div className={styles.logo}>
        Free Isenções
      </div>
    </Link>
  )
}

export default Logo 