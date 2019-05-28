import React from 'react'
import classNames from 'classnames'
import { Link as LinkRouter } from 'react-router-dom'
import styles from './Link.scss'

const Link = props => {
  
  const buttonClass = classNames({
    [styles.full]: props.full,
    [styles.uppercase]: props.uppercase,
    [props.className]: [props.className]
  })

  let content

  (props.to) ?
    content = 
    <LinkRouter
      to={props.to}
      className={buttonClass}
    >
      {props.children}
    </LinkRouter> :
    content = 
    <a
      href={props.to}
      className={buttonClass}
    >
      {props.children}
    </a>

  return content
}

export default Link