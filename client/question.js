import React, { PropTypes as T } from 'react'
import cx from 'classnames'
import Choice from './choice'

export default class Question extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      selected: null
    }
  }

  renderChoices () {
    return this.props.choices.map((label, index) => (
      <Choice
        key={ index }
        label={ label }
        disabled={ this.props.disabled }
        selected={ this.state.selected === index }
        correct={ this.props.answer === index }
        onClick={ () => this.select(index) }
      />
    ))
  }

  select (index) {
    this.setState({ selected: index })
    this.props.onSelect(index)
  }

  render () {
    return (
      <div className={ cx('question', { disabled: this.props.disabled }) }>
        <h2>{ this.props.title }</h2>
        <div className="choices">
          { this.renderChoices() }
        </div>
      </div>
    )
  }

}

Question.propTypes = {
  title: T.string.isRequired,
  choices: T.arrayOf(T.string).isRequired,
  onSelect: T.func.isRequired,
  answer: T.number,
  disabled: T.bool,
}

Question.defaultProps = {
  disabled: false,
  answer: null,
}
