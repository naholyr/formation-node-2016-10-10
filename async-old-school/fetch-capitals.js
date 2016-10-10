'use strict'

const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')
const buildQuestions = require('./questions-builder')

const CAPITALS_URL = 'https://fr.wikipedia.org/wiki/Liste_des_capitales_du_monde'

module.exports = (cb) => {
  request(CAPITALS_URL, (error, response, body) => {
    if (error) {
      return cb(error)
    }

    if (response.statusCode != 200) {
      return cb(Error(`Invalid response ${response.statusCode}`))
    }

    const $ = cheerio.load(body)
    const table = $('.wikitable')[0]
    const tds = $('td', table)
    //                    function (i, el) { return $(el).text() }
    const texts = tds.map((i, el) => $(el).text().trim()).get()

    const pairs = _.chunk(texts, 2)
    const label = country => `Quelle est la capitale du pays nommé ${country} ?`
    const questions = buildQuestions(pairs, label)

    return cb(null, questions)
  })
}
