import React, { PropTypes as T } from 'react'
import Question from './question'

export default class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      disabled: false,
      question: null,
      answer: null,
      result: 0
    }

    this.onCurrentQuestion = question => {
      if (!question.expired || !this.state.question) {
        this.setState({
          loading: false,
          disabled: question.expired,
          question,
          result: 0,
          answer: null,
        })
        this.tick(question.id) // Render local countdown
      }
    }

    this.onQuestionDone = ({ id, ok, answer }) => {
      if (!this.state.question || id !== this.state.question.id) {
        // I get a message for another question, UI issue? Let's reload
        document.location.reload(true)
      } else {
        // State change for current question
        this.setState({
          disabled: true,
          answer,
          result: ok ? +1 : -1,
        })
      }
    }
  }

  componentWillMount () {
    this.props.socket.on('current-question', this.onCurrentQuestion)
    this.props.socket.on('question-done', this.onQuestionDone)

    /*
    this.props.socket.on('current-question', (question) => {
      this.onCurrentQuestion(question)
    })
    */
  }

  componentWillUnmount () {
    this.props.socket.off('current-question', this.onCurrentQuestion)
    this.props.socket.off('question-done', this.onQuestionDone)
  }

  sendAnswer (index) {
    this.setState({ disabled: true })
    this.props.socket.emit('answer-question', this.state.question.id, index);
  }

  tick (id) {
    setTimeout(() => {
      if (!this.state.question || this.state.question.id !== id) {
        // Ticking another question, I should stop there, there have been sync issues obviously
        return
      }

      if (this.state.disabled) {
        // No ticking on disabled question
        return
      }

      const t = this.state.question.t - 1
      this.setState({
        question: Object.assign({}, this.state.question, { t }),
        disabled: t <= 0,
      })

      if (t > 0) {
        this.tick(id)
      }
    }, 1000)
  }

  renderSpinner () {
    return this.state.loading
      ? <strong>Chargement…</strong>
      : null
  }

  renderQuestion () {
    if (!this.state.question) {
      return null
    }

    return (
      <Question
        disabled={ this.state.disabled }
        title={ this.state.question.q }
        choices={ this.state.question.c }
        answer={ this.state.answer }
        onSelect={ index => this.sendAnswer(index) }
      />
    )
  }

  renderTimer () {
    if (!this.state.question || this.state.disabled) {
      return null
    }

    return (
      <span>Reste (environ) { this.state.question.t } secondes…</span>
    )
  }

  renderResult () {
    if (this.state.result > 0) {
      return <strong>Bravo !</strong>
    }
    else if (this.state.result < 0) {
      return <strong>Dommage…</strong>
    }
    else {
      return null
    }
  }

  render () {
    return (
      <div className="app">
        <h1>Quizoo</h1>
        { this.renderQuestion() }
        { this.renderResult() }
        { this.renderTimer() }
        { this.renderSpinner() }
      </div>
    )
  }

}

App.propTypes = {
  socket: T.object.isRequired
}
