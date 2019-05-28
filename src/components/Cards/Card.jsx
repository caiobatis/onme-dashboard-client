import React from 'react'
import classNames from 'classnames'
import styles from './Cards.scss'

const Card = props => {
  
  const card = classNames(styles.card, {
    [styles.shadow]: props.shadow,
    [styles[props.padding]]: props.padding,
  })


  return (
    <div className={card}>
      { props.children }
    </div>
  )
}

export default Card