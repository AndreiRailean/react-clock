import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TopBar from 'components/topbar'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import Colors from 'material-ui/lib/styles/colors'
import Toggle from 'material-ui/lib/toggle'

import { toggle_alarm } from 'redux/modules/alarm.js'

class AlarmApp extends React.Component {
  alarmList () {
    return this.props.alarms.map((alarm, i) => {
      let style = {}
      if (!alarm.enabled) {
        style.backgroundColor = Colors.grey400
      }

      return (
        <Card key={i} style={style}>
          <CardText style={{position: 'relative'}}>
            <h2 style={{margin: '0 0 5px'}}>{alarm.time}</h2>
            {alarm.label}

            <div style={{position: 'absolute', top: '0', right: '0', padding: '5px'}}>
              <Toggle toggled={alarm.enabled} onToggle={this.props.onToggleAlarm(i)} />
            </div>

          </CardText>
        </Card>
      )
    })
  }

  render () {
    return (
      <div>
        <TopBar title='Alarm' />
        {this.alarmList()}
      </div>
    )
  }
}

AlarmApp.propTypes = {
  alarms: PropTypes.array,
  onToggleAlarm: PropTypes.func
}

const mapStateToProps = (state) => ({
  alarms: state.alarm.list
})

const mapDispatchToProps = (dispatch) => ({
  onToggleAlarm: (index) => () => dispatch(toggle_alarm(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlarmApp)
