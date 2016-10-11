
// Fetch next question from server
export function getNextQuestion () {
  return fetch('/next-question') // Promise<HTTPResponse>
    .then(res => res.json()) // Promise<QuizQuestion>
}

// Send answer to server
export function sendAnswer (questionId, index) {
  return fetch('/answer-question',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: questionId,
        a: index
      })
    })
    .then(res => res.json())
}
