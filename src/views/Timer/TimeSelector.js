import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'

import { durationToTimeHash } from 'utils/timeFormatter'
import { set } from 'redux/modules/timer'

export class TimeSelector extends React.Component {
  constructor (props) {
    super(props)
    this.setHours = this.setHours.bind(this)
    this.setMinutes = this.setMinutes.bind(this)
  }

  setHours (event, hours) {
    this.props.set(hours, this.props.minutes)
  }

  setMinutes (event, minutes) {
    this.props.set(this.props.hours, minutes)
  }

  render () {
    const hours = Array(24).fill(0).map((el, i) => (
      <MenuItem
        value={i}
        key={i}
        primaryText={`${i}`}
      />
    ))

    const minutes = Array(60).fill(0).map((el, i) => (
      <MenuItem
        value={i}
        key={i}
        primaryText={`${i}`}
      />
    ))

    return (
      <div >
        <SelectField
          style={{margin: '20px', width: '100px'}}
          value={this.props.hours}
          floatingLabelText='Hours'
          onChange={this.setHours}
        >
          {hours}
        </SelectField>

        <SelectField
          style={{margin: '20px', width: '100px'}}
          value={this.props.minutes}
          floatingLabelText='Minutes'
          onChange={this.setMinutes}
        >
          {minutes}
        </SelectField>
      </div>
    )
  }
}

TimeSelector.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  set: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {
    hours,
    minutes
  } = durationToTimeHash(state.timer.setting)

  return {
    hours,
    minutes
  }
}

const mapDispatchToProps = (dispatch) => ({
  set: (hours, minutes) => {
    const time_ms = moment.duration({ hours, minutes }).as('ms')

    return dispatch(set(time_ms))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeSelector)
