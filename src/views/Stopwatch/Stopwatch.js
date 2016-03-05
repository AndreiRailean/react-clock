import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/lib/raised-button'
import colors from 'material-ui/lib/styles/colors'
import { start, stop, lap, reset, updateTime } from 'redux/modules/stopwatch'

import { durationFormat } from 'modules/Stopwatch'
import Laps from './Laps'

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
    const buttonStyle = {
      margin: '5px 20px'
    }

    const {
      onLapClick, onResetClick,
      isRunning, time, lap_time
    } = this.props

    let left_button = <RaisedButton label='Lap' disabled={!isRunning} style={buttonStyle} onClick={onLapClick} />
    if (time && !isRunning) {
      left_button = <RaisedButton label='Reset' style={buttonStyle} onClick={onResetClick} />
    }

    const right_button = isRunning ? (
      <RaisedButton label='Stop' style={buttonStyle} onClick={this.stopTimer} labelColor={colors.redA700} />
    ) : (
      <RaisedButton label='Start' style={buttonStyle} labelColor={colors.green700} onClick={this.startTimer} />
    )

    const controlsStyle = {
      padding: '24px',
      WebkitTransition: 'all', // note the capital 'W' here
      msTransition: 'all', // 'ms' is the only lowercase vendor prefix
      textAlign: 'center'
    }

    return (
      <div className='stopwatch'>
        <div style={controlsStyle}>
          <div style={{color: colors.grey600}}>
            {durationFormat(lap_time)}
          </div>
          <div style={{fontSize: '80px'}}>
            {durationFormat(time)}
          </div>
          {left_button}
          {right_button}
        </div>
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
