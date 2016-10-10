import React, { PropTypes as T } from 'react'
import cx from 'classnames'

export default class Choice extends React.Component {

  render () {
    return (
      <button
        className={ cx({ selected: this.props.selected, correct: this.props.correct }) }
        onClick={ this.props.onClick }
        disabled={ this.props.disabled }
      >{ this.props.label }</button>
    )
  }

}

Choice.propTypes = {
  label: T.string.isRequired,
  disabled: T.bool,
  selected: T.bool,
  correct: T.bool,
  onClick: T.func.isRequired,
}

Choice.defaultProps = {
  disabled: false,
  selected: false,
  correct: false,
}
