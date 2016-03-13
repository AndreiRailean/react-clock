import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Toggle from 'material-ui/lib/toggle'

import moment from 'moment-timezone'

import { add_city } from 'redux/modules/worldclock'

const AddCityList = ({onAdd, selected_cities}) => {
  const cities = moment.tz.names().map((city, i) => {
    let name, region
    [ region, name ] = city.replace('_', ' ').split('/')

    return (
      <ListItem
        primaryText={name}
        secondaryText={region}
        key={i}
        rightToggle={<Toggle defaultToggled={selected_cities[city]} onToggle={onAdd(city)} />}
      />
    )
  })

  return (
    <List subheader='World Cities'>
      {cities}
    </List>
  )
}

AddCityList.propTypes = {
  onAdd: PropTypes.func,
  selected_cities: PropTypes.object
}

const mapStateToProps = (state) => ({
  selected_cities: state.worldclock.cities.reduce((obj, one) => {
    obj[one]=true
    return obj
  }, {})
})

const mapDispatchToProps = (dispatch) => ({
  onAdd: (city) => () => dispatch(add_city(city))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCityList)
