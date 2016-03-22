import React, { PropTypes } from 'react'
import SelectField from 'material-ui/lib/SelectField'
import MenuItem from 'material-ui/lib/menus/menu-item'
import moment from 'moment'

import { durationToTimeHash } from 'utils/timeFormatter'

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
          style={{margin: '20px'}}
          value={this.props.hours}
          floatingLabelText='Hours'
          onChange={this.setHours}
        >
          {hours}
        </SelectField>

        <SelectField
          style={{margin: '20px'}}
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

export default TimeSelector
