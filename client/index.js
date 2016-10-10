import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { getNextQuestion, sendAnswer } from './api'

const root = document.getElementById('app')

render(<App getNextQuestion={ getNextQuestion } sendAnswer={ sendAnswer } loading={ true } />, root)
getNextQuestion().then(q => {
  render(<App loading={ false } getNextQuestion={ getNextQuestion } sendAnswer={ sendAnswer } initialQuestion={ q } />, root)
})

