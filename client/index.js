import React from 'react'
import { render } from 'react-dom'
import App from './app'
import io from 'socket.io-client'

const socket = io()

const root = document.getElementById('app')

render(<App socket={ socket } />, root)
