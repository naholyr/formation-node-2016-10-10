import React from 'react'
import { render } from 'react-dom'
import App from './app'

const root = document.getElementById('app')

// TODO WEBSOCKET: connect to websocket and pass it to App

render(<App socket={ ??? } />, root)

