'use strict'

const questions = require('../data/questions.json')
const uuid = require('uuid')
const debug = require('debug')('quizoo:websocket')
const _ = require('lodash')
const db = require('../lib/db')
const config = require('config')


// Generate next question periodically

function generateNextQuestion () {
  const index = _.random(0, questions.length - 1)
  const question = Object.assign({}, questions[index], {
    expired: '0',
    t: 10,
    id: uuid.v4()
  })
  db.hmset('question', question).then(() => {
    publish(....)
    io.emit('current-question', _.omit(question, 'a'))
    setTimeout(tick, 1000)
  })
}

function tick () {
  db.hincrby('question', 't', -1) // Promise<'OK'>
  .then(() => getQuestion())      // Promise<Question>
  .then(question => { // Question
    debug(question.id, 'tick', question.t)
    if (question.t <= 0 || question.expired) {
      if (!question.expired) {
        // Time's up!
        debug(question.id, 'timeout')
        db.hset('question', 'expired', '1')

        // Don't wait for database, emit now
        io.emit('question-done', {
          answer: question.a,
          ok: false,
          expired: true,
          id: question.id
        })
      }
      setTimeout(generateNextQuestion, 5000)
    } else {
      setTimeout(tick, 1000)
    }
  })
}

generateNextQuestion()



function getQuestion () {
  return db.hgetall('question') // Promise<Object>
    .then(question => {
      question.expired = Boolean(Number(question.expired))
      return question
    })
}
