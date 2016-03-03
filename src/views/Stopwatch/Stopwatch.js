import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/lib/raised-button'
import colors from 'material-ui/lib/styles/colors'
import moment from 'moment'

import { start, stop, lap, reset, updateTime } from 'redux/modules/stopwatch'

import Laps from './Laps'

const time_format = 'h:mm:ss.SS'

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
      isRunning, time, lap_time
    } = this.props

    const left_button = isRunning ? (
      <RaisedButton label='Lap' secondary onClick={onLapClick} />
    ) : (
      <RaisedButton label='Reset' onClick={onResetClick} />
    )

    const right_button = isRunning ? (
      <RaisedButton label='Stop' onClick={this.stopTimer} style={{color: colors.cyan700}} />
    ) : (
      <RaisedButton label='Start' primary onClick={this.startTimer} />
    )

    var stopwatchStyle = {
      padding: '24px',
      WebkitTransition: 'all', // note the capital 'W' here
      msTransition: 'all', // 'ms' is the only lowercase vendor prefix
      textAlign: 'center'
    }

    return (
      <div className='stopwatch' style={stopwatchStyle}>
        Lap: {moment(lap_time).format(time_format)}
        <div style={{fontSize: '60px'}}>
          {moment(time).format(time_format)}
        </div>
        {left_button}
        {right_button}

        <Laps />
      </div>
    )
  }
}

Stopwatch.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  lap_time: PropTypes.number.isRequired,

  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onLapClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isRunning: state.stopwatch.running,
  time: state.stopwatch.duration,
  lap_time: state.stopwatch.lap_duration
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
