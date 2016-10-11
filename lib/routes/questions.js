'use strict'

const questions = require('../../data/questions.json')
const _ = require('lodash')
const uuid = require('uuid')


module.exports = {
  next: nextQuestion,
  answer: answerQuestion
}


let state = new Map()


function nextQuestion (req, res) {
  const index = _.random(0, questions.length - 1)

  /*
  const question = _.clone(questions[index])
  delete question.a // eslint-disable-line
  question.t = 10
  question.id = uuid.v4()
  */

  const question = Object.assign({}, questions[index], {
    a: undefined, // eslint-disable-line no-undefined
    t: 10,
    id: uuid.v4()
  })

  state.set(question.id, {
    a: questions[index].a,
    expired: false
  })

  return res.send(question)
}


function answerQuestion (req, res) {
  const { id, a } = req.body

  /*
  const id = req.body.id
  const a = req.body.a
  */

  if (!state.has(id)) {
    return res.status(400).send('Invalid question id')
  }

  const question = state.get(id)

  const result = {
    expired: question.expired,
    ok: !question.expired && a === question.a,
    a: question.a
  }

  question.expired = true

  return res.send(result)
}
