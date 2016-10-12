'use strict'

const { createClient } = require('ioredis')
const config = require('config')

const client = createClient(config.redis)

module.exports = client
