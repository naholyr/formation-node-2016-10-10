'use strict'

process.stdin.pause()
process.stdin.resume()

process.stdin.on('data', (chunk) => {
  console.log(chunk.length, 'bytes')
})

process.stdout.write('coucou\n')
