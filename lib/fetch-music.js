'use strict'

const request = require('request-promise-native')
const cheerio = require('cheerio')
const _ = require('lodash')
const buildQuestions = require('./questions-builder')

const TOP100_URL = 'https://fr.wikipedia.org/wiki/Billboard_Hot_100'

module.exports = () =>
  request(TOP100_URL)
  .then(body => {
    const $ = cheerio.load(body)
    const table = $('.wikitable')[0]
    const lis = $('td:nth-child(2) ul li', table)
    const texts = lis.map((i, el) => $(el).text()).get()

    const pairs = _.filter(texts.map(text => {
      const match = text.match(/^(.*?) - "?(.*?)"?\s*\(/)
      if (match) {
        const [, author, title] = match
        return [author, title]
      } else {
        return null
      }
    }))
    const label = title => `Qui est l'auteur de la chanson intitulée "${title}" ?`
    return buildQuestions(pairs, label)
  })
