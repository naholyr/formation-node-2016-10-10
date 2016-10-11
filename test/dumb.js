'use strict'

// const expect = require('chai').expect
const { expect } = require('chai')


describe('Things', () => {

  let flag = null

  before(() => {
    flag = false
  })

  it('should add 1 and 1', () => {
    expect(1 + 1).to.equal(2)
  })

  it('should check flag after 200 ms', (done) => {
    setTimeout(() => {
      expect(flag).to.be.false
      done()
    }, 200)
  })

  it('should check flag asynchronously', () => {
    const pFlag = Promise.resolve(flag)
    return pFlag.then(zeFlag => {
      expect(zeFlag).to.be.false
    })
  })

})
