import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TopBar from 'components/topbar'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import Colors from 'material-ui/lib/styles/colors'
import Toggle from 'material-ui/lib/toggle'
import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import RemoveIcon from 'material-ui/lib/svg-icons/content/remove-circle'
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right'

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
    return this.props.alarms.map((alarm, i) => {
      let toggleControl = ''
      if (!this.state.editing) {
        toggleControl = (
          <div style={{position: 'absolute', top: '30px', right: '15px'}}>
            <Toggle toggled={alarm.enabled} onToggle={this.props.onToggleAlarm(i)} />
          </div>
        )
      }

      let deleteControl = ''
      if (this.state.editing) {
        deleteControl = (
          <IconButton
            touch
            onTouchTap={this.props.onDeleteAlarm(i)}
            style={{position: 'absolute', top: '20px', left: '15px'}}
          >
            <RemoveIcon color={Colors.red400} />
          </IconButton>
        )
      }

      let timeStyle = {
        margin: '0 0 5px',
        fontWeight: 'normal',
        fontSize: '30px'
      }

      let timeContainerStyle = {
        color: Colors.black
      }
      if (this.state.editing) {
        timeContainerStyle = {
          marginLeft: '60px'
        }
      }

      let style = {
        backgroundColor: Colors.white
      }

      if (!alarm.enabled) {
        style.backgroundColor = default_background
        timeContainerStyle.color = Colors.grey500
      }

      let editControl = null
      if (this.state.editing) {
        editControl = (
          <IconButton
            touch
            onTouchTap={this.props.onDeleteAlarm(i)}
            style={{position: 'absolute', top: '20px', right: '15px'}}
          >
            <ChevronRight color={Colors.grey500} />
          </IconButton>
        )
      }

      let right_control = toggleControl
      if (this.state.editing) {
        right_control = editControl
      }

      return (
        <Card key={i} style={style}>
          <CardText style={{position: 'relative'}}>
            {deleteControl}
            <div style={timeContainerStyle}>
              <h2 style={timeStyle}>{alarm.time}</h2>
              {alarm.label}
            </div>
            {right_control}
          </CardText>
        </Card>
      )
    })
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
    if (this.state.editing) {
      right_button = <FlatButton label='Done' primary onTouchTap={onCancel} />
    } else if (this.state.adding) {
      right_button = <FlatButton label='Cancel' primary onTouchTap={onCancel} />
    } else {
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

  render () {
    let style = {
      height: '100%',
      backgroundColor: default_background
    }

    return (
      <div style={style}>
        <TopBar title='Alarm' />
        {this.toolbar()}
        {this.alarmList()}
      </div>
    )
  }
}

AlarmApp.propTypes = {
  alarms: PropTypes.array.isRequired,
  onToggleAlarm: PropTypes.func.isRequired,
  onDeleteAlarm: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  alarms: state.alarm.list
})

const mapDispatchToProps = (dispatch) => ({
  onToggleAlarm: (index) => () => dispatch(toggle_alarm(index)),
  onDeleteAlarm: (index) => () => dispatch(delete_alarm(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlarmApp)
