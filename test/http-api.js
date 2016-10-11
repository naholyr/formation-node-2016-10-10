'use strict'

const { expect } = require('chai')
const request = require('supertest')
const app = require('../server')


describe.skip('HTTP API', () => {

  it('should grab next question', (done) => {
    request(app)
      .get('/next-question')
      .expect(200)
      .expect('content-type', /json/)
      .end((err, res) => {
        if (err) {
          throw err
        }
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('q').to.be.a('string')
        expect(res.body).to.have.property('t').to.be.a('number')
        expect(res.body).to.have.property('c').to.be.an('array')
        expect(res.body).to.have.property('id').to.be.a('string')
        done()
      })
  })

  it('should answer question')

})
