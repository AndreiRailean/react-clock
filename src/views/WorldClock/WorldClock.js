import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TopBar from 'components/topbar'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'

import moment from 'moment-timezone'

class WorldClock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: moment()
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
    const my_moment = this.state.time
    const offset = my_moment.utcOffset()

    const cities = this.props.cities.map((city, i) => {
      let m = my_moment.clone().tz(city)
      let offset_diff = offset - m.utcOffset()
      let offset_diff_h = offset_diff / 60

      let time = m.format('h:mm')
      let am_pm = m.format('A')
      let name = city.split('/').pop().replace('_', ' ')

      let time_info = (!offset_diff)
        ? ''
        : `${Math.abs(offset_diff_h)} hours ${(offset_diff_h < 0)?'ahead':'behind'}`

      let day_info = moment().calendar(m).split(' ').shift()

      return (
        <Card key={i}>
          <CardText style={{position: 'relative'}}>
            <h2 style={{margin: '0 0 5px'}}>{name}</h2>
            <b>{day_info}{(time_info?',':'')}</b> {time_info}
            <div style={{position: 'absolute', top: '0', right: '0', padding: '5px'}}>
              <span style={{fontSize: '30px'}}>{time}</span> <span>{am_pm}</span>
            </div>
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
