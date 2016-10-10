'use strict'

const _ = require('lodash')


module.exports = buildQuestions


// Array<[Answer, Theme>, (String => String) => Array<Question>
function buildQuestions (pairs, label) {
  const cities = _.map(pairs, 0)
  const questions = pairs.map((pair) => {
    const [city, theme] = pair
    const index = _.random(0, 3)
    let cities2 = cities.slice()
    _.pullAt(cities2, index)
    const choices = _.range(4).map(n => {
      if (n === index) {
        return city
      } else {
        const i = _.random(0, cities2.length - 1)
        const res = cities2[i]
        _.pullAt(cities2, i)
        return res
      }
    })
    return {
      q: label(theme),
      a: index,
      c: choices
    }
  })

  return questions
}
