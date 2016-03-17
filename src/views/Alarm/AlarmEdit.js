import React from 'react'

class AlarmEdit extends React.Component {
  render () {
    console.log(this.props.params.alarmId);
    return (
      <div>Edit Alarm {this.props.params.alarmId}</div>
    )
  }
}

export default AlarmEdit
