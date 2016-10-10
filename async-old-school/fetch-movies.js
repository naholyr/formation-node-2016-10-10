'use strict'

const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')
const buildQuestions = require('./questions-builder')

const MOVIES_URL = 'https://fr.wikipedia.org/wiki/100_films_pour_une_cin%C3%A9math%C3%A8que_id%C3%A9ale'

module.exports = cb => {
  request(MOVIES_URL, (err, res, body) => {
    if (err) {
      return cb(err)
    }

    if (res.statusCode != 200) {
      return cb(Error(`Invalid res ${res.statusCode}`))
    }

    const $ = cheerio.load(body)
    const ul = $('ul')[0]
    const lis = $('li', ul)
    const pairs = _.filter(lis.get().map(el => {
      if ($('ul', el).length) {
        return null
      }
      const links = $('a', el)
      const title = $(links[0]).text()
      const authors = links.slice(1).get().map(a => $(a).text()).join(' & ')
      return [authors, title]
    }))

    const label = title => `Qui a réalisé « ${title} » ?`
    const questions = buildQuestions(pairs, label)

    return cb(null, questions)
  })
}
