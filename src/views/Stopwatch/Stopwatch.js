import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'
import moment from 'moment'

import { start, stop, lap, reset, updateTime } from 'redux/modules/stopwatch'

import Laps from './Laps'

const time_format = 'mm:ss.SS'

export class Stopwatch extends React.Component {
  constructor (props) {
    super(props)
    this.stopTimer = this.stopTimer.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  componentDidMount () {
    if (this.props.isRunning && !this.interval) {
      this.startTimeUpdate()
    }
  }

  componentWillUnmount () {
    this.endTimeUpdate()
  }

  startTimeUpdate () {
    this.interval = setInterval(() => {
      this.props.updateTime()
    }, 10)
  }

  endTimeUpdate () {
    clearInterval(this.interval)
  }

  startTimer () {
    this.props.onStartClick()
    this.startTimeUpdate()
  }

  stopTimer () {
    this.props.onStopClick()
    this.endTimeUpdate()
  }

  render () {
    const {
      onLapClick, onResetClick,
      isRunning, time, lap_time, laps
    } = this.props

    const left_button = isRunning ? (
      <RaisedButton label='Lap' secondary onClick={onLapClick} />
    ) : (
      <RaisedButton label='Reset' onClick={onResetClick} />
    )

    const right_button = isRunning ? (
      <RaisedButton label='Stop' onClick={this.stopTimer} />
    ) : (
      <RaisedButton label='Start' primary onClick={this.startTimer} />
    )

    return (
      <div>
        <AppBar
          title='Stopwatch'
        />
        <h1>
          {moment(time).format(time_format)}
        </h1>
        <h2>
          {moment(lap_time).format(time_format)}
        </h2>
        {left_button}
        {right_button}

        <Laps laps={laps} />
      </div>
    )
  }
}

Stopwatch.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  lap_time: PropTypes.number.isRequired,
  laps: PropTypes.array.isRequired,

  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onLapClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isRunning: state.stopwatch.running,
  time: state.stopwatch.duration,
  lap_time: state.stopwatch.lap_duration,
  laps: state.stopwatch.laps
})

const mapDispatchToProps = (dispatch) => {
  return {
    onStartClick: () => dispatch(start()),
    onStopClick: () => dispatch(stop()),
    onLapClick: () => dispatch(lap()),
    onResetClick: () => dispatch(reset()),
    updateTime: () => dispatch(updateTime())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stopwatch)
