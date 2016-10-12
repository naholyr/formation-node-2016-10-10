'use strict'

const _ = require('lodash')
const socketio = require('socket.io')
const db = require('./db')
const redisAdapter = require('socket.io-redis')
const config = require('config')


module.exports = server => {

  // socket.emit('name', ...args) → to socket only
  // io.emit('name', ...args) → to all sockets
  // socket.broadcast.emit('name', ...args) → to all sockets but him
  // io.to('room').emit('name', ...args) → to all sockets who have join()ed room

  const io = socketio(server)

  io.adapter(redisAdapter(config.redis))

  io.on('connection', socket => {

    // HGETALL 'question' → question

    getQuestion()
    .then(question => socket.emit('current-question', _.omit(question, 'a')))

    socket.on('answer-question', (id, a) => getQuestion().then(question => {
      if (id !== question.id) {
        // TODO handle error
        return
      }

      const result = {
        answer: question.a,
        ok: !question.expired && question.a === a,
        expired: question.expired,
        id
      }

      if (result.ok) {
        db.hset('question', 'expired', '1')

        // Don't wait for database, emit now
        socket.broadcast.emit('question-done', {
          answer: question.a,
          ok: false,
          expired: true,
          id
        })
      }

      socket.emit('question-done', result)
    }))

  })

}


function getQuestion () {
  return db.hgetall('question') // Promise<Object>
    .then(question => {
      question.expired = Boolean(Number(question.expired))
      return question
    })
}
