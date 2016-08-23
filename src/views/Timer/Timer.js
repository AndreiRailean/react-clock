import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import * as colors from 'material-ui/styles/colors'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'
import LinearProgress from 'material-ui/LinearProgress'

import TopBar from '../../components/TopBar'
import TimeSelector from './TimeSelector'

import { timerFormat as time_format } from '../../utils/timeFormatter'

import { start, pause, cancel, updateTime } from '../../redux/modules/timer'

// TODO: Add sound

export class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: null
    }

    this.onPauseClick = this.onPauseClick.bind(this)
    this.onStartClick = this.onStartClick.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)
  }

  componentDidMount () {
    if (this.props.isRunning && !this.state.interval) {
      this.startTimeUpdate()
    }
  }

  componentWillUnmount () {
    this.endTimeUpdate()
  }

  startTimeUpdate () {
    let interval = setInterval(() => {
      this.props.updateTime()
    }, 200)
    this.state.interval = interval
  }

  endTimeUpdate () {
    clearInterval(this.state.interval)
    this.state.interval = null
  }

  onStartClick () {
    this.props.start()
    this.startTimeUpdate()
  }

  onPauseClick () {
    this.endTimeUpdate()
    this.props.pause()
  }

  onCancelClick () {
    this.endTimeUpdate()
    this.props.cancel()
  }

  rightButton () {
    if (this.props.elapsed) {
      return (
        <RaisedButton
          label='Cancel'
          onTouchTap={this.onCancelClick}
          style={this.buttonStyle()}
          labelColor={colors.redA700}
        />
      )
    }
    return (
      <RaisedButton
        label='Start'
        onTouchTap={this.onStartClick}
        style={this.buttonStyle()}
        labelColor={colors.green700}
      />
    )
  }

  buttonStyle () {
    return {
      margin: '5px 20px'
    }
  }

  render () {
    const {
      isRunning, isDone, elapsed, setting
    } = this.props

    const countdown = (setting - elapsed)

    let left_button = (
      <RaisedButton
        label='Pause'
        disabled={!isRunning}
        style={this.buttonStyle()}
        onTouchTap={this.onPauseClick}
      />
    )

    if (elapsed && !isRunning) {
      left_button = (
        <RaisedButton
          label='Resume'
          style={this.buttonStyle()}
          onTouchTap={this.onStartClick}
        />
      )
    }

    const time_countdown = (
      <div className='timerDisplay'>
        <CircularProgress
          mode='determinate'
          value={elapsed}
          size={3}
          max={setting}
        />

        <div style={{fontSize: '48px'}}>
          {time_format(countdown)}
        </div>

        <LinearProgress mode='determinate'
          value={elapsed}
          max={setting}
          style={{height: '10px', width: '50%', margin: 'auto'}}
        />
      </div>
    )

    const time_picker = (
      <div className='timePicker'>
        <TimeSelector />
      </div>
    )

    const time_display = (!elapsed && !isRunning)
      ? time_picker
      : time_countdown

    return (
      <div>
        <TopBar title='Timer' />

        <div style={{textAlign: 'center'}}>
          <div style={{height: '300px'}}>
            {time_display}
          </div>
          <div style={{marginTop: '20px'}}>
            {left_button}
            {this.rightButton()}
          </div>
        </div>

        <Dialog
          title='Timer Done'
          actions={
            <FlatButton
              label='OK'
              primary
              keyboardFocused
              onTouchTap={this.onCancelClick}
            />
          }
          modal={false}
          open={isDone}
          onRequestClose={this.onCancelClick}
        />
      </div>
    )
  }
}

Timer.propTypes = {
  elapsed: PropTypes.number.isRequired,
  setting: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,

  start: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  elapsed: state.timer.elapsed,
  setting: state.timer.setting,
  isRunning: state.timer.running,
  isDone: state.timer.done
})

const mapDispatchToProps = (dispatch) => ({
  start: () => dispatch(start()),
  pause: () => dispatch(pause()),
  cancel: () => dispatch(cancel()),
  updateTime: () => dispatch(updateTime())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
