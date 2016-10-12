'use strict'

const questions = require('./data/questions.json')
const _ = require('lodash')
const uuid = require('uuid')


// Generate next question periodically
let question = null
function generateNextQuestion () {
  const index = _.random(0, questions.length - 1)
  question = Object.assign({}, questions[index], {
    expired: false,
    t: 10,
    id: uuid.v4()
  })
  // TODO WEBSOCKET broadcast new question
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
      // TODO WEBSOCKET broadcast question expired
    }
    setTimeout(generateNextQuestion, 5000)
  } else {
    setTimeout(tick, 1000)
  }
}
generateNextQuestion()


// TODO WEBSOCKET handle sockets communication
