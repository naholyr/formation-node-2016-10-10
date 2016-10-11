'use strict'

const http = require('http')
const express = require('express')
const chalk = require('chalk')
const config = require('config')
const questions = require('./lib/routes/questions')
const bodyParser = require('body-parser')

const app = express()


// Disable X-Powered-By header
app.set('x-powered-by', false)


/*
 bodyParser.json() =~= function (req, res, next) {
    if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
      req.on('data') → bufferiser
      req.on('end') → parser + req.body = résultat du parsing + next()
    } else {
      next()
    }
 }
*/
app.use(bodyParser.json())

app.use(express.static('public'))

/*
function restricted (role) {
  return function (req, res, next) {
    if (!utilisateurARole(role)) {
      res.status(403).end()
    } else {
      next()
    }
  }
}
*/


// Routing
// app.méthode(url, handler)

app.get('/', /*restricted('admin'),*/ (req, res) => {
  res.send({ hello: 'world' })
})

app.get('/param/:variable([0-9]+)', (req, res) => {
  res.send({ variable: req.params.variable })
})

app.get('/query', (req, res) => {
  res.send({ variable: req.query.variable })
})

app.get('/next-question', questions.next)
app.post('/answer-question', questions.answer)


const server = http.createServer(app)

server.listen(config.server.port, () => {
  console.log(chalk.green(`Server ready http://localhost:${server.address().port}`)) // eslint-disable-line
})

server.on('error', e => {
  console.error(chalk.bold.red(`Failed to listen (error: ${e.message})`)) // eslint-disable-line
  process.exit(1) // eslint-disable-line
})
