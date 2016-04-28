import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import FlatButton from 'material-ui/FlatButton'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'

import TopBar from 'components/topbar'
import ListItem from './ListItem'

import { app_background as default_background, toolbar_background } from 'config'

import {
  toggle_alarm,
  delete_alarm
} from 'redux/modules/alarm.js'

class AlarmApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  alarmList () {
    return this.props.alarms.map((alarm, i) => (
      <ListItem
        key={i}
        editing={this.state.editing}
        onToggle={this.props.onToggleAlarm(alarm.id)}
        onDelete={this.props.onDeleteAlarm(alarm.id)}
        onEdit={this.props.onEditAlarm(alarm.id)}
        {...alarm}
      />
    ))
  }

  toolbar () {
    const onEditToggle = () => {
      this.setState({editing: !this.state.editing})
    }

    const onCancel = () => {
      this.setState({adding: false, editing: false})
    }

    let left_button = ''
    if (this.state.editing) {
      left_button = <FlatButton label='Done' primary onTouchTap={onCancel} />
    } else if (this.props.alarms && this.props.alarms.length) {
      left_button = <FlatButton label='Edit' primary onTouchTap={onEditToggle} />
    }

    let right_button = <FlatButton label='+' primary onTouchTap={this.props.onAddAlarm()} />

    let style = {
      background: toolbar_background
    }

    return (
      <Toolbar style={style}>
        <ToolbarGroup firstChild float='left'>
          {left_button}
        </ToolbarGroup>
        <ToolbarGroup lastChild float='right'>
          {right_button}
        </ToolbarGroup>
      </Toolbar>
    )
  }

  body () {
    if (this.props.alarms.length) {
      return this.alarmList()
    } else {
      return (
        <div style={{textAlign: 'center'}}>No Alarms</div>
      )
    }
  }

  render () {
    let style = {
      height: '100%',
      backgroundColor: default_background
    }

    return (
      <div style={style}>
        <TopBar title='Alarm' />
        {this.toolbar()}
        {this.body()}
      </div>
    )
  }
}

AlarmApp.propTypes = {
  alarms: PropTypes.array.isRequired,
  onToggleAlarm: PropTypes.func.isRequired,
  onDeleteAlarm: PropTypes.func.isRequired,
  onAddAlarm: PropTypes.func.isRequired,
  onEditAlarm: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  alarms: state.alarm
})

const mapDispatchToProps = (dispatch) => ({
  onToggleAlarm: (id) => () => dispatch(toggle_alarm(id)),
  onDeleteAlarm: (id) => () => dispatch(delete_alarm(id)),
  onEditAlarm: (id) => () => dispatch(push(`/alarms/${id}/edit`)),
  onAddAlarm: () => () => dispatch(push('/alarms/add'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlarmApp)
