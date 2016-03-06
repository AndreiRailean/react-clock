import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import colors from 'material-ui/lib/styles/colors'
import Dialog from 'material-ui/lib/dialog'
import CircularProgress from 'material-ui/lib/circular-progress'
import LinearProgress from 'material-ui/lib/linear-progress'
import SelectField from 'material-ui/lib/SelectField'
import MenuItem from 'material-ui/lib/menus/menu-item'

import TopBar from 'components/topbar'
import { timerFormat as time_format, durationToTimeHash } from 'utils/timeFormatter'

import { start, pause, cancel, updateTime } from 'redux/modules/timer'

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
    }, 100)
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

    const hours = Array(24).fill(0).map((el, i) => (
      <MenuItem
        value={i}
        key={i}
        primaryText={`${i}`}
        floatingLabelText='Hours'
      />
    ))

    const timePicker = (
      <SelectField
        value={durationToTimeHash(setting).hours}
      >
        {hours}
      </SelectField>
    )

    return (
      <div style={{textAlign: 'center'}}>
        <TopBar title='Timer' />
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
        <div className='timePicker'>
          {timePicker}
        </div>

        <div className='timeControls'>
          {left_button}
          {this.rightButton()}
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

export default connect((mapStateToProps), mapDispatchToProps)(Timer)
