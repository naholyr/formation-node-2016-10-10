import React, { PropTypes as T } from 'react'
import Question from './question'

export default class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      loading: props.loading,
      disabled: false,
      question: props.question,
      answer: null,
      result: 0
    }
  }

  componentWillReceiveProps (props) {
    if ('loading' in props) {
      this.setState({ loading: props.loading })
    }
    if ('initialQuestion' in props && !this.state.question) {
      this.setState({ question: props.initialQuestion })
      this.tick()
    }
  }

  nextQuestion () {
    const start = Date.now()
    this.setState({
      loading: true,
      question: null,
      answer: null,
      disabled: false,
      result: 0
    })
    this.props.getNextQuestion().then(q => {
      this.setState({
        question: q,
        loading: false
      })
      this.tick()
    })
  }

  tick () {
    setTimeout(() => {
      if (this.state.disabled) {
        // ticking is already over (other cause maybe, like user clicked on a button)
        return
      }

      const t = this.state.question.t - 1
      this.setState({
        question: Object.assign({}, this.state.question, { t }),
        disabled: t <= 0
      })

      if (t <= 0) {
        this.sendAnswer(null)
      } else {
        this.tick()
      }
    }, 1000)
  }

  sendAnswer (index) {
    this.setState({ disabled: true })
    this.props.sendAnswer(this.state.question.id, index)
    .then(({ ok, answer }) => {
      this.setState({ answer, result: ok ? +1 : -1 })
      setTimeout(() => this.nextQuestion(), 5000)
    })
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
        { this.renderTimer() }
        { this.renderSpinner() }
        { this.renderResult() }
        { this.renderQuestion() }
      </div>
    )
  }

}

App.propTypes = {
  getNextQuestion: T.func.isRequired,
  sendAnswer: T.func.isRequired,
  loading: T.bool,
  question: T.object,
}

App.defaultProps = {
  loading: false,
  question: null,
}
