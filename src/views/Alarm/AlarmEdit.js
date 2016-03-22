import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'
import FlatButton from 'material-ui/lib/flat-button'
import Divider from 'material-ui/lib/divider'

import Toggle from 'material-ui/lib/toggle'

import { app_background as default_background } from 'config'
import { delete_alarm } from 'redux/modules/alarm.js'

class AlarmEdit extends React.Component {

  toolbar () {
    return (
      <AppBar
        title='Edit Alarm'
        iconElementLeft={<IconButton onTouchTap={this.props.cancel} ><NavigationClose /></IconButton>}
        iconElementRight={<FlatButton label='Save' onTouchTap={this.props.save} />}
      />
    )
  }

  render () {
    let style = {
      height: '100%',
      backgroundColor: default_background
    }

    const { alarm, id } = this.props

    const onSnooze = () => {
      console.log('... snooze toggle ...')
    }

    const repeatString = () => {
      if (alarm.repeat) {
        return 'Repeating...'
      }
    }

    return (
      <div style={style}>
        {this.toolbar()}

        <div>
          Time Selector: {alarm.time}
        </div>

        <div>
          Repeat: {repeatString() || 'Never' }
        </div>

        <div>
          Label: {alarm.label}
        </div>

        <div>
          Sound: {alarm.sound || 'None'}
        </div>

        <div>
          Snooze:
          <Toggle toggled={alarm.snooze} onToggle={onSnooze} />
        </div>

        <Divider />
        <div style={{textAlign: 'center'}} >
          <FlatButton
            label='Delete Alarm'
            onTouchTap={this.props.delete}
            primary
          />
        </div>
      </div>
    )
  }
}

AlarmEdit.propTypes = {
  alarm: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  cancel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  alarm: state.alarm.list[parseInt(ownProps.params.id)],
  id: parseInt(ownProps.params.id)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const go_to_main = () => dispatch(push('/alarm'))

  return {
    cancel: () => go_to_main(),
    delete: () => {
      dispatch(delete_alarm(parseInt(ownProps.params.id)))
      go_to_main()
    },
    save: () => {
      console.log('... saving ...')
      go_to_main()
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlarmEdit)
