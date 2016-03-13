import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TopBar from 'components/topbar'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import FlatButton from 'material-ui/lib/flat-button'

import WorldClockToolbar from './Toolbar'
import AddCityList from './AddCityList'

import moment from 'moment-timezone'

import { delete_city } from 'redux/modules/worldclock'

class WorldClock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: moment(),
      editing: false
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

  render () {
    const now = this.state.time
    const offset = now.utcOffset()

    const cities = this.props.cities.map((city, i) => {
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

      return (
        <Card key={i}>
          <CardText style={{position: 'relative'}}>
            <h2 style={{margin: '0 0 5px'}}>{name}</h2>
            <b>{day_relative}{(delta_str?',':'')}</b> {delta_str}
            <div style={{position: 'absolute', top: '0', right: '0', padding: '5px'}}>
              <span style={{fontSize: '30px'}}>{time}</span> <span>{am_pm}</span>
            </div>
            <FlatButton
              label='DELETE'
              onTouchTap={this.props.onDelete(city)}
            />
          </CardText>
        </Card>
      )
    })

    return (
      <div>
        <TopBar title='World Clock' />
        <WorldClockToolbar />

        {cities}

        <AddCityList />

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
