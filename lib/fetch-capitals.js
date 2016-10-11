'use strict'

let request = require('request-promise-native')
let cheerio = require('cheerio')
const _ = require('lodash')
const buildQuestions = require('./questions-builder')

const CAPITALS_URL = 'https://fr.wikipedia.org/wiki/Liste_des_capitales_du_monde'

module.exports = () =>
  // Promise<String>
  request(CAPITALS_URL)
  // Promise<Cheerio>
  .then(body => cheerio.load(body))
  // Promise<Array<String>>
  .then($ => {
    const table = $('.wikitable')[0]
    const tds = $('td', table)
    //                    function (i, el) { return $(el).text() }
    return tds.map((i, el) => $(el).text().trim()).get()
  })
  // Promise<Array<[city, country]>>
  .then(texts => _.chunk(texts, 2))
  // Promise<Array<Question>>
  .then(pairs => {
    const label = country => `Quelle est la capitale du pays nommé ${country} ?`
    const questions = buildQuestions(pairs, label)

    return questions
  })
