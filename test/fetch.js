'use strict'

const { expect } = require('chai')
const rewire = require('rewire')
const { readFile } = require('fs-promise')
const sinon = require('sinon')
const cheerio = require('cheerio')

const fetchCapitals = rewire('../lib/fetch-capitals')


describe('Fetch', () => {

  describe('Capitals', () => {

    it('should export a function', () => {
      expect(fetchCapitals).to.be.a('function')
    })

    it('should grab questions', () => {
      fetchCapitals.__set__({
        request: () => readFile('test/capitals.html')
      })

      return fetchCapitals().then(questions => {
        expect(questions).to.be.an('array').and.have.length(205)
      })
    })

    it('should not parse if request failed', () => {
      const err = new Error('oops')
      const spy = sinon.spy(cheerio)

      fetchCapitals.__set__({
        request: () => Promise.reject(err),
        cheerio: spy
      })

      return fetchCapitals().then(() => Promise.reject()).catch(e => {
        expect(e).to.equal(err)
        expect(spy.called).to.be.false
      })
    })

  })

  describe('Top 100', () => {

    it('should export a function')

    it('should grab questions')

    it('should not parse if request failed')

  })

  describe('Movies', () => {

    it('should export a function')

    it('should grab questions')

    it('should not parse if request failed')

  })

})
