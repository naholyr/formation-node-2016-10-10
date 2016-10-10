'use strict'

const request = require('request-promise-native')
const cheerio = require('cheerio')
const _ = require('lodash')
const buildQuestions = require('./questions-builder')

const MOVIES_URL = 'https://fr.wikipedia.org/wiki/100_films_pour_une_cin%C3%A9math%C3%A8que_id%C3%A9ale'

module.exports = () => {

  const pHTML = request(MOVIES_URL)

  const p$ = pHTML.then(cheerio.load)

  const pPairs = p$.then($ => {
    const lis = $('li', $('ul')[0])
    return _.filter(lis.get().map(el => {
      if ($('ul', el).length) {
        return null
      }
      const links = $('a', el)
      const title = $(links[0]).text()
      const authors = links.slice(1).get().map(a => $(a).text()).join(' & ')
      return [authors, title]
    }))
  })

  const pQuestions = pPairs.then(pairs =>
    buildQuestions(pairs, title => `Qui a réalisé « ${title} » ?`))

  return pQuestions
}
