'use strict'

const fetchCapitals = require('./fetch-capitals')
const fetchMovies = require('./fetch-movies')
const fetchMusic = require('./fetch-music')
const _ = require('lodash')
const fs = require('fs')

/* With flow-control library *

const async = require('async')

async.parallel([
  fetchCapitals,
  fetchMovies,
  fetchMusic
], (err, results) => {
  if (err) {
    return console.error(err)
  }
  return writeDB(results)
})

/**/

/* Unmaintained order *

let results = []

fetchCapitals((err, questions) => {
  if (err) {
    return console.error(err)
  }
  results.push(questions)
  return (results.length === 3) && writeDB(results)
})

fetchMovies((err, questions) => {
  if (err) {
    return console.error(err)
  }
  results.push(questions)
  return (results.length === 3) && writeDB(results)
})

fetchMusic((err, questions) => {
  if (err) {
    return console.error(err)
  }
  results.push(questions)
  return (results.length === 3) && writeDB(results)
})

/**/

/* Maintained order *

let results = []
let pending = 3

fetchCapitals((err, questions) => {
  if (err) {
    return console.error(err)
  }
  results[0] = questions
  pending--
  return !pending && writeDB(results)
})

fetchMovies((err, questions) => {
  if (err) {
    return console.error(err)
  }
  results[1] = questions
  pending--
  return !pending && writeDB(results)
})

fetchMusic((err, questions) => {
  if (err) {
    return console.error(err)
  }
  results[2] = questions
  pending--
  return !pending && writeDB(results)
})

/**/



function writeDB (questionss) {
  // Write file
  const questions = _.flatten(questionss)
  fs.writeFile('questions.json', JSON.stringify(questions), err => {
    if (err) {
      console.error(err)
    } else {
      console.log('OK')
    }
  })
}
