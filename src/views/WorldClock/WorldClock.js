import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TopBar from 'components/topbar'

import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle'
import * as Colors from 'material-ui/styles/colors'

import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'

// import WorldClockToolbar from './Toolbar'
import AddCityList from './AddCityList'

import moment from 'moment-timezone'

import { delete_city } from 'redux/modules/worldclock'

class WorldClock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: moment(),
      editing: false,
      adding: false
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({time: moment()})
    }, 100)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  WorldClockToolbar () {
    const left_button_label = this.state.editing
      ? 'Done'
      : 'Edit'

    const onEditToggle = () => {
      this.setState({editing: !this.state.editing})
    }

    const right_button_label = this.state.adding
      ? 'Done'
      : '+'

    const onAddToggle = () => {
      this.setState({adding: !this.state.adding})
    }

    const right_button = this.state.adding
      ? ''
      : <FlatButton label={left_button_label} primary onTouchTap={onEditToggle} />

    const left_button = this.state.editing
      ? ''
      : <FlatButton label={right_button_label} primary onTouchTap={onAddToggle} />

    return (
      <Toolbar>
        <ToolbarGroup firstChild float='left'>
          {right_button}
        </ToolbarGroup>
        <ToolbarGroup lastChild float='right'>
          {left_button}
        </ToolbarGroup>
      </Toolbar>
    )
  }

  CityList () {
    const now = this.state.time
    const offset = now.utcOffset()

    return this.props.cities.map((city, i) => {
      let m = now.clone().tz(city)

      let time = m.format('h:mm')
      let am_pm = m.format('A')
      let name = city.split('/').pop().replace('_', ' ')

      let delta = (offset - m.utcOffset())
      let delta_h = Math.abs(Math.trunc(delta / 60))
      let delta_m = Math.abs(delta) % 60

      let delta_str = ''
      if (delta) {
        let delta_string_parts = []
        if (delta_h) {
          delta_string_parts.push(`${delta_h} hour${(delta_h===1)?'':'s'}`)
        }
        if (delta_m) {
          delta_string_parts.push(`${delta_m} minute${(delta_m===1)?'':'s'}`)
        }
        if (delta < 0) {
          delta_string_parts.push('ahead')
        } else {
          delta_string_parts.push('behind')
        }

        delta_str = delta_string_parts.join(' ')
      }

      let day_relative = moment().calendar(m).split(' ').shift()

      let right_display = (
        <div>
          <span style={{fontSize: '30px'}}>{time}</span> <span>{am_pm}</span>
        </div>
      )

      if (this.state.editing) {
        right_display = (
          <IconButton
            touch
            onTouchTap={this.props.onDelete(city)}
          >
            <RemoveIcon color={Colors.red400} />
          </IconButton>
        )
      }

      return (
        <Card key={i}>
          <CardText style={{position: 'relative'}}>
            <h2 style={{margin: '0 0 5px'}}>{name}</h2>
            <b>{day_relative}{(delta_str?',':'')}</b> {delta_str}
            <div style={{position: 'absolute', top: '0px', right: '0px', padding: '5px'}}>
              {right_display}
            </div>
          </CardText>
        </Card>
      )
    })
  }

  render () {
    let main_pane = this.CityList()

    if (this.state.adding) {
      main_pane = <AddCityList />
    }

    return (
      <div>
        <TopBar title='World Clock' />
        {this.WorldClockToolbar()}

        {main_pane}

      </div>
    )
  }
}

WorldClock.propTypes = {
  cities: PropTypes.array,

  onDelete: PropTypes.func
}

const mapStateToProps = (state) => ({
  cities: state.worldclock.cities
})

const mapDispatchToProps = (dispatch) => ({
  onDelete: (city) => () => dispatch(delete_city(city))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorldClock)
