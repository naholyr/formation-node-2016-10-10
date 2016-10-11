'use strict'

const http = require('http')
const express = require('express')
const chalk = require('chalk')
const config = require('config')

const app = express()

const server = http.createServer(app)

server.listen(config.server.port, () => {
  console.log(chalk.green(`Server ready http://localhost:${server.address().port}`)) // eslint-disable-line
})

server.on('error', e => {
  console.error(chalk.bold.red(`Failed to listen (error: ${e.message})`)) // eslint-disable-line
  process.exit(1) // eslint-disable-line
})
