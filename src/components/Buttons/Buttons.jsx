import React from 'react'
import classNames from 'classnames'
import Link from '../Link/Link'
import styles from './Buttons.scss'

const Buttons = props => {
  
  const buttonClass = classNames(styles.button, {
    [styles.full]: props.full,
    [styles[props.type]]: props.type,
    [styles.clear]: props.clear,
    [styles.border]: props.border,
    [styles[props.size]]: props.size,
    [styles.uppercase]: props.uppercase,
  })

  const content = 
    <button className={buttonClass} type="submit">
      <span>{props.label}</span>
    </button>
  return props.link ? <Link to={props.link}> {content} </Link> : content
}

export default Buttons 