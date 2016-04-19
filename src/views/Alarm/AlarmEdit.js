import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import update from 'react-addons-update'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'

import Card from 'material-ui/Card/Card'
// import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'

import Dialog from 'material-ui/Dialog'

import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

import TimeSelector from './TimeSelector'

import { app_background as default_background } from 'config'
import { delete_alarm, save_alarm } from 'redux/modules/alarm.js'

const allWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

class AlarmEdit extends React.Component {

  constructor (props) {
    super(props)
    this.save = this.save.bind(this)
    this.repeatEditToggle = this.repeatEditToggle.bind(this)
    this.labelEditToggle = this.labelEditToggle.bind(this)

    this.state = {
      alarm: props.alarm,
      id: props.id,
      repeatEditOpen: false,
      labelEditOpen: false,
      editDialogOpen: false
    }
  }

  repeatEditToggle () {
    this.setState({repeatEditOpen: !this.state.repeatEditOpen})
  }

  labelEditToggle () {
    this.setState({labelEditOpen: !this.state.labelEditOpen})
  }

  save () {
    this.props.save(this.state.id, this.state.alarm)
    // console.log(`... ${this.state.id} save ...`)
  }

  toolbar () {
    return (
      <AppBar
        title='Edit Alarm'
        iconElementLeft={<IconButton onTouchTap={this.props.cancel} ><NavigationClose /></IconButton>}
        iconElementRight={<FlatButton label='Save' onTouchTap={this.save} />}
      />
    )
  }

  render () {
    let style = {
      height: '100%',
      backgroundColor: default_background
    }

    const { alarm } = this.state

    const onSnooze = () => {
      this.setState(update(this.state, {
        alarm: {snooze: { $apply: (x) => !x }}
      }))
    }

    const onRepeatDayToggle = (day_id) => {
      let repeat_state = this.state.alarm.repeat
      let idx = repeat_state.indexOf(day_id)
      if (idx === -1) {
        repeat_state.push(day_id)
      } else {
        repeat_state.splice(idx, 1)
      }
      this.setState(update(this.state, {
        alarm: {repeat: {$set: repeat_state}}
      }))
    }

    const repeatString = () => {
      const { repeat } = alarm
      if (repeat.length === 5 && repeat.every((day_id) => day_id < 5)) {
        return 'Week Days'
      } else if (repeat.length === 7) {
        return 'Every Day'
      } else if (repeat.length > 0) {
        return allWeekDays
                .filter((day, id) => repeat.includes(id))
                .map((day) => day.substring(0, 3))
                .join(', ')
      } else {
        return 'Never'
      }
    }

    let time = alarm.time.replace(':', ' ')
    let [hours, minutes, ampm] = time.split(' ')
    hours = parseInt(hours)
    minutes = parseInt(minutes)

    const onTimeUpdate = (hours, minutes, ampm) => {
      let minute_str = minutes<10 ? `0${minutes}` : minutes
      this.setState(update(this.state, {
        alarm: {time: {$set: `${hours}:${minute_str} ${ampm}`}}
      }))
    }

    let repeatSection = []
    if (!this.state.repeatEditOpen) {
      repeatSection.push(
        <ListItem
          primaryText='Repeat'
          secondaryText={repeatString()}
          rightIcon={<ArrowRight />}
          onTouchTap={this.repeatEditToggle}
          key='repeat-1'
        />
      )
    } else {
      repeatSection.push(
        <ListItem
          primaryText='Repeat'
          secondaryText={repeatString()}
          rightIcon={<ArrowDown />}
          onTouchTap={this.repeatEditToggle}
          key='repeat-1'
        />
      )

      allWeekDays.forEach((day, id) => {
        let toggleCB = () => onRepeatDayToggle(id)
        let checked = alarm.repeat.includes(id)
        repeatSection.push(
          <ListItem
            primaryText={`Every ${day}`}
            key={id}
            leftCheckbox={
              <Checkbox
                defaultChecked={checked}
                onCheck={toggleCB}
              />
            }
          />
        )
      })
    }

    const repeatSection2 = (
      <Card>
        <CardHeader
          title='Repeat'
          subtitle={repeatString()}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <List>
          {allWeekDays.map((day, id) => {
            let toggleCB = () => onRepeatDayToggle(id)
            let checked = alarm.repeat.includes(id)
            return (
              <ListItem
                primaryText={`Every ${day}`}
                key={id}
                leftCheckbox={
                  <Checkbox
                    defaultChecked={checked}
                    onCheck={toggleCB}
                  />
                }
              />
            )
          })}
          </List>

        </CardText>
      </Card>
    )

    const onLabelUpdate = (e) => {
      this.setState(update(this.state, {
        alarm: {label: {$set: e.target.value}}
      }))
    }

    const editDialog = () => {
      const handleClose = () => {
        this.setState({labelEditOpen: false})
      }

      const actions = [
        <FlatButton
          label='Done'
          primary
          onTouchTap={handleClose}
        />
      ]

      return (
        <Dialog
          title='Edit Alarm Label'
          actions={actions}
          modal
          open={this.state.labelEditOpen}
          onRequestClose={handleClose}
        >
          <TextField
            defaultValue={alarm.label}
            onChange={onLabelUpdate}
            key='label-2'
            fullWidth
          />
        </Dialog>
      )
    }

    let labelSection = []
    if (!this.state.labelEditOpen) {
      labelSection.push(
        <ListItem
          primaryText='Label'
          secondaryText={alarm.label}
          rightIcon={<ArrowRight />}
          onTouchTap={this.labelEditToggle}
          key='label-1'
        />
      )
    } else {
      labelSection.push(
        <ListItem
          primaryText='Label'
          secondaryText={alarm.label}
          rightIcon={<ArrowDown />}
          key='label-1'
        />
      )

      labelSection.push(
        editDialog
        // <TextField
        //   defaultValue={alarm.label}
        //   hintText='Alarm Label'
        //   onChange={onLabelUpdate}
        //   key='label-2'
        // />
      )
    }

    const labelSection2 = (
      <Card>
        <CardHeader
          title='Label'
          subtitle={alarm.label}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <TextField
            defaultValue={alarm.label}
            floatingLabelText='Edit Label'
            hintText='Message you want to see when alarm rings'
            onChange={onLabelUpdate}
            fullWidth
          />
        </CardText>
      </Card>
    )

    return (
      <div style={style}>
        {this.toolbar()}

        <div style={{textAlign: 'center'}}>
          <TimeSelector hours={hours} minutes={minutes} ampm={ampm} onUpdate={onTimeUpdate} />
        </div>

        <Divider />

        <List>
          {repeatSection}
          {labelSection}

          {repeatSection2}
          {labelSection2}

          <ListItem
            primaryText='Sound'
            secondaryText={alarm.sound || 'None'}
            rightIcon={<ChevronRight />}
          />
          <ListItem
            primaryText='Snooze'
            rightToggle={<Toggle toggled={alarm.snooze} onToggle={onSnooze} />}
          />
        </List>

        <Divider />

        <Card style={{textAlign: 'center', marginTop: '40px'}} >
          <FlatButton
            label='Delete Alarm'
            onTouchTap={this.props.delete}
            primary
          />
        </Card>

        {editDialog()}

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
    save: (id, alarm) => {
      dispatch(save_alarm(alarm, id))
      go_to_main()
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlarmEdit)
