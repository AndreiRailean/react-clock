import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TopBar from 'components/topbar'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'

import moment from 'moment-timezone'

class WorldClock extends React.Component {
  render () {
    const my_moment = moment()
    const my_offset = my_moment.utcOffset()

    const cities = this.props.cities.map((city, i) => {
      let city_moment = my_moment.clone().tz(city)
      let city_offset = city_moment.utcOffset()
      let offset_diff = my_offset - city_offset
      let offset_diff_h = offset_diff / 60

      let city_time = city_moment.format('h:mm A')
      let city_name = city.split('/').pop().replace('_', ' ')

      let time_info = (!offset_diff)
        ? ''
        : `${Math.abs(offset_diff_h)} hours ${(offset_diff_h < 0)?'ahead':'behind'}`

      let day_info = moment().calendar(city_moment).split(' ').shift()

      return (
        <Card key={i}>
          <CardText>
            <h2 style={{margin: '0 0 5px'}}>{city_name}</h2>
            <b>{day_info}{(time_info?',':'')}</b> {time_info}
            <div style={{fontSize: '30px'}}>{city_time}</div>
          </CardText>
        </Card>
      )
    })
    // console.log(my_time.format())
    // console.log(other.format())
    //
    // console.log(moment.tz('Australia/Sydney').format())

    return (
      <div>
        <TopBar title='World Clock' />

        {cities}

      </div>
    )
  }
}

WorldClock.propTypes = {
  cities: PropTypes.array
}

const mapStateToProps = (state) => ({
  cities: state.worldclock.cities
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorldClock)
