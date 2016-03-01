import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export class Timer extends React.Component {
  render () {
    return (
      <div>Timer</div>
    )
  }
}

Timer.propTypes = {
  timer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  timer: state.timer
})

export default connect((mapStateToProps), {
})(Timer)
