import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import FlatButton from 'material-ui/lib/flat-button'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'

import TopBar from 'components/topbar'
import ListItem from './ListItem'

import { toggle_alarm, delete_alarm } from 'redux/modules/alarm.js'
import { app_background as default_background, toolbar_background } from 'config'

class AlarmApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      adding: false
    }
  }

  alarmList () {
    return this.props.alarms.map((alarm, i) => (
      <ListItem
        key={i}
        editing={this.state.editing}
        onToggle={this.props.onToggleAlarm(i)}
        onDelete={this.props.onDeleteAlarm(i)}
        onEdit={this.props.onEditAlarm(i)}
        {...alarm}
      />
    ))
  }

  toolbar () {
    const onEditToggle = () => {
      this.setState({editing: !this.state.editing})
    }

    const onAddToggle = () => {
      onCancel()
      this.setState({adding: !this.state.adding})
    }

    const onCancel = () => {
      this.setState({adding: false, editing: false})
    }

    const onSaveAlarm = () => {

    }

    let right_button = ''
    if (this.state.editing && this.props.alarms.length) {
      right_button = <FlatButton label='Done' primary onTouchTap={onCancel} />
    } else if (this.state.adding && this.props.alarms.length) {
      right_button = <FlatButton label='Cancel' primary onTouchTap={onCancel} />
    } else if (this.props.alarms && this.props.alarms.length) {
      right_button = <FlatButton label='Edit' primary onTouchTap={onEditToggle} />
    }

    let left_button = <FlatButton label='+' primary onTouchTap={onAddToggle} />
    if (this.state.adding) {
      left_button = <FlatButton label='Save' primary onTouchTap={onSaveAlarm} />
    }

    let style = {
      background: toolbar_background
    }

    return (
      <Toolbar style={style}>
        <ToolbarGroup firstChild float='left'>
          {right_button}
        </ToolbarGroup>
        <ToolbarGroup lastChild float='right'>
          {left_button}
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
  onEditAlarm: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  alarms: state.alarm.list
})

const mapDispatchToProps = (dispatch) => ({
  onToggleAlarm: (index) => () => dispatch(toggle_alarm(index)),
  onDeleteAlarm: (index) => () => dispatch(delete_alarm(index)),
  onEditAlarm: (index) => () => dispatch(push(`/alarms/${index}/edit`))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlarmApp)
