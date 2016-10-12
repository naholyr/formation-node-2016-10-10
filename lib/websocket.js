'use strict'

const questions = require('../data/questions.json')
const _ = require('lodash')
const uuid = require('uuid')
const socketio = require('socket.io')


module.exports = server => {

  // socket.emit('name', ...args) → to socket only
  // io.emit('name', ...args) → to all sockets
  // socket.broadcast.emit('name', ...args) → to all sockets but him
  // io.to('room').emit('name', ...args) → to all sockets who have join()ed room

  const io = socketio(server)

  io.on('connection', socket => {

    socket.emit('current-question', _.omit(question, 'a'))

    socket.on('answer-question', (id, a) => {
      if (id !== question.id) {
        // TODO handle error
        return null
      }

      const result = {
        answer: question.a,
        ok: !question.expired && question.a === a,
        expired: question.expired,
        id
      }

      socket.emit('question-done', result)

      if (result.ok) {
        question.expired = true

        socket.broadcast.emit('question-done', {
          answer: question.a,
          ok: false,
          expired: question.expired,
          id
        })
      }
    });

  })

  // Generate next question periodically
  let question = null

  function generateNextQuestion () {
    const index = _.random(0, questions.length - 1)
    question = Object.assign({}, questions[index], {
      expired: false,
      t: 10,
      id: uuid.v4()
    })
    io.emit('current-question', _.omit(question, 'a'))
    setTimeout(tick, 1000)
  }

  function tick () {
    question.t -= 1
    console.log(question.id, 'tick', question.t) // TODO debug logger
    if (question.t <= 0 || question.expired) {
      if (!question.expired) {
        // Time's up!
        console.log(question.id, 'timeout') // TODO debug logger
        question.expired = true
        io.emit('question-done', {
          answer: question.a,
          ok: false,
          expired: question.expired,
          id: question.id
        })
      }
      setTimeout(generateNextQuestion, 5000)
    } else {
      setTimeout(tick, 1000)
    }
  }

  generateNextQuestion()

}
