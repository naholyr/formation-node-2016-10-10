
// Fetch next question from server
export function getNextQuestion () {
  const id = Math.floor(Math.random() * 4)
  return Promise.resolve({
    id, // transaction id
    t: 10, // timeout
    q: 'Fake question',
    // a: ?, // not sent by server
    c: [
      '42',
      'Obi-Wan',
      'Probably',
      'Nope'
    ]
  })
}

// Send answer to server
export function sendAnswer (questionId, index) {
  return Promise.resolve({
    ok: questionId === index,
    answer: questionId
  })
}
