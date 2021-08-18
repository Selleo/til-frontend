import React from 'react'
import { CSSTransition } from 'react-transition-group'

export const delayStep = 75

export const animationDuration = 300

export const Transition = props => {
  const { children, condition, name, delay } = props
  const timeout = delay ? animationDuration + delay : animationDuration // delay for sync animation with css transition
  const inProp = condition !== undefined ? condition : true // render conditional or just render

  return (
    <CSSTransition
      in={inProp}
      timeout={timeout}
      classNames={name}
      appear
      unmountOnExit
    >
      {children}
    </CSSTransition>
  )
}
