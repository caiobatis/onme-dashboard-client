import React from 'react'
import classNames from 'classnames'
import Link from '../Link/Link'
import logoOnme from '../../images/onme-logo.png'
import styles from './Logo.scss'

const Logo = props => {

  const _class = classNames(styles.logoLink, {
    [styles[props.type]]: props.type
  })
  
  return (
    <Link
      to={'/calculadora'}
      className={_class}
    >
      <div className={styles.logo}>
        <img src={logoOnme} alt=""/>
      </div>
    </Link>
  )
}

export default Logo 