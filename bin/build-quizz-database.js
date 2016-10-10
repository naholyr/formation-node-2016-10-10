'use strict'

const fetchCapitals = require('../lib/fetch-capitals')
const fetchMovies = require('../lib/fetch-movies')
const fetchMusic = require('../lib/fetch-music')
const _ = require('lodash')
const fsp = require('fs-promise')
const path = require('path')


const p1 = fetchCapitals()
const p2 = fetchMovies()
const p3 = fetchMusic()

Promise.all([p1, p2, p3])
.then(results => writeDB(_.flatten(results)))
.then(() => console.log('OK')) // eslint-disable-line no-console
.catch(err => console.error(err)) // eslint-disable-line no-console

function writeDB (questions) {
  return fsp.writeFile(path.join(__dirname, '..', 'data', 'questions.json'), JSON.stringify(questions))
}


/* equivalent:
Promise.all([p1, p2, p3])
.then(_.flatten)
.then(JSON.stringify)
.then(data => fsp.writeFile('questions.json', data))
.then(() => console.log('OK')) // eslint-disable-line no-console
.catch(err => console.error(err)) // eslint-disable-line no-console
*/



/* Pyramid of doom, but still concurrent *

p1.then(q1 =>  // T + 2
  p2.then(q2 => // T + 3
    p3.then(q3 => // T + 3
      writeDB([q1, q2, q3]))))

/**/
