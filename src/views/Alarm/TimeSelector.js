import React, { PropTypes } from 'react'
import SelectField from 'material-ui/lib/SelectField'
import MenuItem from 'material-ui/lib/menus/menu-item'

const ampm_arr = ['AM', 'PM']

export class TimeSelector extends React.Component {
  constructor (props) {
    super(props)
    this.setHours = this.setHours.bind(this)
    this.setMinutes = this.setMinutes.bind(this)
    this.setAmPm = this.setAmPm.bind(this)
  }

  setHours (event, hours) {
    this.props.onUpdate(hours+1, this.props.minutes, this.props.ampm)
  }

  setMinutes (event, minutes) {
    this.props.onUpdate(this.props.hours, minutes, this.props.ampm)
  }

  setAmPm (event, ampm) {
    let val = ampm_arr[ampm]
    this.props.onUpdate(this.props.hours, this.props.minutes, val)
  }

  render () {
    const hours = Array(12).fill(0).map((el, i) => (
      <MenuItem
        value={i+1}
        key={i+1}
        primaryText={`${i+1}`}
      />
    ))

    const minutes = Array(60).fill(0).map((el, i) => (
      <MenuItem
        value={i}
        key={i}
        primaryText={`${i}`}
      />
    ))

    const ampm = ampm_arr.map((el, i) => (
      <MenuItem
        value={el}
        key={i}
        primaryText={el}
      />
    ))

    return (
      <div>
        <SelectField
          style={{margin: '10px', width: '60px'}}
          value={this.props.hours}
          floatingLabelText='Hours'
          onChange={this.setHours}
        >
          {hours}
        </SelectField>

        <SelectField
          style={{margin: '10px', width: '60px'}}
          value={this.props.minutes}
          floatingLabelText='Minutes'
          onChange={this.setMinutes}
        >
          {minutes}
        </SelectField>

        <SelectField
          style={{margin: '10px', width: '60px'}}
          value={this.props.ampm}
          floatingLabelText='AM/PM'
          onChange={this.setAmPm}
        >
          {ampm}
        </SelectField>
      </div>
    )
  }
}

TimeSelector.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  ampm: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default TimeSelector
